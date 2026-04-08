<?php

namespace App\Models;

use App\Models\Inventory\Product;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable(['product_ic','url','is_main','public_id'])]

class ProductImage extends Model
{


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
