<?php

namespace App\Services\SubstancePolutionCalculation;

use App\Http\Requests\SubstancePolutionRequest;
use App\Models\SubstancePolution;

interface SubstancePolutionCalculator
{
    public function calculate(SubstancePolutionRequest $request): float;
}
