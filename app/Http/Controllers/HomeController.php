<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterLogRequest;
use App\Services\CorporationService;
use App\Services\LogService;
use App\Services\SubstanceService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly SubstanceService $substanceService,
        private readonly CorporationService $corporationService,
        private readonly LogService $logService,
    ) {
    }

    public function index(FilterLogRequest $request): Response
    {
        $logs = $this->logService->getFilteredWithRelations($request);
        $corporations = $this->corporationService->getAll();
        $substances = $this->substanceService->getAll();

        return Inertia::render('Homepage/Index', [
            'substances' => $substances,
            'corporations' => $corporations,
            'emissions' => $logs,
        ]);
    }
}
