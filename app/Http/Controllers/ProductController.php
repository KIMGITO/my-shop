<?php

namespace App\Http\Controllers;

use App\DTOs\ProductDTO;
use App\Http\Requests\Inventory\ProductRequest;
use App\Models\Inventory\Product;
use App\Services\ProductService;
use App\Repositories\Inventory\ProductRepository;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

class ProductController extends Controller
{
    protected $productRepo;
    protected $productService;

    public function __construct(ProductRepository $productRepo, ProductService $productService)
    {
        $this->productRepo = $productRepo;
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productRepo->all();

        $formattedProducts = $products->map(function ($product) {
            $stockStatus = $this->productService->stockStatus($product);

            return [
                ...$product->toArray(),
                'status' => $stockStatus['status'],
                'inStockCount' => $stockStatus['quantity'],
                'images' => $product->images->map(fn($img) => [
                    'id' => $img->id,
                    'isMain' => $img->is_main,
                    'url' => $img->url
                ])
            ];
        });

        return Inertia::render('Admin/Product/Index', [
            'products' => toCamel($formattedProducts->toArray()),
            'modalOpen' => false
        ]);
    }

    public function store(ProductRequest $request)
    {
        try {
            DB::beginTransaction();
            $data = new ProductDTO($request->validated());

            // 1. Create Product (Model Trait handles SKU)
            $product = $this->productRepo->create($data->product());

            // 2. Upload & Store Images
            $this->productRepo->storeProductImages(
                $data->productImages(),
                $data->mainImage(),
                $product->id
            );

            DB::commit();
            return redirect()->back()->with('success', 'Product created successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to create product: ' . $e->getMessage()]);
        }
    }

    public function update(ProductRequest $request, $id)
    {
        // dd($request->all());
        try {
            DB::beginTransaction();

            $product = $this->productRepo->find($id);
            $payload = $request->validated();

            // 1. Update basic product details
            $product->update($payload);

            if ($request->delete_images) {
                $this->productRepo->deleteProductImages($request->delete_images);
            }

            if ($request->main_image_id || $request->hasFile('main_product_image')) {
                $product->images()->update(['is_main' => false]);
            }

            // 4. Handle Existing image promoted to Main
            if ($request->main_image_id) {
                $product->images()->where('id', $request->main_image_id)->update(['is_main' => true]);
            }

            // 5. Upload New Images (Handles setting is_main if it's a new file)
            if ($request->hasFile('productImages')) {
                $this->productRepo->storeProductImages(
                    $request->file('productImages'),
                    $request->file('main_product_image'),
                    $product->id
                );
            }

            DB::commit();
            return redirect()->back()->with('success', 'Product updated successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Update failed: ' . $e->getMessage()]);
        }
    }

    public function destroy(Product $product)
    {
        try {
            DB::beginTransaction();

            $imageIds = $product->images->pluck('id')->toArray();

            if (!empty($imageIds)) {
                $this->productRepo->deleteProductImages($imageIds);
            }
            $product->delete();
            DB::commit();

            return redirect()->back()->with('success', 'Product and associated images deleted successfully.');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'error' => 'Failed to delete product: ' . $e->getMessage()
            ]);
        }
    }
}
