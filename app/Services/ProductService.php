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
    public function __construct(Product $product)
    {
        $this->product  = $product;
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
