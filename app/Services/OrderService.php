<?php

namespace App\Services;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Repositories\OrderRepository;
use App\Services\TransactionNamingService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected OrderRepository  $orderRepository, protected TransactionNamingService $transactionNaming)
    {
        $this->orderRepository = $orderRepository;
        $this->transactionNaming  = $transactionNaming;
    }

    public function getOrderNumber(){
        $transactionId = $this->transactionNaming->generate('orders','order_number',TransactionType::POS);
         return $transactionId;
    }

    public function createOrder(CreateOrderData $data){

        try{
            DB::beginTransaction();
            $order = $this->orderRepository->create([
                'orderNumber' => $this->getOrderNumber(),
                'type' => $data->type,
                'source' => $data->source,
                'status' => $data->status,
                'customerId' => $data->customerId,
                'userId' => Auth::id(),
                'discount' => $data->discount,
                'tax' => $data->tax,
                'notes' => $data->notes,
            ]);
            DB::commit();
            return $order;
        }catch(Throwable $th){
            DB::rollBack();
            throw $th;
        }
        
    }

    public function parkOrder(array $payload){
        // get  the order number and if invalid, create a new order with a new order number
        $order = $this->orderRepository->findByOrderNumber($payload['orderNumber']);
        // if no set expire time , set after 24 hours
        $expireTime = $payload['expireTime'] ?? now()->addHours(24);
        if(!$order){
            $orderData = new CreateOrderData(
                type:TransactionType::POS,
                source:'pos',
                status: OrderStatus::PARKED,
                userId: Auth::id(),
                customerId:$payload['customerId'] ?? null,
                discount: $payload['discount'] ?? 0,
                tax: $payload['tax'] ?? 0,
                notes: $payload['notes'] ?? null,
                expires_at: $expireTime,
                total_amount: $payload['total'],
                paid_amount: 0,
                balance: $payload['total'],
                
                
            );
            $order = $this->createOrder($orderData);
            return $order;
        }
        // update the order with the new data if order number is valid
        $order->update([
            'status' => OrderStatus::PARKED,
            'totalAmount' => $payload['total'],
            'tax' => $payload['tax'] ?? 0,
            'notes' => $payload['notes'] ?? null,
            'customerId' => $payload['customerId'] ?? null,
            'expires_at' => $expireTime,
            'discount' => $payload['discount'] ?? 0,
            'paid_amount' => 0,
            'balance' => $payload['total'],
            'user_id' => Auth::id(),
            
        ]);
        return $order;
    }
}
