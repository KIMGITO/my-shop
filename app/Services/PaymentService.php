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
    // Extract amounts with proper validation
    $mpesaAmount = isset($splitData['mpesaAmount']) ? (float)$splitData['mpesaAmount'] : 0;
    $cashAmount = isset($splitData['cashAmount']) ? (float)$splitData['cashAmount'] : 0;
    
    // Calculate total paid and change
    $totalPaid = $mpesaAmount + $cashAmount;
    $changeGiven = 0;
    $creditAmount = 0;
    
    if ($totalPaid > $totalAmount) {
        // Customer overpaid - calculate change
        $changeGiven = $totalPaid - $totalAmount;
        $totalPaid = $totalAmount; // Amount actually applied to the bill
        $creditAmount = 0;
        
        // Adjust the payment amounts if needed (e.g., change comes from cash)
        // Assuming change is given from cash payment
        if ($cashAmount > 0 && $changeGiven > 0) {
            $cashAmount = $cashAmount - $changeGiven;
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
    

    $results = [];
    
    // Process M-Pesa payment
    $amountDue = $totalAmount;
    if ($mpesaAmount > 0) {
        $results['mpesa'] = $this->processMpesa($orderId, ['amount_paid' => $mpesaAmount, 'amount_due' => $amountDue]);

        $amountDue = $totalAmount - $mpesaAmount;
    }
    
    // Process Cash payment (after change adjustment)
    if ($cashAmount > 0) {
        $results['cash'] = $this->processCash($orderId, [
            'amount_due' => $amountDue,
            'amount_paid' => $cashAmount,
            'change_given' => $changeGiven  
        ]);
    }
    
    // Add summary to results
    $results['summary'] = [
        'total_amount' => $totalAmount,
        'mpesa_amount' => $mpesaAmount,
        'cash_amount' => $cashAmount,
        'total_paid' => $mpesaAmount + $cashAmount,
        'credit_amount' => $creditAmount,
        'change_given' => $changeGiven
    ];

    
    
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
        
        if ($paymentId !== null) {
            return $this->paymentRepository->update($paymentId, $payload);
        }

        return $this->paymentRepository->create($payload);
    }
}