<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreditPaymentRequest;
use App\Models\Customer;
use App\Repositories\CustomerRepository;
use App\Services\CreditService;
use Illuminate\Support\Facades\DB;

class CreditController extends Controller
{
        public function __construct(
                protected CreditService $creditService,
                protected CustomerRepository $customerRepository,
                
        ){}
        public function pay(CreditPaymentRequest $request, Customer $customer){    
                
                return DB::transaction(function () use($request, $customer) {
                        $payload = $request->validated();
                        $amount = ($payload['cashAmount'] + $payload['mpesaAmount']);

                        $creditData = $this->creditService->payCredits($customer->id,  $amount);
                        $payments = $this->creditService->processCreditPayments($creditData, $payload['mpesaAmount'] , $payload['cashAmount']);

                        // update customer 

                        $customer->balance = $payments['balance'];
                        $customer->save();
                        
                        return redirect()->route('admin.customers.show',$customer->id)->with(['success' => 'Payment complete']);
                });

        }
}
