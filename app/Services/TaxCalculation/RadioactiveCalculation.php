<?php

namespace App\Services\TaxCalculation;

class RadioactiveCalculation implements TaxCalculationInterface
{

    public function calculate(float $volume, array $params): float
    {
        return $params['volume'] * 0.0133 + ($params['coefficient'] * $params['cost_price_ion'] * $volume) +
            1/32 * ($params['coefficient'] * $params['cost_price'] * $params['volume2']);
    }
}
