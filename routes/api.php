<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products/search', [SearchController::class,  'products']);
Route::get('/suppliers/search', [SearchController::class,  'suppliers']);


Route::get('/pos/orders/order-number', [OrderController::class, 'orderNumber']);
