<?php

namespace App\Repositories\Inventory;

use App\Models\Inventory\Product;
use App\Repositories\BaseRepository;
use App\Services\CloudinaryService;
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

    public function storeProductImages(array $files, UploadedFile $main, int $product_id)
    {
        $uploads = [];

        try {
            DB::beginTransaction();

            $product = $this->model->findOrFail($product_id);

            $uploads = $this->uploadImages($files, $main);

            $productImages = $product
                ->images()
                ->createMany(toSnake($uploads));

            DB::commit();

            return $productImages;
        } catch (Throwable $e) {

            DB::rollBack();

            // remove uploaded files if DB fails
            foreach ($uploads as $upload) {
                if (isset($upload['public_id'])) {
                    $this->cloudinary->delete($upload['public_id']);
                }
            }

            throw $e;
        }
    }

    public function uploadImages(array $files, UploadedFile $main): array
    {
        return $this->cloudinary->upload(
            $files,
            'inventory/products',
            $main
        );
    }

    
}
