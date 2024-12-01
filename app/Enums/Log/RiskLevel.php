<?php

namespace App\Enums\Log;

enum RiskLevel: string
{
    case HIGH = 'HIGH';
    case NORMAL = 'NORMAL';
    case LOW = 'LOW';
    case MINIMUM = 'MINIMUM';
}
