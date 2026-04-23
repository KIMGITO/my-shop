<?php

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Gate::allows('manage inventory');
    }

    protected function prepareForValidation()
    {

        $this->merge([
            'inStock' => filter_var($this->inStock, FILTER_VALIDATE_BOOLEAN),
            'isPopular' => filter_var($this->isPopular, FILTER_VALIDATE_BOOLEAN),
            'isFeatured' => filter_var($this->isFeatured, FILTER_VALIDATE_BOOLEAN),
        ]);

        // Decode JSON strings into PHP arrays
        if (is_string($this->existing_images)) {
            $this->merge(['existing_images' => json_decode($this->existing_images, true) ?? []]);
        }

        if (is_string($this->delete_images)) {
            $this->merge(['delete_images' => json_decode($this->delete_images, true) ?? []]);
        }
    }

    public function rules(): array
    {
        $isUpdate = $this->has('_method') && $this->_method === 'PUT';

        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:1'],
            'unit' => ['required', 'string'],
            'category' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'isPopular' => ['boolean'],
            'isFeatured' => ['boolean'],
            'badge' => ['nullable','string'],
            'shelfLife' => ['required','numeric','min:1'],

            // Image Validation
            'productImages' => [$isUpdate ? 'nullable' : 'required', 'array'],
            'productImages.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'main_product_image' => [$isUpdate ? 'nullable' : 'required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],

            // Metadata for updates
            'existing_images' => ['nullable', 'array'],
            'delete_images' => ['nullable', 'array'],
            'main_image_id' => ['nullable', 'integer'],

        ];
    }
}
