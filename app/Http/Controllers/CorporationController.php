<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCorporationRequest;
use App\Services\CorporationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CorporationController extends Controller
{
    public function __construct(
        private readonly CorporationService $service,
    ) {
    }

    public function create(): Response
    {
        $corporations = $this->service->getAll();

        return Inertia::render('Corporations/Create', [
            'corporations' => $corporations,
        ]);
    }

    public function store(CreateCorporationRequest $request): RedirectResponse
    {
        $this->service->create($request);

        return redirect()->route('corporations.create');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->service->delete($id);

        return redirect()->route('corporations.create');
    }
}
