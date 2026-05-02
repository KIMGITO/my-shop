<?php

namespace App\Http\Controllers;

use App\Repositories\CustomerRepository;
use App\Services\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function __construct(
        protected CustomerRepository $customerRepository,
        protected CustomerService $customerService,
    )
    {
    }

    
}
