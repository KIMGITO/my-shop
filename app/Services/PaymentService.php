<?php

namespace App\Services;

use App\Models\Payment;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use Throwable;

class PaymentService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected PaymentRepository $paymentRepository,
        protected OrderRepository $orderRepository,
        )
    {
        $this->paymentRepository = $paymentRepository;
        $this->orderRepository = $orderRepository;
    }

    public function  registerPayment(string $orderId,  array $payload): Payment {
        // if has payment_id,  update else new 
        try {
            if($payload['payment_id']){
                $payment = $this->paymentRepository->find($payload['payment_id']);
                $payment->update(to_snake($payload));

                return $payment;
            } 

            $payment = $this->paymentRepository->create(to_snake($payload));
            return $payment;
        }
        catch(Throwable $th){
            throw $th;
        }

    }
}
