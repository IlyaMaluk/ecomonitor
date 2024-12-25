<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateWaterCompensationRequest;
use App\Models\WaterCompensation;
use App\Services\CorporationService;
use App\Services\SubstanceService;
use App\Services\WaterCompensationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WaterCompensationController extends Controller
{
    public function __construct(
        private readonly WaterCompensationService $service,
        private readonly SubstanceService         $substanceService,
        private readonly CorporationService       $corporationService,
    )
    {
    }

    public function create(): Response
    {
        $corporations = $this->corporationService->getAll();
        $substances = $this->substanceService->getAll();
        $compensations = $this->service->getAll();

        return Inertia::render('WaterCompensations/Create', [
            'watercompensations' => $compensations,
            'substances' => $substances,
            'corporations' => $corporations
        ]);
    }

    public function store(CreateWaterCompensationRequest $request): RedirectResponse
    {
        $this->service->create($request);
        return redirect()->route('watercompensations.create');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->service->delete($id);
        return redirect()->route('watercompensations.create');
    }
}
