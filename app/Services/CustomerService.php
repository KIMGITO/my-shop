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
}
