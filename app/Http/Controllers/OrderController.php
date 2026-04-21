<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    

    public function orderNumber(){
        $orderNumber = $this->orderService->getOrderNumber();

        return response()->json(['orderNumber' => $orderNumber]);
    }
}
