<?php

namespace App\Http\Controllers;

use App\Services\SearchService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(protected SearchService $search) {}

    public function products(Request $request)
    {
        $results = $this->search->searchProducts($request->query('q'));
        return response()->json($results);
    }

    public function suppliers(Request $request)
    {
        $results = $this->search->searchSuppliers($request->query('q'));
        return response()->json($results);
    }

    public function categories(Request $request)
    {
        $results = $this->search->searchCategories($request->query('q'));
        return response()->json($results);
    }
}
