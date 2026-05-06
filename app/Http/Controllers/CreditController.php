<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreditPaymentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class CreditController extends Controller
{
   
        public function pay(CreditPaymentRequest $request){
             DB::transaction(function () use($request) {
            $payload = $request->validated();
            $amount = $payload['cashAmount'] + $payload['mpesaAmount'];
            $change = $payload['changeGiven'];
    });

        }
}
