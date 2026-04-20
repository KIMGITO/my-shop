<?php

namespace App\Http\Controllers;

use App\Services\POSService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class POSController extends Controller
{
    public function __construct(protected POSService $POSService)
    {
        $this->POSService = $POSService;
    }

    public function index(){
        // get products
       $products =  $this->POSService->getPOSProducts();
       dd($products);

    //    return Inertia::render('Pos/Index');

    }
}
