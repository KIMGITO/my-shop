<?php

namespace App\Services;

use App\DTOs\CreateOrderData;
use App\Enums\OrderStatus;
use App\Enums\TransactionType;
use App\Repositories\Inventory\ProductRepository;
use App\Repositories\OrderRepository;
use App\Services\TransactionNamingService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Use Constructor Property Promotion for cleaner dependency injection.
     */
    public function __construct(
        protected OrderRepository $orderRepository,
        protected ProductRepository $productRepository,
        protected TransactionNamingService $transactionNaming
    ) {}

    /**
     * The "Master" Checkout Method
     * Handles creation, items, and inventory in one transaction.
     */
    public function checkout(array $payload)
    {
        return $this->saveOrder($payload, OrderStatus::ACTIVE);
    }

    /**
     * Moves status to PARKED.
     */
    public function parkOrder(array $payload)
    {
        return $this->saveOrder($payload, OrderStatus::PARKED);
    }

    /**
     * Unified Internal Save Method
     */
    private function saveOrder(array $payload, OrderStatus $status)
    {
        return DB::transaction(function () use ($payload, $status) {
            // 1. Locate or Initialize the Order
            $order = isset($payload['orderNumber']) 
                ? $this->orderRepository->findByOrderNumber($payload['orderNumber']) 
                : null;

            if ($order) {
                $order->update($this->mapPayloadToUpdateData($payload, $status));
            } else {
                $orderData = $this->processOrderData($payload, $status);
                $order = $this->createOrder($orderData);
            }

            // 2. Synchronize Items and Stock
            $this->syncOrderItems($order, $payload['items']);

            return $order;
        });
    }

    /**
     * Handles the heavy lifting of inventory adjustment.
     */
    protected function syncOrderItems($order, array $items): void
    {
        // Release previous stock reservations to prevent double-counting
        foreach ($order->items as $existingItem) {
            $this->productRepository->releaseStock($existingItem->product_id, $existingItem->quantity);
        }

        // Fresh start for line items
        $order->items()->delete();

        foreach ($items as $item) {
            $order->items()->create([
                'batch_id' => $item['batch_id'],
                'quantity'   => $item['quantity'],
                'price'      => $item['price'],
                'subtotal'   => $item['quantity'] * $item['price'],
            ]);

            // Re-reserve based on new quantities
            $this->productRepository->reserveStock($item['batch_id'], $item['quantity']);
        }
    }

    /**
     * Core creation logic. 
     */
    public function createOrder(CreateOrderData $data)
    {
        return $this->orderRepository->create([
            'order_number' => $this->getOrderNumber(),
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
    }

    public function getOrderNumber(): string
    {
        return $this->transactionNaming->generate('orders', 'order_number', TransactionType::POS);
    }

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
}