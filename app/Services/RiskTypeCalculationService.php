<?php

namespace App\Services;

use App\Constants\RiskConstants;
use App\Enums\Log\ResearchType;
use App\Enums\Log\RiskLevel;
use App\Models\Log;
use InvalidArgumentException;

class RiskTypeCalculationService
{
    public function calculateRisk(Log $log, ResearchType $researchType): RiskLevel
    {
        return match ($researchType) {
            ResearchType::CARCINOGENIC => $this->calculateCarcinogenic($log),
            ResearchType::NON_CARCINOGENIC => $this->calculateNonCarcinogenic($log),
        };
    }

    private function calculateNonCarcinogenic(Log $log): RiskLevel
    {
        $hq = $log->substance->c / $log->substance->rfc;
        if ($hq > 3) {
            return RiskLevel::HIGH;
        } elseif ($hq >= 1.1) {
            return RiskLevel::NORMAL;
        } elseif ($hq >= 0.11 && $hq < 1.1) {
            return RiskLevel::LOW;
        } elseif ($hq <= 0.1) {
            return RiskLevel::MINIMUM;
        }

        throw new InvalidArgumentException("Недопустимое значение HQ: $hq");
    }

    private function calculateCarcinogenic(Log $log): RiskLevel
    {
        $coefficient = $log->substance->c
            * RiskConstants::CR
            * RiskConstants::EF
            * RiskConstants::ED
            / RiskConstants::BW
            * RiskConstants::AT
            * RiskConstants::YEAR_DURATION;

        if ($coefficient > 1e-3) {
            return RiskLevel::HIGH;
        } elseif ($coefficient > 1e-4 && $coefficient <= 1e-3) {
            return RiskLevel::NORMAL;
        } elseif ($coefficient > 1e-6 && $coefficient <= 1e-4) {
            return RiskLevel::LOW;
        } elseif ($coefficient <= 1e-6) {
            return RiskLevel::MINIMUM;
        }

        throw new InvalidArgumentException("Недопустимое значение");
    }
}
