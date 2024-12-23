<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubstancePolutionRequest;
use App\Services\SubstancePolutionService;
use App\Services\SubstanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubstancePolutionController extends Controller
{
    public function __construct(
        private readonly SubstanceService $substanceService,
        private readonly SubstancePolutionService $substancePolutionService
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('SubstancePolution/Index', [
            'substances' => $this->substanceService->getAll(),
            'substancePolutions' => $this->substancePolutionService->getAll(),
        ]);
    }

    public function calculatePolution(SubstancePolutionRequest $request): RedirectResponse
    {
        $this->substancePolutionService->create($request);

        return redirect()->route('substance-polution.index');
    }
}
