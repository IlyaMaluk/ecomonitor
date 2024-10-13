<?php

namespace App\Enums\Log;

enum SortingTypes: string
{
    case BY_YEAR = 'year';
    case BY_VOLUME = 'volume';
    case BY_AIR_TAXES = 'air_taxes';
    case BY_WATER_TAXES = 'water_taxes';
}
