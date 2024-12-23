<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DamageAmountRequest extends FormRequest
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
            'monetary_evaluation' => ['numeric', 'required'],
            'land_area' => ['numeric', 'required'],
            'hazard_coeff' => ['numeric', 'required'],
            'natural_value_coeff' => ['numeric', 'required'],
            'complexity_coeff' => ['numeric', 'required'],
            'pollution_area_coeff' => ['numeric', 'required'],
            'reclamation_coeff' => ['numeric', 'required'],
        ];
    }
}
