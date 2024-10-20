<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterLogRequest;
use App\Services\CorporationService;
use App\Services\LogService;
use App\Services\SubstanceService;
use App\Services\TaxTypeService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly SubstanceService $substanceService,
        private readonly CorporationService $corporationService,
        private readonly LogService $logService,
        private readonly TaxTypeService $taxTypeService,
    ) {
    }

    public function index(FilterLogRequest $request): Response
    {
        $logs = $this->logService->getFilteredWithRelations($request);
        $logsGrouped = $this->logService->getGroupedByTaxRate();
        $corporations = $this->corporationService->getAll();
        $substances = $this->substanceService->getAll();

        return Inertia::render('Homepage/Index', [
            'substances' => $substances,
            'corporations' => $corporations,
            'emissions' => $logs,
            'taxTypes' => $this->taxTypeService->getAll(),
            'logsGrouped' => $logsGrouped,
        ]);
    }
}
