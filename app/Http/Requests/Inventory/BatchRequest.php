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
        return Gate::allows('manage stock');
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
            'expiryDate' => ['required', 'date', 'after_or_equal:today'],
            'intakeQuantity' => ['required', 'decimal:1'],
            'currentPrice' => ['nullable', 'decimal:0,2'],
        ];
    }
}
