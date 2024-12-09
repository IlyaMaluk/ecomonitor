<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompensationsRequest;
use App\Services\CompensationsService;
use App\Services\CorporationService;
use App\Services\SubstanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompensationsController extends Controller
{
    public function __construct(
        private readonly CompensationsService $service,
        private readonly SubstanceService     $substanceService,
        private readonly CorporationService   $corporationService,
    )
    {
    }

    public function create(): Response
    {
        $corporations = $this->corporationService->getAll();
        $substances = $this->substanceService->getAll();
        $compensations = $this->service->getAll();
        return Inertia::render('Compensations/Create', [
            'compensations' => $compensations,
            'substances' => $substances,
            'corporations' => $corporations,
        ]);
    }

    public function store(CreateCompensationsRequest $request): RedirectResponse
    {
        $this->service->create($request);
        return redirect()->route('compensations.create');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->service->delete($id);
        return redirect()->route('compensations.create');
    }
}
