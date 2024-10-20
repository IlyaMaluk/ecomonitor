<?php

namespace App\Services\TaxCalculation;

interface TaxCalculationInterface
{
    public function calculate(float $volume, array $params): float;
}
