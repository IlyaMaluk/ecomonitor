<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateLogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'corporation_id' => ['int', 'required'],
            'substance_id' => ['int', 'required'],
            'tax_type_id' => ['int', 'required'],
            'year' => ['int', 'required'],
            'volume' => ['numeric', 'required'],
            'volume_spent' => ['numeric', 'required'],
            'params' => ['array', 'required'],
            'tax_type_slug' => ['string', 'required'],
            'research_type' => ['string', 'required'],
        ];
    }
}
