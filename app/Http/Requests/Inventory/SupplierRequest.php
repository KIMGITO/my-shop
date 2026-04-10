<?php

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class SupplierRequest extends FormRequest
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
     */
    public function rules(): array
    {
        $supplierId = $this->route('supplier');

        return [
            "name" => ['required', 'string', 'max:255'],
            "email" => [
                'required',
                'email',
                Rule::unique('suppliers', 'email')->ignore($supplierId)
            ],
            "phone" => [
                'required',
                'regex:/^(?:\+254|0)[17][0-9]{8}$/',
                Rule::unique('suppliers', 'phone')->ignore($supplierId)
            ],
            "type" => ['required', 'string', 'max:100'],
            "logo" => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            "removeExistingLogo" => ['boolean', 'required'],
            "contact" => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Handle incoming data before validation (e.g. converting 1/0 to true/false)
     */
    protected function prepareForValidation()
    {

        $this->merge([
            'removeExistingLogo' => filter_var($this->removeExistingLogo, FILTER_VALIDATE_BOOLEAN),
        ]);
    }
}
