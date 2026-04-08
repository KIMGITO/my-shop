<?php

namespace App\Services;

use App\Models\Inventory\Product;

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
            'quantity' => 0 //from stock levels
        ];
    }
}
