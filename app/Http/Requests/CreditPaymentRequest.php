<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreditPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customerId' => ['required','exists:customers,id'],
            'cashAmount' => ['required','numeric','min:0'],
            'mpesaAmount' => ['required','numeric','min:0'],
            'creditAmount' => ['required','numeric','min:0'],
            'changeGiven' => ['required','numeric','min:0'],
            'phoneNumber' => ['nullable', 'regex:/^(?:254|\+254|0)?(7|1)[0-9]{8}$/'],
        ];
    }
}
