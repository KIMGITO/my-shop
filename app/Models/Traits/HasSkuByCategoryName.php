<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\DB;

trait HasSkuByCategoryName
{
    public static function bootHasSkuByCategoryName()
    {
        static::creating(function ($model) {
            if (!$model->sku && !empty($model->category)) {
                // 1. Generate the prefix (e.g., "ELE" for Electronics)
                $prefix = strtoupper(substr($model->category, 0, 3));

                // 2. Find the highest existing SKU for this specific category prefix
                // We sort by SKU string length and then SKU value to get the literal maximum
                $lastSku = DB::table('products')
                    ->where('sku', 'like', $prefix . '%')
                    ->orderByRaw('LENGTH(sku) DESC')
                    ->orderBy('sku', 'desc')
                    ->value('sku');

                if ($lastSku) {
                    // 3. Strip the prefix and convert the remainder to an integer
                    // Example: "ELE0042" -> "0042" -> 42
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
