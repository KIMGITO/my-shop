<?php

namespace App\Services;

use App\Models\Customer;
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

    // Pass the $customer into the function
    public function transactions(Customer $customer, int $limit = 5)
    {
        // Pass the customer ID to the repository
        $payments = $this->customerRepository->latestPayments($customer->id, $limit);

        return collect($payments)->map(function ($payment) {
            return [
                'method' => $payment->method,
                'date'   => $payment->created_at->format('F j Y'),
                'amount' => $payment->amount_paid
            ];
        })->toArray();
    }

    public function customerStats (){
        $thisMonthCustomers =  Customer::thisMonth()->count();
        $lastMonthsCustomers = Customer::thisMonth(1) ->count();
        $totalCustomers  = Customer::count();

        $percentageIncrease = number_format(
            ( $lastMonthsCustomers > 0 ? $thisMonthCustomers / $lastMonthsCustomers : 0) * 100,
            1
        );

        return [
            'count' => $totalCustomers,
            'percentage'  => $percentageIncrease
        ];


    }
}
