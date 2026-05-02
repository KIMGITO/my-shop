<?php

namespace App\Services;

use App\Models\Inventory\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class ProductService
{

    protected $product;

    /**
     * Create a new class instance.
     */
    public function __construct(Product $product,  protected CloudinaryService $cloudinary)
    {
        $this->product  = $product;
        $this->cloudinary = $cloudinary;
    }

    public function stockStatus()
    {
        // read stock status 
        return [
            'status' => 'low_stock',
            'quantity' => 0 
        ];
    }

    public function formatProductForUI( Collection $products):array {
        $formattedProducts = $products->map(function ($product) {
            $stockStatus = $this->stockStatus($product);

            return [
                ...$product->toArray(),
                'status' => $stockStatus['status'],
                'inStockCount' => $stockStatus['quantity'],
                'category' => $product->category->name ?? 'Uncategorized',
                'images' => $product->images->map(fn($img) => [
                    'id' => $img->id,
                    'isMain' => $img->is_main,
                    'url' => $img->url
                ])
            ];
        });

        return $formattedProducts->toArray();
    }
}
