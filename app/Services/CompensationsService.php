<?php

namespace App\Services;

use App\Http\Requests\CreateCompensationsRequest;
use App\Http\Requests\CreateCorporationRequest;
use App\Models\Compensation;
use App\Repository\CompensationsRepository;
use Illuminate\Database\Eloquent\Collection;

class CompensationsService
{
    public function __construct(
        private readonly CompensationsRepository $repository,
    )
    {
    }

    public function create(CreateCompensationsRequest $request): Compensation
    {
        $data = $request->validated();
        return $this->repository->create($data + [
                'calculated_compensation' => $this->calculateCompensation($data),
            ]);
    }

    private function calculateCompensation(array $data): float
    {
        return $data['volume']
            * $data['salary']
            * $data['middle_concentration']
            * $data['middle_year_concentration']
            * $data['coefficient_villagers_count']
            * $data['coefficient_national_economy'];
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
