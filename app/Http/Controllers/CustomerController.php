<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomerExceptions;
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

    public function  debt(Customer $customer){
        if(!$customer){
            throw new CustomerExceptions('No customer found!');
        }

        $data = [
            'customerId' =>$customer->id,
            'name' => $customer->name,
            'phone' => $customer->phone,
            'outstandingBalance' => $customer->balance,
        ];
        $latestPayments = $this->customerService->transactions();

        // last 5 transactions.
        // get order or credit where  payment is not credit and get the payment with order id or credit id of the first 5 

        return  response()->json(['customerDebt' => $data]);
    }
    
}
