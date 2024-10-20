<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\StreamedResponse;

class CSVExportService
{
    public function __construct(
        private readonly LogService $logService,
    ) {
    }

    public function exportCSV(): StreamedResponse
    {
        $response = new StreamedResponse(function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Corporation Title', 'Total Tax Rate']);
            $logs = $this->logService->getGroupedByTaxRate();

            foreach ($logs as $log) {
                fputcsv($handle, [$log->title, $log->total_tax_rate]);
            }

            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="logs_export.csv"');

        return $response;
    }

}
