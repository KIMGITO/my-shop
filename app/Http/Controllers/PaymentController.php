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

        if( $order->balance == 0){ 
            
            return redirect()->route('pos.index')->with('error', 'This order is already fully paid.');
        }

        $totalAmount = $order->total_amount;
        $splitData = Arr::only($data, ['mpesaAmount','cashAmount','creditAmount']);

        $results  =  $this->paymentService->processSplitPayment($order->id, $totalAmount, $splitData, $order->customer_id);
        return redirect()->route('pos.index')->with('success', 'Payment processed successfully.')->with('payment_details', $results);
    }

    
}
