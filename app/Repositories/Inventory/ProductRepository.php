<?php

namespace App\Repositories\Inventory;

use App\Models\Batch;
use App\Models\Inventory\Product;
use App\Models\ProductImage;
use App\Repositories\BaseRepository;
use App\Services\CloudinaryService;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProductRepository extends BaseRepository
{
    protected CloudinaryService $cloudinary;

    public function __construct(Product $model, CloudinaryService $cloudinary)
    {
        parent::__construct($model);
        $this->cloudinary = $cloudinary;
    }

    /**
     * Store product images with a nullable main file
     */
    public function storeProductImages(array $files, ?UploadedFile $main, int $product_id)
    {
        $uploads = [];

        try {
            DB::beginTransaction();

            $batch = $this->model->findOrFail($product_id);

            $uploads = $this->uploadImages($files, $main);

            $productImages = $batch
                ->images()
                ->createMany(toSnake($uploads));

            DB::commit();

            return $productImages;
        } catch (Throwable $e) {
            DB::rollBack();

            // Cleanup Cloudinary if DB fails
            foreach ($uploads as $upload) {
                if (isset($upload['public_id'])) {
                    $this->cloudinary->delete($upload['public_id']);
                }
            }

            throw $e;
        }
    }


    public function deleteProductImages(array $imageIds): void
    {
        if (empty($imageIds)) return;

        $images = ProductImage::whereIn('id', $imageIds)->get();

        foreach ($images as $image) {
            if ($image->public_id) {
                $this->cloudinary->delete($image->public_id);
            }
            $image->delete();
        }
    }

    public function uploadImages(array $files, ?UploadedFile $main): array
    {
        return $this->cloudinary->upload(
            $files,
            'inventory/products',
            $main
        );
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
        Product::where('id', $batchId)->update([
            'available_quantity' => DB::raw("available_quantity - $quantity"),
            'reserved_quantity'  => DB::raw("reserved_quantity + $quantity"),
        ]);
    }

    /**
     * Release reservation (e.g., if a parked order expires or is cancelled)
     */
    public function releaseStock(int $batchId, int $quantity): void
    {
        Product::where('id', $batchId)->update([
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
        Product::where('id', $batchId)->update([
            'physical_quantity' => DB::raw("physical_quantity - $quantity"),
            'reserved_quantity' => DB::raw("reserved_quantity - $quantity"),
        ]);
    }
}
