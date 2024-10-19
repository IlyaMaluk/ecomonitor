<?php

namespace App\Services\TaxCalculation;

interface TaxCalculationInterface
{
    public function calculate(array $params): float;
}
