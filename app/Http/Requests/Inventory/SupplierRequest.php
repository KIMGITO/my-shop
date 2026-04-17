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
            "logo" => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if ($value instanceof \Illuminate\Http\UploadedFile) {
                        if (!in_array($value->getClientOriginalExtension(), ['jpeg', 'jpg', 'png', 'webp'])) {
                            $fail('Invalid image format.');
                        }
                    } elseif (!is_string($value) && !is_null($value)) {
                        $fail('Logo must be .');
                    }
                }
            ],
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
