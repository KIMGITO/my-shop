<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
}
