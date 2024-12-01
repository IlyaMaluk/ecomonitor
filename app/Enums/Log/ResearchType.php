<?php

namespace App\Enums\Log;

enum ResearchType: string
{
    case NON_CARCINOGENIC = 'Неканцерогенний';
    case CARCINOGENIC = 'Канцерогенний';

    public static function getLists(): array
    {
        return [
            self::NON_CARCINOGENIC->name => self::NON_CARCINOGENIC->value,
            self::CARCINOGENIC->name => self::CARCINOGENIC->value,
        ];
    }
}
