<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $address = $this->address;
        $user = Auth::id();

        return [
            'user_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string'],
            'street' => ['required', 'string'],
            'land_mark' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'in:home,office,cottage,others'],
            'county' => ['required', 'string'],
            'estate' => ['required', 'string', 'max:255'],
            'house_number' => ['required', 'string', 'max:100'],
            'phone_number' => [
                'required',
                'regex:/^(?:\+254|0)[17][0-9]{8}$/',
            ],
            'delivery_instructions' => ['nullable', 'string', 'max:300'],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->phone_number) {
            $phone = format_phone($this->phone_number);
            $this->merge([
                'phone_number' => $phone
            ]);
        }

        $this->merge([
            'user_id' => Auth::id(),
        ]);


        
    }
}
