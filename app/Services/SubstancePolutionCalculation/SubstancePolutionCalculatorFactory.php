<?php

namespace App\Services\SubstancePolutionCalculation;

class SubstancePolutionCalculatorFactory
{
    public static function getCalculator(string $formula): SubstancePolutionCalculator
    {
        return match ($formula) {
            'formula1' => new SubstancePolutionFirstFormulaCalculator(),
            'formula2' => new SubstancePolutionSecondFormulaCalculator(),
            'formula3' => new SubstancePolutionThirdFormulaCalculator(),
            'default' => throw new \Exception('Invalid formula selected!'),
        };
    }
}
