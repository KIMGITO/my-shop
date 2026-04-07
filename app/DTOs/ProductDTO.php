<?php

namespace App\DTOs;

class ProductDTO
{

    protected $images;
    protected $product;


    /**
     * Create a new class instance.
     */
    public function __construct(array  $data)
    {
        $this->product = collect($data)->except('product_images')->toArray();
        $this->images = $data['product_images'];
    }
}
