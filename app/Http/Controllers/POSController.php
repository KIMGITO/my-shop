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
       $products =  $this->POSService->getPOSProducts();

       return Inertia::render('Pos/Index', ['POSProducts' => $products]);

    }
}
