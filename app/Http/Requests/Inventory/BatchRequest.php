<?php

namespace App\Http\Requests\Inventory;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class BatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('manage inventory');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $batchId = $this->route('batch');

        return [
            'productId' => ['required', 'exists:products,id', 'numeric'],
            'supplierId' => ['required', 'exists:suppliers,id', 'numeric'],
            'expiryDate' => ['nullable', 'date', 'after_or_equal:today'],
            'intakeQuantity' => ['required', 'decimal:0,2'],
            'currentPrice' => ['required', 'decimal:0,2'],
        ];
    }

    public function attributes(): array
    {
        return [
            'productId' => 'product',
            'supplierId' => 'supplier',
            'expiryDate' => 'expiry date',
            'intakeQuantity' => 'intake quantity',
            'currentPrice' => 'current price',
        ];
    }
}
