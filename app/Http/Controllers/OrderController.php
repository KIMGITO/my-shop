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
            status: OrderStatus::ACTIVE,
            userId: Auth::id(),
            customerId:null,
        );
        $orderNumber = $this->orderService->createOrder($orderData);

        return response()->json(['orderNumber' => $orderNumber->order_number]);
    }


    public function checkout(){
        return Inertia::render('Cashier/Checkout');
    }

    public function parkOrder(Request $request)

{
    dd($request->all());

    $validated = $request->validate([
        'orderNumber'   => 'required|string|exists:orders,order_number',
        'items'         => 'required|array|min:1',
        'items.*.id'    => 'required',
        'items.*.quantity' => 'required|integer|min:1',
        'items.*.price' => 'required|numeric',
        'subtotal'      => 'required|numeric',
        'tax'           => 'required|numeric',
        'total'         => 'required|numeric',
        'notes'         => 'nullable|string',
        'customerId'    => 'nullable|exists:users,id',
    ]);


    try {
        DB::beginTransaction();

        $order = Order::where('order_number', $validated['orderNumber'])->firstOrFail();

        $order->update([
            'status'        => 'parked', 
            'total_amount'  => $validated['total'],
            'tax'    => $validated['tax'],
            'notes'         => $validated['notes'],
            'customer_id'   => $validated['customerId'],
        ]);

        // 3. Sync the items (Delete old ones if any, and create new ones)
        $order->items()->delete();
        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'quantity'   => $item['quantity'],
                'unit_price' => $item['price'],
                'subtotal'   => $item['price'] * $item['quantity'],
            ]);
        }

        DB::commit();

        return back()->with('message', "Cart '{$validated['orderNumber']}' parked successfully.");

    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['error' => 'Failed to park order: ' . $e->getMessage()]);
    }
}
    
}
