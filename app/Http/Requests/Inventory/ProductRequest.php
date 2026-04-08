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

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:1'],
            'unit' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'category' => ['required', 'string', 'max:100'],
            'isPopular' => ['required', 'boolean'],
            'isFeatured' => ['required', 'boolean'],
            'badge' => ['nullable', 'string', 'max:50'],
            'productImages' => ['required', 'array', 'max:3', 'min:1'],
            'productImages.*.file' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'main_product_image' => ['image', 'required', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ];
    }

    public function prepareForValidation()
    {
        if ($this->productImages) {
            $images = extractImages($this->productImages);
            $this->merge([
                'productImages' => $images['files'],
                'main_product_image' => $images['main']
            ]);
        }

        // dd($this->all());
    }
}
