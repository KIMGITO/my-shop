<?php

namespace App\Http\Controllers;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;
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


    public function checkout(OrderRequest $request){

        $payload = $request->validated();

        $order = $this->orderService->checkout($payload);

        return Inertia::render('Cashier/Checkout', ['order' => $order->load('items')]);
    }

    public function parkOrder(OrderRequest $request)
    {
        $payload = $request->validated();

        $order = $this->orderService->parkOrder($payload);

        return redirect()->back()->with(['message' => 'Order parked successfully', 'orderNumber' => $order->order_number,'isParkedModelOpen' => true]);

    }
}
