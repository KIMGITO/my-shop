<?php

namespace App\Services;

use App\DTOs\CreateOrderData;
use App\Enums\TransactionType;
use App\Repositories\OrderRepository;
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
}
