<?php

namespace App\Http\Requests;

use App\Enums\SubstancePolution\FormulaType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class SubstancePolutionRequest extends FormRequest
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
            'substance_id' => ['int', 'required'],
            'formula_type' => [new Enum(FormulaType::class), 'required'],
            'qi' => ['numeric', 'nullable'],
            'Mci' => ['numeric', 'nullable'],
            'S' => ['numeric', 'nullable'],
            'po' => ['numeric', 'nullable'],
            'tax_rate' => ['numeric', 'required'],
            'hazard_class_coeff' => ['numeric', 'required'],
            'environmental_impact_coeff' => ['numeric', 'required'],
            'event_scale_coeff' => ['numeric', 'required'],
            'origin_character_coeff' => ['numeric', 'required'],
        ];
    }
}
