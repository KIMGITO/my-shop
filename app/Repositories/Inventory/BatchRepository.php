<?php

namespace App\Repositories\Inventory;

use App\Models\Batch;
use App\Repositories\BaseRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class BatchRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct( Batch $model)
    {
        parent::__construct($model);
    }

     /**
     * Reserve stock for a product.
     * Decrements available_quantity and increments reserved_quantity.
     */
    public function reserveStock(int $batchId, int $quantity): void
    {
        $batch = Batch::findOrFail($batchId);

        // Optional: Check if enough stock is actually available before reserving
        if ($batch->available_quantity < $quantity) {
            throw new Exception("Insufficient stock for product: {$batch->product->name} ");
        }

        //  update to prevent race conditions
        Batch::where('id', $batchId)->update([
            'available_quantity' => DB::raw("available_quantity - $quantity"),
            'reserved_quantity'  => DB::raw("reserved_quantity + $quantity"),
        ]);
    }

    /**
     * Release reservation (e.g., if a parked order expires or is cancelled)
     */
    public function releaseStock(int $batchId, int $quantity): void
    {
        Batch::where('id', $batchId)->update([
            'available_quantity' => DB::raw("available_quantity + $quantity"),
            'reserved_quantity'  => DB::raw("reserved_quantity - $quantity"),
        ]);
    }

    /**
     * Finalize sale (e.g., when order is fully completed/paid)
     * Subtracts from physical quantity and clears reservation.
     */
    public function confirmSale(int $batchId, int $quantity): void
    {
        Batch::where('id', $batchId)->update([
            'available_quantity' => DB::raw("available_quantity - $quantity"),
            'reserved_quantity' => DB::raw("reserved_quantity - $quantity"),
        ]);
    }
}
