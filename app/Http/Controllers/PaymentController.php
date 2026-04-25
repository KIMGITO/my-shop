<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(protected PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function  store(PaymentRequest $request){
        $payload = $request->validated();

        return;
    }
}
