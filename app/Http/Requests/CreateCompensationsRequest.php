<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCompensationsRequest extends FormRequest
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
            'year' => ['int', 'required'],
            'volume' => ['numeric', 'required'],
            'salary' => ['numeric', 'required'],
            'middle_concentration' => ['numeric', 'required'],
            'middle_year_concentration' => ['numeric', 'required'],
            'coefficient_villagers_count' => ['numeric', 'required'],
            'coefficient_national_economy' => ['numeric', 'required'],
        ];
    }
}
