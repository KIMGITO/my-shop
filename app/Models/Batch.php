<?php

namespace App\Models;

use App\Models\Inventory\Product;
use App\Models\Scopes\ActiveScope;
use App\Models\Supplier;
use App\Models\Traits\HasBatchNumber;
use App\Services\BatchService;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['product_id', 'batch_number', 'expiry_date', 'supplier_id', 'intake_quantity', 'balance', 'current_price','is_active','available_quantity','reserved_quantity'])]

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

    public function scopeExpired(Builder $query): Builder
    {
        return $query->whereRaw("
            DATE_ADD(batches.created_at, INTERVAL products.shelf_life DAY) < NOW()
            ")->join('products', 'products.id', '=', 'batches.product_id');
    }

    public function scopeExpiringSoon(Builder $query): Builder
    {
        return $query
            ->join('products', 'products.id', '=', 'batches.product_id')
            ->whereRaw("
            DATE_ADD(batches.created_at, INTERVAL products.shelf_life DAY)
            BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 DAY)
        ");
    }

    protected static function booted()
    {
        static::addGlobalScope(new ActiveScope);
    }


    public function expiryDate()
    {
        return $this->created_at->copy()
            ->addDays($this->product->shelf_life);
    }


    

}
