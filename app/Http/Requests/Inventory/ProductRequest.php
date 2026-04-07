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
            'product_images' => ['required', 'array', 'max:3', 'min:1'],
            'product_images.*.file' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'main_product_image' => ['image', 'required', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ];
    }

    public function prepareForValidation()
    {
        if ($this->product_images) {
            $images = extractImages($this->product_images);
            $this->merge([
                'product_images' => $images['files'],
                'main_product_image' => $images['main']
            ]);
        }

        // dd($this->all());
    }
}
