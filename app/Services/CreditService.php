<?php

namespace App\Services;

use App\Enums\CreditStatus;
use App\Enums\OrderPaymentStatus;
use App\Exceptions\CustomerExceptions;
use App\Models\Credit;
use App\Repositories\CreditRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CreditService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected CreditRepository $creditRepository,
        protected OrderRepository  $orderRepository,
        protected CustomerRepository  $customerRepository,
        protected BatchRepository $batchRepository,

    )
    {
        //
    }


    public function  registerCredit(int $orderId, int $customerId, float $creditAmount,  ?string $notes = null): Credit {

        return DB::transaction(function() use($orderId,  $customerId, $creditAmount, $notes) {
            $order =  $this->orderRepository->find($orderId);
            $customer =  $this->customerRepository->find($customerId);

            if(!$order){
                throw new Exception('Order not found.');
            }

            if(!$customer){
                throw new Exception('Invalid customer data');
            }
            if($creditAmount != $order->balance){
                throw new Exception('Altered credit balance detected.');
            }

            $credit = $this->creditRepository->create(
                [
                    'order_id' =>$orderId,
                    'customer_id' => $customerId,
                    'total_amount' => $creditAmount,
                    'balance' => $creditAmount,
                    'notes' => $notes,
                    'created_by' =>  Auth::id(),
                ]
            );

            // add credit to customer table
            $newBalance = $customer->balance + $creditAmount;
            $this->customerRepository->update($customerId,['balance' => $newBalance] );

            $order->items->each(function($item) {
                    $this->batchRepository->confirmSale($item->batch_id, $item->quantity);
            });
            return $credit;
        });
        
    }

    public function payCredits(int $customerId, float $amount, float $change)
    {
        return DB::transaction(function () use ($customerId, $amount) {

            $customer = $this->customerRepository->find($customerId);

            if (!$customer) {
                throw new CustomerExceptions('Customer Not Found!');
            }

            $credits = $customer->credits()
                ->with('order')
                ->where('status', '!=', CreditStatus::PAID->value)
                ->orderBy('created_at', 'asc')
                ->get();

            $remainingAmount = $amount;

            foreach ($credits as $credit) {

                if ($remainingAmount <= 0) break;

                $balance = $credit->balance;

                if ($remainingAmount >= $balance) {
                    $applied = $balance;

                    $credit->amount_paid = $credit->total_amount;
                    $credit->status = CreditStatus::PAID;

                    $remainingAmount -= $balance;

                } else {
                    $applied = $remainingAmount;

                    $credit->amount_paid += $remainingAmount;
                    $credit->status = CreditStatus::PARTIAL;

                    $remainingAmount = 0;
                }

                $order = $credit->order;

                $order->paid_amount += $applied;

                
                if ($order->paid_amount <= 0) {
                    $order->payment_status = OrderPaymentStatus::UNPAID;
                } elseif ($order->paid_amount < $order->total_amount) {
                    $order->payment_status = OrderPaymentStatus::PARTIALLY_PAID;
                } else {
                    $order->payment_status = OrderPaymentStatus::PAID;
                }

                $order->save();
                $credit->save();
            }
            return [
                'paid_amount' => $amount - $remainingAmount,
                'remaining_amount' => $remainingAmount,
            ];
        });


    }

    
}
