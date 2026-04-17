<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\BatchRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function index(){

        return Inertia::render('Admin/Stock/Index');
    }

    public function store(BatchRequest $request){
        

    }


}
