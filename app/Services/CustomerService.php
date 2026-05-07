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

        return  collect($payments)->map(function ($payment){
            return [
                'method' => $payment->method,
                'date' => $payment->created_at->format('F j Y'),
                'amount' => $payment->amount_paid
            ];
        })->toArray();


    }
}
