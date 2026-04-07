<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\ProductRequest;
use App\Repositories\Inventory\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productRepo;
    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function index()
    {
        $products = $this->productRepo->all();

        return Inertia::render('Admin/Product/Index',  ['products' => $products]);
    }

    public function store(ProductRequest $request)
    {

        $payload = $request->validated();

        

        $uploaded  = $this->productRepo->storeProductImages($payload['product_images'], $payload['main_product_image'], $product_id);
        dd($uploaded);
    }
}
