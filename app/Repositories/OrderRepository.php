<?php

namespace App\Repositories;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Repositories\BaseRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    public function findByOrderNumber(string $orderNumber): ?Order
    {
        return $this->model->where('order_number', $orderNumber)->first();
    }

    public function  updateByOrderNumber(string $orderNumber, array $data):Order{
        $order = $this->findByOrderNumber($orderNumber);

        if(!$order){
            throw new Exception("Order {$orderNumber} not  found");
        }
        $order->update($data);
        return $order;
    }

    

}
