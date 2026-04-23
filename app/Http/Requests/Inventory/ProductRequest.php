<?php 
namespace App\Http\Requests\Inventory;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

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

        if (is_string($this->existing_images)) {
            $this->merge(['existing_images' => json_decode($this->existing_images, true) ?? []]);
        }

        if (is_string($this->delete_images)) {
            $this->merge(['delete_images' => json_decode($this->delete_images, true) ?? []]);
        }
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod('PUT') || $this->isMethod('PATCH');

        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'unit' => ['required', 'string'],
            'category' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'isPopular' => ['boolean'],
            'isFeatured' => ['boolean'],
            'badge' => ['nullable','string'],
            'shelfLife' => ['required','numeric','min:1'],

            // Image logic check
            'productImages' => [
                $isUpdate ? 'nullable' : 'required', 
                'array',
                function ($attribute, $value, $fail) use ($isUpdate) {
                    $newCount = is_array($this->productImages) ? count($this->productImages) : 0;
                    $existingCount = is_array($this->existing_images) ? count($this->existing_images) : 0;
                    $deletedCount = is_array($this->delete_images) ? count($this->delete_images) : 0;
                    
                    if (($newCount + $existingCount - $deletedCount) <= 0) {
                        $fail('At least one product image is required.');
                    }
                }
            ],

            'productImages.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],

            'main_product_image' => [
                $isUpdate ? 'nullable' : 'required',
                'image',
                'mimes:jpeg,png,jpg,webp',
                'max:5120',
                'required_without:main_image_id'
            ],

            'main_image_id' => [
                'required_without:main_product_image',
                'nullable',
                $isUpdate ? 'integer' : 'nullable', 
            ],

            'existing_images' => ['nullable', 'array'],
            'delete_images' => ['nullable', 'array'],
        ];
    }

    /**
     * Redirect all image-related errors to a single 'images' key
     */
    public function messages(): array
    {
        return [
            'productImages.required' => 'At least one product image is required.',
            'productImages.array' => 'Image data format is invalid.',
            'productImages.*.image' => 'One or more files are not valid images.',
            'productImages.*.mimes' => 'Only JPEG, PNG, JPG, and WebP images are allowed.',
            'productImages.*.max' => 'Each image must be less than 5MB.',
            'main_product_image.required' => 'A main product image is required.',
            'main_product_image.required_without' => 'Please select a main image.',
            'main_image_id.required_without' => 'Please select a main image',
        ];
    }

   /**
 * Handle a failed validation attempt.
 */
protected function failedValidation(Validator $validator): void
{
    $errors = $validator->errors()->toArray();
    $imageErrorMessages = [];
    $remainingErrors = [];

    foreach ($errors as $key => $messages) {
        // Collect all image-related errors
        if (str_contains($key, 'image')) {
            foreach ($messages as $message) {
                $imageErrorMessages[] = $message;
            }
        } else {
            $remainingErrors[$key] = $messages;
        }
    }

    if (!empty($imageErrorMessages)) {
        // Clear the original scattered image errors
        $validator->errors()->forget('productImages');
        $validator->errors()->forget('main_product_image');
        $validator->errors()->forget('main_image_id');
        
        foreach (array_unique($imageErrorMessages) as $message) {
            $validator->errors()->add('productImages', $message);
        }
    }

    parent::failedValidation($validator);
}
    /**
     * This ensures the error keys in the response are redirected
     */
    protected function passedValidation()
    {
    }
}