<?php

namespace App\DTOs;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ProductDTO
{
    protected array $product;
    protected array $productImages;
    protected ?UploadedFile $mainImage;

    public function __construct(array $data)
    {
        $collection = collect($data);

        $this->product = $collection
            ->except(['productImages'])
            ->toArray();

        $this->productImages = $collection->get('productImages', []);

        $this->mainImage = $collection->get('main_product_image');
    }

    public function product(): array
    {
        return $this->product;
    }

    public function productImages(): array
    {
        return $this->productImages;
    }

    public function mainImage(): UploadedFile
    {
        return $this->mainImage;
    }
}
