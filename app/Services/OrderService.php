<?php

namespace App\Services;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Jobs\ReleaseProducts;
use App\Models\Order;
use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use App\Services\TransactionNamingService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function __construct(
        protected OrderRepository $orderRepository,
        protected BatchRepository $batchRepository,
        protected TransactionNamingService $transactionNaming
    ) {}

    public function checkout(array $payload)
    {
        return $this->saveOrder($payload, OrderStatus::ACTIVE);
    }

    public function parkOrder(array $payload)
    {
        return $this->saveOrder($payload, OrderStatus::PARKED);
    }

    private function saveOrder(array $payload, OrderStatus $status)
    {
        return DB::transaction(function () use ($payload, $status) {
            $order = isset($payload['orderNumber']) 
                ? $this->orderRepository->findByOrderNumber($payload['orderNumber']) 
                : null;

            if ($order) {
                $order->update($this->mapPayloadToUpdateData($payload, $status));
            } else {
                $orderData = $this->processOrderData($payload, $status);
                // FIX: Pass the payload orderNumber if it exists, otherwise generate
                $specificNumber = $payload['orderNumber'] ?? $this->getOrderNumber();
                $order = $this->createOrder($orderData, $specificNumber);
            }

            $this->syncOrderItems($order, $payload['items']);

            return $order;
        });
    }

    protected function syncOrderItems($order, array $items): void
    {
        // FIX: Use batch_id for stock release
        foreach ($order->items as $existingItem) {
            $this->batchRepository->releaseStock($existingItem->batch_id, $existingItem->quantity);
        }

        $order->items()->delete();

        foreach ($items as $item) {
            $order->items()->create([
                'batch_id' => $item['batch_id'], // Ensure frontend sends 'batch_id'
                'quantity' => $item['quantity'],
                'price'    => $item['price'],
                'subtotal' => $item['quantity'] * $item['price'],
            ]);

            $this->batchRepository->reserveStock($item['batch_id'], $item['quantity']);
        }
    }

    public function createOrder(CreateOrderData $data, ?string $orderNumber = null)
    {
        $order =  $this->orderRepository->create([
            'order_number' => $orderNumber ?? $this->getOrderNumber(),
            'type'         => $data->type,
            'source'       => $data->source,
            'status'       => $data->status,
            'customer_id'  => $data->customerId,
            'user_id'      => Auth::id(),
            'discount'     => $data->discount,
            'tax'          => $data->tax,
            'total_amount' => $data->total_amount,
            'paid_amount'  => $data->paid_amount,
            'balance'      => $data->balance,
            'expires_at'   => $data->expires_at,
            'notes'        => $data->notes,
        ]);

        // dd($order);

        ReleaseProducts::dispatch($order->order_number )->delay( now()->addSeconds(5));

        return $order;
    }

    public function getOrderNumber(): string
    {
        return $this->transactionNaming->generate('orders', 'order_number', TransactionType::POS);
    }

    // processOrderData and mapPayloadToUpdateData remain unchanged...


    public function processOrderData(array $payload, OrderStatus $status): CreateOrderData
    {
        return new CreateOrderData(
            type: TransactionType::POS,
            source: 'pos',
            status: $status,
            userId: Auth::id(),
            customerId: $payload['customerId'] ?? null,
            discount: $payload['discount'] ?? 0,
            tax: $payload['tax'] ?? 0,
            notes: $payload['notes'] ?? null,
            expires_at: $payload['expireTime'] ?? now()->addHours(24),
            total_amount: $payload['total'],
            paid_amount: $payload['paid'] ?? 0,
            balance: $payload['total'] - ($payload['paid'] ?? 0),
        );
    }

    protected function mapPayloadToUpdateData(array $payload, OrderStatus $status): array
    {
        return [
            'status'       => $status,
            'total_amount' => $payload['total'],
            'tax'          => $payload['tax'] ?? 0,
            'discount'     => $payload['discount'] ?? 0,
            'customer_id'  => $payload['customerId'] ?? null,
            'notes'        => $payload['notes'] ?? null,
            'balance'      => $payload['total'] - ($payload['paid'] ?? 0),
            'expires_at'   => $payload['expireTime'] ?? now()->addHours(24),
        ];
    }

    /**
 * Completely cancels an order and restores batch stock.
 */
    public function voidOrder(string $orderNumber): void
    {
        $order = $this->orderRepository->findByOrderNumber($orderNumber);

        if(!$order){
            throw new \Exception("Order with number {$orderNumber} not found");
        }
        if($order->status === OrderStatus::CANCELLED->value){
            throw new \Exception("Order with number {$orderNumber} is already cancelled");
        }
        if($order->status === OrderStatus::COMPLETED->value){
            throw new \Exception("Order with number {$orderNumber} cannot be cancelled as it is already completed");
        }
        
        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                $this->batchRepository->releaseStock($item->batch_id, $item->quantity);
                $item->delete();
            }
            $order->delete();
        });
    }

    /**
     * Complete and order
     */

    public function completeOrder(string $orderId): Order{
        // check if order exists,
        $order = $this->orderRepository->find($orderId);
        if(!$order){
            throw new \Exception("Order with number {$order->order_number} not found");
        }
        // check if order is already completed and return error if yes
        if($order->status === OrderStatus::COMPLETED->value ){
            throw new \Exception("Order with number {$order->order_number} is already completed");
        }
        // see if it cant be complete (eg marked as cancelled or voided) and return error if yes
        if($order->status === OrderStatus::CANCELLED->value || $order->status === OrderStatus::EXPIRED->value){
            throw new \Exception("Order with number {$order->order_number} cannot be completed as it is marked as cancelled or voided");
        }
       
        // mark order as completed
        $this->orderRepository->update($orderId, [
            'status' => OrderStatus::COMPLETED->value
        ]);

        return $order;
    }

    public function deleteByOrderNumber(string  $orderNumber):bool {
        return DB::transaction(function() use ($orderNumber){
        $packedOrder = $this->orderRepository->findByOrderNumber($orderNumber);
        if(!$packedOrder){
            throw new \Exception("Parked order with number {$orderNumber} not found");
        }
        if($packedOrder->status !== OrderStatus::PARKED->value){
            throw new \Exception("Order with number {$orderNumber} cannot be deleted as it is not parked");
        }

        $packedOrder->items->each(function($item){
            $this->batchRepository->releaseStock($item->batch_id, $item->quantity);
            $item->delete();
        });
        return $packedOrder->delete();
        });
        
    }
}
