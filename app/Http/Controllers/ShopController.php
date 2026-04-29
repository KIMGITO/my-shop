<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Inventory\Product;
use App\Services\ShopService;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function __construct(
        protected ShopService $shopService,
    ){}

    public function index(){
        $shop = $this->shopService->shopItems();
        
        return Inertia::render('Shop/Index', $shop);
    }

    public function product(Product $product){
        // show product in a shop page.
        $product = $this->shopService->shopItem($product->id);

        return Inertia::render('Product/Show',['product' => ['product' => $product]]);
    }
}
