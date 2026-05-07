<?php

namespace App\Services;

use App\Enums\CreditStatus;
use App\Enums\OrderPaymentStatus;
use App\Enums\PaymentMethods;
use App\Enums\PaymentStatus;
use App\Exceptions\CustomerExceptions;
use App\Exceptions\PaymentExceptions;
use App\Models\Credit;
use App\Repositories\CreditRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class CreditService
{
    public function __construct(
        protected CreditRepository $creditRepository,
        protected OrderRepository $orderRepository,
        protected CustomerRepository $customerRepository,
        protected BatchRepository $batchRepository,
        protected PaymentRepository $paymentRepository,
    ) {}

    public function registerCredit(
        int $orderId,
        int $customerId,
        float $creditAmount,
        ?string $notes = null
    ): Credit {

        return DB::transaction(function () use ($orderId, $customerId, $creditAmount, $notes) {

            $order = $this->orderRepository->find($orderId);
            $customer = $this->customerRepository->find($customerId);

            if (!$order) {
                throw new Exception('Order not found.');
            }

            if (!$customer) {
                throw new Exception('Customer not found.');
            }

            // safer float check
            if (abs($creditAmount - $order->balance) > 0.01) {
                throw new Exception('Altered credit balance detected.');
            }

            $credit = $this->creditRepository->create([
                'order_id'     => $orderId,
                'customer_id'  => $customerId,
                'total_amount'  => $creditAmount,
                'balance'      => $creditAmount,
                'paid_amount'  => 0,
                'status'       => CreditStatus::UNPAID,
                'notes'        => $notes,
                'created_by'   => Auth::id(),
            ]);

            // update customer balance safely
            $this->customerRepository->update($customerId, [
                'balance' => ($customer->balance ?? 0) + $creditAmount
            ]);

            $order->load('items');

            foreach ($order->items as $item) {
                $this->batchRepository->confirmSale($item->batch_id, $item->quantity);
            }

            return $credit;
        });
    }

    public function payCredits(int $customerId, float $amount)
    {
        return DB::transaction(function () use ($customerId, $amount) {

            $customer = $this->customerRepository->find($customerId);

            if (!$customer) {
                throw new CustomerExceptions('Customer Not Found!');
            }


            if((float)$customer->balance < 0){
                throw new CustomerExceptions('Customer has no credit balance!');
            }

            $credits = $customer->credits()
                ->with('order')
                ->where('status', '!=', CreditStatus::PAID->value)
                ->orderBy('created_at', 'asc')
                ->lockForUpdate()
                ->get();

            
            if( empty($credits)){
                throw new PaymentExceptions('No credits under this customer');
            }

            $amount_due = $credits->sum('balance');

            $remainingAmount = (float) $amount;
            $totalPaid = 0;

            foreach ($credits as $credit) {

                if ($remainingAmount <= 0) break;

                $balance = (float) $credit->balance;

                if ($remainingAmount >= $balance) {

                    $applied = $balance;

                    $credit->paid_amount = ($credit->paid_amount ?? 0) + $applied;
                    $credit->balance = 0;
                    $credit->status = CreditStatus::PAID;

                    $remainingAmount -= $applied;
                } else {

                    $applied = $remainingAmount;

                    $credit->paid_amount = ($credit->paid_amount ?? 0) + $applied;
                    $credit->balance -= $applied;
                    $credit->status = CreditStatus::PARTIAL;

                    $remainingAmount = 0;
                }

                $order = $credit->order;


                if ($order->paid_amount <= 0) {
                    $order->payment_status = OrderPaymentStatus::UNPAID;
                } elseif ($order->paid_amount < $order->total_amount) {
                    $order->payment_status = OrderPaymentStatus::PARTIALLY_PAID;
                } else {
                    $order->payment_status = OrderPaymentStatus::PAID;
                }

                $order->save();
                $credit->save();

                $totalPaid += $applied;
            }

            // credit status 
                $status = $credit->balance == 0? 'paid' : 'pending';
                
            return [
                'credit_id' =>  $credit->id,
                'paid_amount' => $totalPaid,
                'amount_due' => $amount_due,
                'balance' =>  $credit->balance,
                'change' => $remainingAmount,
                'status' =>  $status,
            ];
        });
    }

    public function  processCreditPayments(array $creditData, float $mpesa, float $cash){

        return DB::transaction(function () use($creditData, $mpesa, $cash){

            $payments = [];

            if ($creditData['paid_amount'] > 0) {
                $changeGiven = $creditData['change'];
                $paidAmount = $creditData['paid_amount'];

                if ($paidAmount >= $mpesa && $mpesa > 0) {

                    if($mpesa - $creditData['amount_due'] > 0){
                        throw new PaymentExceptions('Mpesa amount is more than required');
                    }

                    // record mpesa payment
                    $payment = $this->paymentRepository->create( [
                        'credit_id' =>  $creditData['credit_id'],
                        'amount_due' =>$creditData['amount_due'],
                        'amount_paid' => $mpesa,
                        'change_given' => 0,
                        'method' => PaymentMethods::MPESA,
                        'status' => PaymentStatus::PENDING,
                    ]);

                    $payments['mpesa' ]=  $payment;

                }

                if ($paidAmount - $mpesa > 0 && $cash > 0) {
                    $cashPaid = $cash - $changeGiven;
                    $payment = $this->paymentRepository->create([
                        'credit_id' => $creditData['credit_id'],
                        'amount_due' => $creditData['amount_due'] - $mpesa,
                        'amount_paid' => $cashPaid,
                        'change_given' => $changeGiven,
                        'method' => PaymentMethods::CASH,
                        'status' => PaymentStatus::PAID,
                    ]);

                    $payments['cash'] =  $payment;
                }

                $balance = $creditData['amount_due']  - ($mpesa + ($cash- $changeGiven));
                $payments['balance'] = $balance;

            }

            return $payments;
        });
    }

    
}
