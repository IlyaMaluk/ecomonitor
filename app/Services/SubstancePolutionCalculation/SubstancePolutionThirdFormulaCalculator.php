<?php

namespace App\Services\SubstancePolutionCalculation;

use App\Http\Requests\SubstancePolutionRequest;
use App\Services\SubstancePolutionCalculation\Traits\HasTaxRateCalculation;

class SubstancePolutionThirdFormulaCalculator implements SubstancePolutionCalculator
{
    use HasTaxRateCalculation;

    public function calculate(SubstancePolutionRequest $request): float
    {
        $data = $request->validated();

        return $data['qi']
            * $data['S']
            * $this->calculateTaxRate($request);
    }
}
