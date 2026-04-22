<?php

namespace App\Http\Controllers;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    

    public function getOrderNumber(){


        $orderData = new CreateOrderData(
            type:TransactionType::POS,
            source:'pos',
            status: OrderStatus::ACTIVE,
            userId: Auth::id(),
            customerId:null,
        );
        $orderNumber = $this->orderService->createOrder($orderData);

        return response()->json(['orderNumber' => $orderNumber->order_number]);
    }

    public function updateStatus(Order $order, Request $request)
    {
        $request->validate(['status' => 'required|in:pending,completed,cancelled']);
        $order->update(['status' => $request->status]);
        
        return response()->json(['message' => 'Order status updated']);
    }
}
