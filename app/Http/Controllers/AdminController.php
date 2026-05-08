<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function dashboard(){
        // all info

        return Inertia::render('Admin/Dashboard', []);
    }
}
