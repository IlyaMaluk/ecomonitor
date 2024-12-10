<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateWaterCompensationRequest extends FormRequest
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
            'category_coefficient' => ['numeric', 'required'],
            'regional_coefficient' => ['numeric', 'required'],
            'polution_mass' => ['numeric', 'required'],
            'indexated_loss' => ['numeric', 'required'],
            'substance_count' => ['int', 'required'],
        ];
    }
}
