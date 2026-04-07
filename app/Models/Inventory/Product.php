<?php

namespace App\Models\Inventory;

use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    [
        'name',
        'price',
        'unit',
        'image',
        'description',
        'rating',
        'reviews',
        'category',
        'in_stock',
        'is_popular',
        'is_featured',
        'badge',
    ]
)]

class Product extends Model
{


    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
