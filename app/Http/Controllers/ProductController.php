<?php

namespace App\Http\Controllers;

use App\DTOs\ProductDTO;
use App\Http\Requests\Inventory\ProductRequest;
use App\Services\ProductService;
use App\Repositories\Inventory\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

use function PHPSTORM_META\map;

class ProductController extends Controller
{
    protected $productRepo;
    protected $productService;
    public function __construct(ProductRepository $productRepo,  ProductService $productService)
    {
        $this->productRepo = $productRepo;
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productRepo->all(); // returns Collection

        $products = $products->map(function ($product) {
            $stockStatus = $this->productService->stockStatus($product);

            $productArray = $product->toArray();
            $productArray['status'] = $stockStatus['status'];
            $productArray['in_stock'] = $stockStatus['quantity'];

            $productArray['images'] = $product->images->map(function($image){
                return [
                    'id' => $image->id,
                    'isMain' => $image->is_main,
                    'url' => $image->url
                ];
            });
            return $productArray;
        })->toArray();

        return Inertia::render('Admin/Product/Index',  ['products' => toCamel($products), 'modalOpen' => false]);
    }

    public function store(ProductRequest $request)
    {

        $payload = $request->validated();

        try {

            $data = new ProductDTO($payload);

            $product = $this->productRepo->create(
                $data->product()
            );

            $uploaded = $this->productRepo->storeProductImages(
                $data->productImages(),
                $data->mainImage(),
                $product->id
            );

            $main_image_url = $product->images()
                ->where('is_main', true)
                ->first()
                ?->url;

            $product->update([
                'main_product_image' => $main_image_url
            ]);
        } catch (Throwable $e) {
            dd($e);
        }
    }
}
