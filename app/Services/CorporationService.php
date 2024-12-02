<?php

namespace App\Services;

use App\Http\Requests\CreateCorporationRequest;
use App\Models\Corporation;
use App\Repository\CorporationRepository;
use Illuminate\Database\Eloquent\Collection;

class CorporationService
{
    public function __construct(
        private readonly CorporationRepository $repository
    ) {
    }

    public function create(CreateCorporationRequest $request): Corporation
    {
        return $this->repository->create($request->validated());
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
