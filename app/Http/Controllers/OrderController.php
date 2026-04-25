<?php

namespace App\Http\Controllers;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService,
        protected BatchRepository $batchRepository,
        protected OrderRepository $orderRepository
        )
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
            expires_at: now()->addSecond(5),
        );
        $order = $this->orderService->createOrder($orderData);

        return response()->json(['orderNumber' => $order->order_number]);
    }


    public function checkout(OrderRequest $request){

        $payload = $request->validated();

        $order = $this->orderService->checkout($payload);

        return Inertia::render('Cashier/Checkout', ['order' => $order->load('items'), 'taxRate' => /*config('shop.tax_rate') || */ 0.08]);
    }

    public function parkOrder(OrderRequest $request)
    {
        $payload = $request->validated();

        $order = $this->orderService->parkOrder($payload);

        return redirect()->back()->with(['message' => 'Order parked successfully', 'orderNumber' => $order->order_number,'isParkedModelOpen' => true]);

    }

    public function void(string $orderNumber)
    {
        $this->orderService->voidOrder($orderNumber);

        return back()->with(['success' => 'Order deleted successfully.']);
    }

    /**
     * UNPARK: Mark as active so it disappears from the "Parked" list.
     */
    public function unpark( $orderNumber)
    {
        $this->orderRepository->updateByOrderNumber($orderNumber, ['status'=> OrderStatus::INITIATED]);

        return back()->with(['message' => 'Order unpacked successfully']);
    }
}
