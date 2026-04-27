<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethods;
use App\Enums\PaymentStatus;
use App\Models\Payment;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    public function __construct(
        protected PaymentRepository $paymentRepository,
        protected OrderRepository $orderRepository,
        protected OrderService $orderService,
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
            $totalPaid = $totalAmount; // Amount actually applied to the bill
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
            if ($customer_id === null) {
                throw new Exception("No customer selected for credit recording.");
            }
            // handle credit recording logic here
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
                $payment_status = PaymentStatus::PENDING->value;
            }else{
                $payment_status = PaymentStatus::PARTIALLY_PAID->value;
            }

            $results['mpesa'] = $this->processMpesa($orderId, [
                'amount_paid' => $finalMpesaAmount, 
                'amount_due' => $totalAmount,
                'status' => $payment_status,
            ]);
        }
        
        // Process Cash payment (after change adjustment)
        if ($finalCashAmount > 0) {

            if($finalCashAmount + $finalMpesaAmount >= $totalAmount){
                $payment_status = PaymentStatus::PAID->value;
            }else{
                $payment_status = PaymentStatus::PARTIALLY_PAID->value;
            }
            $results['cash'] = $this->processCash($orderId, [
                'amount_due' => $totalAmount - $finalMpesaAmount,
                'amount_paid' => $finalCashAmount,
                'change_given' => $changeGiven , 
                'status' => $payment_status,
            ]);
        }
        
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

    public function processMpesa(int $orderId, array $data): Payment 
    {
        $payload = array_merge($data, [
            'order_id' => $orderId,
            'method' => PaymentMethods::MPESA,
            'status' => $data['status'] ?? PaymentStatus::DRAFT->value,
        ]);

        return $this->registerPayment($payload);
    }

    public function processCash(int $orderId, array $data): Payment 
    {
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

        return $payment;
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
}