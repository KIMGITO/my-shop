<?php

namespace App\Http\Controllers;

use App\Repositories\CustomerRepository;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(
        protected CustomerRepository $customerRepository,
        protected CustomerService $customerService,
    )
    {
    }

    public function index(){
        $customers = $this->customerRepository->all();
        return Inertia::render('Admin/Customer/Index', ['customers' => $customers]);
    }
    
}
