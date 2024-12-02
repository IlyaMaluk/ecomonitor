<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LogsExport implements FromQuery, WithHeadings
{
    /**
     * Метод для генерации запроса
     */
    public function query()
    {
        return Log::selectRaw('SUM(tax_rate) as total_tax_rate, corporations.title')
            ->join('corporations as corporations', 'logs.corporation_id', '=', 'corporations.id')
            ->groupBy('corporations.title');
    }

    /**
     * Метод для указания заголовков
     */
    public function headings(): array
    {
        return [
            'Total Tax Rate',
            'Corporation Title',
        ];
    }
}
