<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Inventory\Product;
use App\Models\Supplier;
use App\Models\Customer;

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
    

    public function searchCategories(?string $term, int $limit = 10){
        return  Category::query()
            ->when($term, fn($q) => $q->where('name', 'like', "%{$term}%"))
            ->select('id','id as value', 'name as label')
            ->limit($limit)
            ->get();
    }

    public function searchCustomers(?string $term, int $limit = 10){
        return  Customer::query()
            ->when($term, fn($q) => $q->where('name', 'like', "%{$term}%"))
            ->orWhere('phone','like',"%{$term}")
            ->orWhere('email','like',"%{$term}")
            ->select('id','id as value','name as label')
            ->limit($limit)
            ->get();
    }
}
