<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('process payments');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order_id' => ['required','exists:orders,id'],
            'cash_amount' => ['required','numeric','min:0'],
            'mpesa_amount' => ['required','numeric','min:0'],
            'credit_amount'=>['required','numeric','min:0'],
            'amount_paid'=> ['required','numeric','min:0'],
        ];
    }
}
