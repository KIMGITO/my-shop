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

    protected $cloudinary;
    /**
     * Create a new class instance.
     */
    public function __construct(Product $model, CloudinaryService $cloudinary,)
    {
        $this->cloudinary = $cloudinary;
        parent::__construct($model);
    }


    public function storeProductImages(array  $files,  UploadedFile $main, int  $product_id)
    {
        try {
            DB::beginTransaction();
            $uploads =  $this->uploadImages($files, $main);
            Product::images()->createMany($uploads);
        } catch (Throwable $e) {
            DB::rollBack();

            foreach ($uploads as $upload) {
                $this->cloudinary->delete($upload['public_id']);
            }
        }
    }

    public function uploadImages(array $files, UploadedFile $main)
    {
        $uploads = $this->cloudinary->upload($files, 'inventory/products', $main);
        return $uploads;
    }
}
