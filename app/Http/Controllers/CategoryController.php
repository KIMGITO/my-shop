<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\CategoryRequest;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
        public function __construct(protected CategoryRepository $categoryRepository){}

        public function index()
        {
            // Logic to fetch and return categories
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
