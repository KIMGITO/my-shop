<?php

namespace App\Models\Inventory;

use App\Models\ProductImage;
use App\Models\Traits\HasSkuByCategoryName;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    [
        'name',
        'price',
        'unit',
        'description',
        'rating',
        'reviews',
        'main_product_image',
        'category',
        'in_stock',
        'is_popular',
        'is_featured',
        'badge',
        'sku'
    ]
)]

class Product extends Model
{
use HasSkuByCategoryName;

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
