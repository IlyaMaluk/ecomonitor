<?php

namespace App\Services\SubstancePolutionCalculation\Traits;

use App\Http\Requests\SubstancePolutionRequest;

trait HasTaxRateCalculation
{
    public function calculateTaxRate(SubstancePolutionRequest $request): float
    {
        $data = $request->validated();

        return $data['tax_rate']
            * $data['hazard_class_coeff']
            * $data['environmental_impact_coeff']
            * $data['event_scale_coeff']
            * $data['origin_character_coeff'];
    }
}
