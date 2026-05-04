<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
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


    public function show(Customer $customer){
        $customer = $this->customerRepository->find($customer->id);

        return Inertia::render('Admin/Customer/ShowCustomer', ['customer' =>$customer]);
    }
    
}
