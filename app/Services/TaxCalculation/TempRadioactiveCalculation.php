<?php

namespace App\Services\TaxCalculation;

class TempRadioactiveCalculation implements TaxCalculationInterface
{

    public function calculate(float $volume, array $params): float
    {
        return $volume * $params['n'] * $params['t'];
    }
}
