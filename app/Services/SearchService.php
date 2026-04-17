<?php

namespace App\Services;

use App\Models\Inventory\Product;
use App\Models\Supplier;

class SearchService
{
    public function searchProducts(?string $term, int $limit = 10)
    {
        return Product::query()
            ->when($term, fn($q) => $q->where('name', 'like', "%{$term}%"))
            ->select('id', 'name')
            ->limit($limit)
            ->get();
    }

    public function searchSuppliers(?string $term, int $limit = 10)
    {
        return Supplier::query()
            ->when($term, fn($q) => $q->where('name', 'like', "%{$term}%"))
            ->select('id', 'name', 'logo_url as image')
            ->limit($limit)
            ->get();
    }
}
