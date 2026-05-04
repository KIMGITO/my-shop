<?php

namespace App\Services;

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

            $order->items->each(function($item) {
                    $this->batchRepository->confirmSale($item->batch_id, $item->quantity);
            });
            return $credit;
        });
        
    }
}
