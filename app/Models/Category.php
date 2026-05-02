<?php

namespace App\Models;

use App\Models\Inventory\Product;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable('name','description','')]

class Category extends Model
{
    protected $with = ['products'];


    public function products(){
        return $this->hasMany(Product::class);
    }
}
