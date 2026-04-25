<?php

namespace App\Services;

use App\Models\Payment;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use Exception;
use Illuminate\Support\Arr;

class PaymentService
{
    public function __construct(
        protected PaymentRepository $paymentRepository,
        protected OrderRepository $orderRepository,
    ) {}

    /**
     * Smartly splits an amount between Mpesa and Cash.
     */
    public function processSplitPayment(int $orderId, float $totalAmount, array $splitData, ?int $customer_id): array
    {
        $mpesaAmount = $splitData['mpesa_amount'] ?? 0;
        $cashAmount = $totalAmount - $mpesaAmount;
        $creditAmount = $totalAmount - ($mpesaAmount + $cashAmount);

        if($creditAmount > 0 && $customer_id === null) {
            throw new Exception("No customer selected for credit recording.");
        }else{
            // handle credit recording logic .
        }

        if ($cashAmount < 0) {
            throw new Exception("Mpesa amount cannot exceed the total order value.");
        }

        $results = [];

        if ($mpesaAmount > 0) {
            $results['mpesa'] = $this->processMpesa($orderId, ['amount' => $mpesaAmount]);
        }

        if ($cashAmount > 0) {
            $results['cash'] = $this->processCash($orderId, ['amount' => $cashAmount]);
        }

        return $results;
    }

    public function processMpesa(int $orderId, array $data): Payment 
    {
        $payload = array_merge($data, [
            'order_id' => $orderId,
            'method' => 'mpesa',
            'status' => 'pending'
        ]);

        return $this->registerPayment($payload);
    }

    public function processCash(int $orderId, array $data): Payment 
    {
        $amountPaid = $data['amount_paid'] ?? 0; 
        $totalDue = $data['amount_due'] ?? 0;    

        $change = max(0, $amountPaid - $totalDue);
        $actualPayment = $amountPaid - $change;

        return $this->registerPayment([
            'order_id' => $orderId,
            'method'   => 'cash',
            'amount_due'   => $actualPayment, 
            'amount_paid' => $amountPaid,
            'change_returned' => $change,
            'status'   => 'completed'
        ]);
    }

    /**
     * Handles the actual persistence logic.
     */
    public function registerPayment(array $payload): Payment 
    {
        $paymentId = Arr::get($payload, 'payment_id');
        
        if ($paymentId) {
            return $this->paymentRepository->update($paymentId, $payload);
        }

        return $this->paymentRepository->create($payload);
    }
}