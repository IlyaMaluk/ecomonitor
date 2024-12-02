<?php

namespace App\Http\Requests;

use App\Enums\Log\SortingTypes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class FilterLogRequest extends FormRequest
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
            'sort_by' => ['nullable', new Enum(SortingTypes::class)],
            'desc' => ['nullable', 'boolean'],
            'q' => ['nullable', 'string'],
        ];
    }
}
