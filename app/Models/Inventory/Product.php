<?php

namespace App\Models\Inventory;

use App\Models\Batch;
use App\Models\Category;
use App\Models\ProductImage;
use App\Models\Traits\HasSkuByCategoryName;
use App\Services\CloudinaryService;
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
        'sku',
        'code',
        'shelf_life',
    ]
)]



class Product extends Model
{
    use HasSkuByCategoryName;

    protected $appends = ['main_product_image'];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function bathes (){
        return  $this->hasMany(Batch::class);
    }

    public function getMainProductImageAttribute()
    {
        return $this->images->where('is_main', true)->first()?->url ?? $this->images->first()->url ?? 'https://res.cloudinary.com/dhekeyvop/image/upload/e_background_removal/suppliers/yxmcydmani7hhsapzo5z.png';
    }
}
