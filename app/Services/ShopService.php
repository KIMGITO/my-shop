<?php

namespace App\Services;

use App\Models\Inventory\Product;
use App\Repositories\CategoryRepository;
use App\Repositories\Inventory\BatchRepository;
use App\Repositories\Inventory\ProductRepository;

class ShopService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected CategoryRepository $categoryRepository,
        protected ProductService $productService,
        protected ProductRepository $productRepository,
    )
    {
        //
    }

    public function shopItems(){
        $categories = $this->categoryRepository->all()->map(function ($cat){
            return [
                'id' => $cat->id,
                'name' => $cat->name,
                'description' => $cat->description,
                'count' => $cat->products->count(),
            ];
        })->toArray();

        $allProducts = $this->productRepository->all();
        $products = $this->productService->formatProductForUI($allProducts);

        return [
            'categories' =>$categories,
            'products' => toCamel($products),
        ];
    }

    public function shopItem(int $id){
        $product = $this->productRepository->find($id)->load(['images:product_id,id,url','batches']);
        return  ([
            'name' => $product['name'],
            'ratting' => $product['ratting'],
            'reviews'=> $product['reviews'],
            'price' => $product['price'],
            'unit'=> $product['unit'],
            'description' => $product['description'],
            'images' => $product->images->toArray(),
        ]);

        
    }

}
