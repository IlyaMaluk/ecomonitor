<?php

namespace App\Http\Controllers;

use App\Services\CSVExportService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function __construct(
        private readonly CSVExportService $service,
    ) {
    }

    public function export(): StreamedResponse
    {
        return $this->service->exportCSV();
    }
}
