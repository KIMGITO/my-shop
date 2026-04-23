<?php

namespace App\Http\Controllers;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
            status: OrderStatus::INITIATED,
            userId: Auth::id(),
            customerId:null,
            expires_at: now()->addHours(24),
        );
        $orderNumber = $this->orderService->createOrder($orderData);

        return response()->json(['orderNumber' => $orderNumber->order_number]);
    }


    public function checkout(){
        return Inertia::render('Cashier/Checkout');
    }

    public function parkOrder(Request $request)
    {
        $payload = $request->validate([
            'orderNumber' => 'required|string',
            'customerId' => 'nullable|integer|exists:customers,id',
            'discount' => 'nullable|numeric',
            'tax' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'total' => 'required|numeric',
        ]);

        $order = $this->orderService->parkOrder($payload);
        dd($order);

        return response()->json(['message' => 'Order parked successfully', 'orderNumber' => $order->order_number]);
    }
}
