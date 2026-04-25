<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Models\Order;
use App\Services\PaymentService;
use Illuminate\Support\Arr;

class PaymentController extends Controller
{
    public function __construct(protected PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function  store(PaymentRequest  $request, Order $order){
        $data = $request->validated();
        $totalAmount = $order->total_amount;
        $splitData = Arr::only($data, ['mpesa_amount','cash_amount','credit_amount']);

        $results  =  $this->paymentService->processSplitPayment($order->id, $totalAmount, $splitData, $order->customer_id);
        return back()->with('success', 'Payment processed successfully.')->with('payment_details', $results);
    }

    
}
