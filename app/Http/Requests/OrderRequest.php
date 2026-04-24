<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('process checkout') || Gate::allows('create orders');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'orderNumber' => 'nullable|string',
            'customerId' => 'nullable|integer|exists:users,id',
            'discount' => 'nullable|numeric',
            'tax' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'total' => 'required|numeric',
            'paid' => 'nullable|numeric',
            'expireTime' => 'nullable|date',
            'items' => 'required|array',
            'items.*.batch_id' => 'required|integer|exists:batches,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ];
    }

    
}
