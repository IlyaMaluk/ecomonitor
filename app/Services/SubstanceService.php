<?php

namespace App\Services;

use App\Http\Requests\CreateSubstanceRequest;
use App\Models\Substance;
use App\Repository\SubstanceRepository;
use Illuminate\Database\Eloquent\Collection;

class SubstanceService
{
    public function __construct(
        private readonly SubstanceRepository $repository,
    ) {
    }

    public function create(CreateSubstanceRequest $request): Substance
    {
        return $this->repository->create($request->validated());
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }

    public function destroy(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
