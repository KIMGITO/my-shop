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
        $formattedProducts =  $this->productService->formatProductForUI($products);

        return Inertia::render('Admin/Product/Index', [
            'products' => toCamel($formattedProducts),
            'modalOpen' => false
        ]);
    }

    public function store(ProductRequest $request)
    {
        try {
            DB::beginTransaction();
            $data = new ProductDTO($request->validated());
            $product = $this->productRepo->create($data->product());

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
        try {
            DB::beginTransaction();

            $product = $this->productRepo->find($id);
            $payload = $request->validated();

        
            $product->update(toSnake($payload));

            if ($request->delete_images) {
                $this->productRepo->deleteProductImages($request->delete_images);
            }

            if ($request->main_image_id || $request->hasFile('main_product_image')) {
                $product->images()->update(['is_main' => false]);
            }

            if ($request->main_image_id) {
                $product->images()->where('id', $request->main_image_id)->update(['is_main' => true]);
            }

            if ($request->hasFile('productImages')) {
                $this->productRepo->storeProductImages(
                    $request->file('productImages'),
                    $request->file('main_product_image'),
                    $product->id
                );
            }
// 0797571738
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
