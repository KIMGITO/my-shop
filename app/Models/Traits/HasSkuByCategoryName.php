<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\DB;

trait HasSkuByCategoryName
{
    public static function bootHasSkuByCategoryName()
    {
        static::creating(function ($model) {
            if (!$model->sku && !empty($model->category)) {
                $prefix = strtoupper(substr($model->category, 0, 3));

                $lastSku = DB::table('products')
                    ->where('sku', 'like', $prefix . '%')
                    ->orderByRaw('LENGTH(sku) DESC')
                    ->orderBy('sku', 'desc')
                    ->value('sku');

                if ($lastSku) {
                    $numericPart = preg_replace('/[^0-9]/', '', $lastSku);
                    $nextNumber = intval($numericPart) + 1;
                } else {
                    $nextNumber = 1;
                }

                $model->sku = $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
