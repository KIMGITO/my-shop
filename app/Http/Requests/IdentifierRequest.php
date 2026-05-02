<?php 
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IdentifierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'identifier' => [
                'required',
                'string',
                Rule::when(
                    $this->identifier_type === 'email',
                    ['email:rfc,dns'], // Strict email validation
                    // Specific Kenyan Regex: matches 2547..., 2541..., 07..., 01...
                    ['regex:/^(?:254|\+254|0)?(7|1)[0-9]{8}$/']
                ),
            ],
            'identifier_type' => ['required','in:email,phone'],
        ];
    }

    public function messages(): array
    {
        return [
            'identifier.required' => 'Please enter your email or phone number.',
            'identifier.email' => 'The email address provided is invalid.',
            'identifier.regex' => 'Enter a valid Email or Kenyan phone number (starting with 07, 01, or 254  ).',
            'identifier_type.required' => 'We could not identify if this is an email or phone number.',
        ];
    }

    /**
     * Detection logic used in prepareForValidation
     */
    private function detectIdentifierType($value): ?string
    {
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'email';
        }

        // Checks for Kenyan phone format before validation starts
        if (preg_match('/^(?:254|\+254|0)?(7|1)[0-9]{8}$/', $value)) {
            return 'phone';
        }

        return null;
    }

    protected function prepareForValidation()
    {
        $identifier = trim($this->identifier ?? '');
        $type = ($this->detectIdentifierType($identifier));

        $this->merge([
                'identifier' => $identifier,
                'identifier_type' => $type,
            ]);

    }
}