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
    public function __construct(
        protected CreditRepository $creditRepository,
        protected OrderRepository $orderRepository,
        protected CustomerRepository $customerRepository,
        protected BatchRepository $batchRepository,
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

            $credits = $customer->credits()
                ->with('order')
                ->where('status', '!=', CreditStatus::PAID->value)
                ->orderBy('created_at', 'asc')
                ->lockForUpdate()
                ->get();

            $remainingAmount = $amount;
            $totalPaid = 0;

            foreach ($credits as $credit) {

                if ($remainingAmount <= 0) break;

                $balance = $credit->balance;

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

                $order->paid_amount = ($order->paid_amount ?? 0) + $applied;

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
                'paid_amount' => $totalPaid,
                'remaining_amount' => $remainingAmount,
                'status' =>  $status,
            ];
        });
    }
}
