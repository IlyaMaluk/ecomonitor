<?php

namespace App\Services;

use App\Http\Requests\CreateCompensationsRequest;
use App\Models\Compensation;
use App\Repository\CompensationsRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CompensationsService
{
    public function __construct(
        private readonly CompensationsRepository $repository,
    )
    {
    }

    public function create(CreateCompensationsRequest $request): Model
    {
        $data = $request->validated();
        $compensation = $this->repository->create($data);
        $this -> updateCalculatedCompensation($compensation);
        return $compensation;
    }

    public function getAll(): Collection
    {

        return $this->repository->getAll();
    }



    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    private function calculateCompensation(array $data, float $tlv): float
    {
        return $data['volume']
            * $data['salary']
            * $data['middle_concentration']
            * ($data['middle_year_concentration']/$tlv)
            * $data['coefficient_villagers_count']
            * $data['coefficient_national_economy']
            * (1/$tlv);
    }

    private function updateCalculatedCompensation(Compensation $compensation): void
    {
        $substance = $compensation->substance;
        $calculatedCompensation = $this->calculateCompensation($compensation->toArray(), $substance->tlv);
        $this->repository->update($compensation, ['calculated_compensation' => $calculatedCompensation]);
    }
}
