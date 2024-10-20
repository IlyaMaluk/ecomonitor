<?php

namespace App\Enums\Log;

enum SortingTypes: string
{
    case BY_YEAR = 'year';
    case BY_VOLUME = 'volume';
    case TAX_RATE = 'tax_rate';
}
