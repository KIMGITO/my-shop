<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inventory\CategoryRequest;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
        public function __construct(protected CategoryRepository $categoryRepository){}

        public function index()
        {
            $categories = $this->categoryRepository->all();
            $categories->map(function($category){
                $product_count = $category->products->count();
                return [
                    ...$category->toArray(),
                    'count' => $product_count,
                    'label' => $category->name,
                ];
            });

            return Inertia::render('Admin/Category/Index', [
                'categories' => toCamel($categories->toArray())
            ]);
        }
    
        public function store(CategoryRequest $request)
        {
            $payload = $request->validated();
            $this->categoryRepository->create($payload);
            return redirect()->back()->with('success', 'Category created successfully');

        }
    
        public function update(CategoryRequest $request, Category $category)
        {
            $payload = $request->validated();
            $this->categoryRepository->update($category->id, $payload);
            return redirect()->back()->with('success', 'Category updated successfully');
        }
    
        public function destroy($id)
        {
            // Logic to delete a category
        }
}
