<?php

namespace App\Services;

use App\Http\Requests\SubstancePolutionRequest;
use App\Models\SubstancePolution;
use App\Repository\SubstancePolutionRepository;
use App\Services\SubstancePolutionCalculation\SubstancePolutionCalculatorFactory;
use Illuminate\Database\Eloquent\Collection;

class SubstancePolutionService
{
    public function __construct(
        private readonly SubstancePolutionRepository $substancePolutionRepository,
    ) {
    }

    public function create(SubstancePolutionRequest $request): SubstancePolution
    {
        $data = $request->validated();
        $polution = SubstancePolutionCalculatorFactory::getCalculator($data['formula_type'])->calculate($request);

        /** @var SubstancePolution */
        return $this->substancePolutionRepository->create([
            'substance_id' => $data['substance_id'],
            'polution' => $polution,
        ]);
    }

    public function getAll(): Collection
    {
        return $this->substancePolutionRepository->getAll();
    }
}
