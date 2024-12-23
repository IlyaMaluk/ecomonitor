<?php

namespace App\Services\SubstancePolutionCalculation;

use App\Http\Requests\SubstancePolutionRequest;
use App\Models\SubstancePolution;
use App\Services\SubstancePolutionCalculation\Traits\HasTaxRateCalculation;

class SubstancePolutionFirstFormulaCalculator implements SubstancePolutionCalculator
{
    use HasTaxRateCalculation;

    public function calculate(SubstancePolutionRequest $request): float
    {
        $data = $request->validated();
        return $data['qi']
            * $data['Mci']
            * $this->calculateTaxRate($request);
    }
}
