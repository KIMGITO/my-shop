<?php

namespace App\Services;

use App\Enums\TransactionType;
use App\Repositories\OrderRepository;

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
}
