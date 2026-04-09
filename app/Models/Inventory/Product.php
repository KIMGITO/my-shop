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

    protected $appends = ['main_product_image'];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function getMainProductImageAttribute()
    {
        return $this->images->where('is_main', true)->first()?->url ?? $this->images->first()->url;
    }
}
