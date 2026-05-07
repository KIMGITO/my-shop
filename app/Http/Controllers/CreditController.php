<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreditPaymentRequest;
use App\Models\Customer;
use App\Services\CreditService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class CreditController extends Controller
{
        public function __construct(
                protected CreditService $creditService,
        ){}
        public function pay(CreditPaymentRequest $request, Customer $customer){    
                
                DB::transaction(function () use($request, $customer) {
                        $payload = $request->validated();
                        $amount = ($payload['cashAmount'] + $payload['mpesaAmount']);

                        $creditStatus = $this->creditService->payCredits($customer->id,  $amount);

                        dd($creditStatus);
                });

        }
}
