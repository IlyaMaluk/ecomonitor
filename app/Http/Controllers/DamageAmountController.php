<?php

namespace App\Http\Controllers;

use App\Http\Requests\DamageAmountRequest;
use App\Services\CorporationService;
use App\Services\DamageAmountService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DamageAmountController extends Controller
{
    public function __construct(
        private readonly CorporationService $corporationService,
        private readonly DamageAmountService $damageAmountService
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('DamageAmount/Index', [
            'corporations' => $this->corporationService->getAll(),
            'damageAmounts' => $this->damageAmountService->getAll(),
        ]);
    }

    public function store(DamageAmountRequest $request): RedirectResponse
    {
        $this->damageAmountService->create($request);

        return redirect()->route('damage-amount.index');
    }
}
