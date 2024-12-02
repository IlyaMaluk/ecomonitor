<?php

namespace App\Services\TaxCalculation;

class WaterTaxCalculation implements TaxCalculationInterface
{

    public function calculate(float $volume, array $params): float
    {
        return $volume * $params['tax'] * $params['coefficient'];
    }
}
