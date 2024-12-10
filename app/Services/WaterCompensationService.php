<?php

namespace App\Services;

use App\Http\Requests\CreateWaterCompensationRequest;
use App\Models\WaterCompensation;
use App\Repository\WaterCompensationRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class WaterCompensationService
{
    public function __construct(
        private readonly WaterCompensationRepository $repository,
    )
    {
    }

    public function create(CreateWaterCompensationRequest $request): Model
    {
        $data = $request->validated();
        $waterCompensation = $this->repository->create($data);
        $this -> updateCalculatedCompensation($waterCompensation);
        return $waterCompensation;
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    private function sumSubstances(array $data, float $tlv)
    {
           $count = $data['substance_count'];
           $calculatedSum = 0;
           for ($i = 1; $i <= $count; $i++)
           {
               $calculatedSum = $calculatedSum + ($data['indexated_loss'] * (1/$tlv));
           }
           return $calculatedSum;
    }

    private function calculateCompensation(array $data, float $tlv): float
    {
        return $data['category_coefficient']
            * $data['regional_coefficient']
            * $data['polution_mass']
            * $this->sumSubstances($data, $tlv);
    }

    private function updateCalculatedCompensation(WaterCompensation $waterCompensation): void
    {
        $substance = $waterCompensation->substance;
        $calculatedCompensation = $this->calculateCompensation($waterCompensation->toArray(), $substance->tlv);
        $this->repository->update($waterCompensation, ['calculated_compensation' => $calculatedCompensation]);
    }
}
