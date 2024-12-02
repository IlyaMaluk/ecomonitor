<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSubstanceRequest;
use App\Services\SubstanceService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SubstanceController extends Controller
{
    public function __construct(
        private readonly SubstanceService $service,
    ) {
    }

    public function create(): Response
    {
        $substances = $this->service->getAll();

        return Inertia::render('Substances/Create', [
            'substances' => $substances,
        ]);
    }

    public function store(CreateSubstanceRequest $request): RedirectResponse
    {
        $this->service->create($request);

        return redirect()->route('substances.create');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->service->destroy($id);

        return redirect()->route('substances.create');
    }
}
