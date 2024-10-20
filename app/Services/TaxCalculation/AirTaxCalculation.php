<?php

namespace App\Services\TaxCalculation;

class AirTaxCalculation implements TaxCalculationInterface
{

    public function calculate(float $volume, array $params): float
    {
        return $volume * $params['tax'];
    }
}
