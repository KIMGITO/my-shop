<?php

namespace App\Services;

use App\Enums\OrderPaymentStatus;
use App\Enums\PaymentMethods;
use App\Enums\PaymentStatus;
use App\Models\Customer;
use App\Models\Payment;
use App\Repositories\CustomerRepository;
use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use App\Services\OrderService;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    public function __construct(
        protected PaymentRepository $paymentRepository,
        protected OrderRepository $orderRepository,
        protected OrderService $orderService,
        protected BatchRepository $batchRepository,
        protected CustomerRepository $customerRepository,
    ) {}

    /**
     * Smartly splits an amount between Mpesa and Cash.
     */
    public function processSplitPayment(int $orderId, float $totalAmount, array $splitData, ?int $customer_id): array|float
    {
        // Extract amounts with proper validation
        $mpesaAmount = isset($splitData['mpesaAmount']) ? (float)$splitData['mpesaAmount'] : 0;
        $cashAmount = isset($splitData['cashAmount']) ? (float)$splitData['cashAmount'] : 0;
        
        // Calculate total paid and change
        $totalPaid = $mpesaAmount + $cashAmount;
        $changeGiven = 0;
        $creditAmount = 0;
        
        // Store original values for adjustment
        $finalMpesaAmount = $mpesaAmount;
        $finalCashAmount = $cashAmount;
        
        if ($totalPaid > $totalAmount) {
            // Customer overpaid - calculate change
            $overpayment = $totalPaid - $totalAmount;
            $changeGiven = $overpayment;
            $totalPaid = $totalAmount; 
            $creditAmount = 0;
            
            // Adjust the payment amounts - change comes from cash first
            if ($cashAmount >= $overpayment) {
                $finalCashAmount = $cashAmount - $overpayment;
                $finalMpesaAmount = $mpesaAmount;
            } else {
                // Not enough cash, take remaining from M-Pesa
                $remainingChange = $overpayment - $cashAmount;
                $finalCashAmount = 0;
                $finalMpesaAmount = $mpesaAmount - $remainingChange;
            }
        } elseif ($totalPaid < $totalAmount) {
            // Customer underpaid - remaining becomes credit
            $creditAmount = $totalAmount - $totalPaid;
            $changeGiven = 0;
        }
        
        // Handle credit logic
        if ($creditAmount > 0) {
            if(!Customer::where('id',$customer_id)->exists() || $customer_id === null){
                throw new Exception ("Customer not found.");
            }
            if ($this->processCredit($orderId, $customer_id)){
            // handle credit recording logic here

            }
            // Example: $this->recordCredit($orderId, $customer_id, $creditAmount);
        }
        
        // Validate amounts are not negative
        if ($finalMpesaAmount < 0 || $finalCashAmount < 0) {
            throw new Exception("Invalid payment adjustment: negative payment amounts detected.");
        }

        $results = [];

        $payment_status = PaymentStatus::DRAFT->value;

        
        // Process M-Pesa payment
        if ($finalMpesaAmount > 0) {

            if($finalMpesaAmount >= $totalAmount){
                // update payment to be paid and order payment status be paid
                $payment_status = PaymentStatus::PENDING->value;
                $order_payment_status = OrderPaymentStatus::PAID;
            }else{
                $payment_status = PaymentStatus::PENDING;
                $order_payment_status = OrderPaymentStatus::PARTIALLY_PAID;

            }

            $results['mpesa'] = $this->processMpesa($orderId, $order_payment_status, [
                'amount_paid' => $finalMpesaAmount, 
                'amount_due' => $totalAmount,
                'status' => $payment_status,
            ]);
        }
        
        // Process Cash payment (after change adjustment)
        if ($finalCashAmount > 0) {
            if($finalCashAmount + $finalMpesaAmount >= $totalAmount){
                $payment_status = PaymentStatus::PAID->value;
                $order_payment_status = OrderPaymentStatus::PAID;
            }else{
                $payment_status = PaymentStatus::PAID->value;
                $order_payment_status = OrderPaymentStatus::PARTIALLY_PAID;

            }
            $results['cash'] = $this->processCash($orderId, $order_payment_status, [
                'amount_due' => $totalAmount - $finalMpesaAmount,
                'amount_paid' => $finalCashAmount,
                'change_given' => $changeGiven , 
                'status' => $payment_status,
            ]);
        }

        DB::transaction(function () use ($orderId) {
            $order = $this->orderRepository->find($orderId);
            if($order->balance == 0){
                $this->orderService->completeOrder($orderId);
                
                $order->items->each(function($item) {
                    $this->batchRepository->confirmSale($item->batch_id, $item->quantity);
                });
            }
        });
        

        
        // Add summary to results (keeping your original keys)
        $results['summary'] = [
            'total_amount' => $totalAmount,
            'mpesa_amount' => $mpesaAmount,
            'cash_amount' => $cashAmount,
            'total_paid' => $finalMpesaAmount + $finalCashAmount,
            'credit_amount' => $creditAmount,
            'change_given' => $changeGiven
        ];

       
        
        return $results;
    }

    public function processMpesa(int $orderId, OrderPaymentStatus $order_payment_status,  array $data): Payment 
    {
       return  DB::transaction(function () use($orderId, $order_payment_status,  $data){

            $payload = array_merge($data, [
                'order_id' => $orderId,
                'method' => PaymentMethods::MPESA,
                'status' => $data['status'] ?? PaymentStatus::DRAFT->value,
            ]);

            $this->orderRepository->update($orderId, ['payment_status' => $order_payment_status]);
            return $this->registerPayment($payload);
        });
    }

    public function processCash(int $orderId, OrderPaymentStatus $order_payment_status, array $data): Payment 
    {

    return DB::transaction(function () use($orderId, $order_payment_status,  $data){
            $amountPaid = $data['amount_paid'] ?? 0; 
            $totalDue = $data['amount_due']  ?? 0;    
            $changeGiven = $data['change_given'] ?? 0;
            $status = $data['status'] ?? PaymentStatus::DRAFT->value;

            $payment =  $this->registerPayment([
                'order_id' => $orderId,
                'method'   => PaymentMethods::CASH,
                'amount_due'   => $totalDue, 
                'amount_paid' => $amountPaid,
                'change_given' => (int)$changeGiven,
                'status' => $status,
            ]);

            $this->orderRepository->update($orderId, ['payment_status' => $order_payment_status]);
            return $payment;
       });
    }

    /**
     * Handles the actual persistence logic.
     */
    public function registerPayment(array $payload): Payment 
    {
        $paymentId = Arr::get($payload, 'payment_id');
        
        
        if ($paymentId !== null) {
            $this->paymentRepository->update($paymentId, $payload);
            $this->orderService->completeOrder($payload['order_id']);
            
            return $this->paymentRepository->find($paymentId);
        }
        $this->orderService->completeOrder($payload['order_id']);
        return $this->paymentRepository->create($payload);


    }

    public function  processCredit(int $orderId, int $customerId){
        
        if(!$this->orderRepository->find($orderId)){
            
            throw new  Exception('Order not found');
        }
        if(!$this->customerRepository->find($customerId)){
            throw new  Exception('Customer not found');
        }
        return $this->orderService->completeOrder($orderId);
        // Record credit 
    }
}