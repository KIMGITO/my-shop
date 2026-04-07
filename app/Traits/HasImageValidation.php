<?php
// App\Traits\HasImageValidation.php

namespace App\Traits;

trait HasImageValidation
{
    /**
     * Rules for any multi-image array field with nested structure (product_images[0][file])
     */
    public function imageArrayRules(string $field = 'images', array $extraRules = [], int $maxFiles = 10): array
    {
        $rules = [
            $field => array_merge(['nullable', 'array', "max:$maxFiles"], $extraRules),
            "$field.*" => ['nullable', 'array'], // Each item is an array
            "$field.*.file" => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'], // Validate the nested file
            'main_image_index' => ['nullable', 'integer', 'min:0'],
        ];

        return $rules;
    }

    /**
     * Rules for flattened structure (product_images[0] = file directly)
     */
    public function imageArrayRulesFlattened(string $field = 'images', array $extraRules = [], int $maxFiles = 10): array
    {
        $rules = [
            $field => array_merge(['nullable', 'array', "max:$maxFiles"], $extraRules),
            "$field.*" => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'main_image_index' => ['nullable', 'integer', 'min:0'],
        ];

        return $rules;
    }

    /**
     * Rules for any single image field with custom overrides.
     */
    public function singleImageRules(string $field = 'image', array $extraRules = []): array
    {
        return [
            $field => array_merge([
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,webp',
                'max:2048'
            ], $extraRules),
        ];
    }
}
