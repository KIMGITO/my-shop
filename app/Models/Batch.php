<?php

namespace App\Models;

use App\Models\Inventory\Product;
use App\Models\Scopes\ActiveScope;
use App\Models\Traits\HasBatchNumber;
use App\Services\BatchService;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['product_id', 'batch_number', 'expiry_date', 'supplier_id', 'intake_quantity', 'balance', 'current_price','is_active'])]

class Batch extends Model
{
    use HasBatchNumber;
    protected  $appends = ['product_unit'];

    public function getProductUnitAttribute(){

       return $this->product->unit ?? '';
    }

    protected $with = ['product:id,name,unit,price','product.images'];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    protected static function booted()
    {
        static::addGlobalScope(new ActiveScope);
    }

}
