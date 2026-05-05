<?php

namespace App\Services;

use App\Repositories\CustomerRepository;

class CustomerService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected CustomerRepository $customerRepository,
    ){}

    public function showCustomerData(int $customerId){
        // fetchCustomerData 
    }

    public function transactions(int $limit = 5){
        $payments = $this->customerRepository->latestPayments($limit);

        dd($payments);

    }
}
