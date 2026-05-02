<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PaymentRequest extends FormRequest
{
    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'cashAmount'   =>  $this->cash ,
            'mpesaAmount'  =>  $this->mpesa,
            'creditAmount' =>  $this->credit,
            'phoneNumber' =>  $this->phone,
            'orderId' => $this->route('order')->id ?? null,
            'customerId' => $this->route('order')->customer_id ?? null,
        ]);
    }

    public function rules(): array
    {
        return [
            // Ensure order ID exists in the route and database
            'orderId' => [
                'required',
                'exists:orders,id'
            ],
            'phoneNumber' => ['nullable', 'string', 'max:20'],
            'cashAmount'  => ['required', 'numeric', 'min:0'],
            'mpesaAmount' => ['required', 'numeric', 'min:0'],
            'creditAmount'=> ['required', 'numeric', 'min:0'],

            // Customer is required ONLY if creditAmount > 0
            'customerId' => [
                'required_if:creditAmount,>0', 
                'nullable', 
                'exists:customers,id'
            ],
        ];
    }

    /**
     * Custom error messages for clarity.
     */
    public function messages(): array
    {
        return [
            'customer_id.required_if' => 'A customer must be selected to process a credit payment.',
            'order_id.exists'         => 'The specified order does not exist.',
        ];
    }
}