<?php

namespace App\Services\SubstancePolutionCalculation;

use App\Http\Requests\SubstancePolutionRequest;
use App\Services\SubstancePolutionCalculation\Traits\HasTaxRateCalculation;

class SubstancePolutionSecondFormulaCalculator implements SubstancePolutionCalculator
{
    use HasTaxRateCalculation;

    public function calculate(SubstancePolutionRequest $request): float
    {
        $data = $request->validated();

        return $data['qi']
            * $data['po']
            * $data['S']
            * $this->calculateTaxRate($request);
    }
}
