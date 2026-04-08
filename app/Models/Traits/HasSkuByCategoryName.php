<?php

namespace App\Models\Traits;

use Illuminate\Support\Str;
use App\Models\Inventory\Product;

trait HasSkuByCategoryName
{
    public static function bootHasSkuByCategoryName()
    {
        static::creating(function ($model) {
            if (!$model->sku && isset($model->category)) {
                $categoryCode = strtoupper(substr($model->category, 0, 3));
                $datePart = now()->format('Ymd');

                // Get the last SKU for this category and date
                $lastProduct = Product::where('category', $model->category)
                    ->where('sku', 'like', $categoryCode . $datePart . '%')
                    ->orderByDesc('id')
                    ->first();

                if ($lastProduct && $lastProduct->sku) {
                    // Extract the numeric suffix and increment
                    $lastNumber = intval(substr($lastProduct->sku, -4));
                    $nextNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
                } else {
                    $nextNumber = '0001';
                }

                $model->sku = $categoryCode . $nextNumber;
            }
        });
    }
}
