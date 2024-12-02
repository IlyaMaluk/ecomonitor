<?php

namespace App\Services\TaxCalculation;

class TaxCalculationFactory
{
    public static function calculationMethod(?string $slug): ?TaxCalculationInterface
    {
        return match ($slug) {
            'air' => new AirTaxCalculation(),
            'water', 'waste_placement' => new WaterTaxCalculation(),
            'radioactive' => new RadioactiveCalculation(),
            'temp_radioactive' => new TempRadioactiveCalculation(),
            default => null,
        };
    }
}
