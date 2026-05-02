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
                ->createMany(to_snake($uploads));

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


}
