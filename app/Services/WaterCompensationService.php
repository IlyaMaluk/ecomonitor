<?php

namespace App\Services;

use App\Http\Requests\CreateWaterCompensationRequest;
use App\Models\Substance;
use App\Models\WaterCompensation;
use App\Repository\SubstanceRepository;
use App\Repository\WaterCompensationRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class WaterCompensationService
{
    public function __construct(
        private readonly WaterCompensationRepository $repository,
        private readonly SubstanceRepository         $substanceRepository,
    )
    {
    }

    public function create(CreateWaterCompensationRequest $request): Model
    {
        $data = $request->validated();
        $waterCompensation = $this->repository->create($data);

        $this->repository->update($waterCompensation, [
            'calculated_water_compensation' => $this->calculateCompensation($data),
        ]);

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

    private function sumSubstances(array $data): float
    {
        $substancesCollection = collect($data['substances']);

        /** @var Collection<Substance> $substances */
        $substances = $this->substanceRepository
            ->query()
            ->whereIn(
                'id',
                $substancesCollection
                    ->pluck('substance_id')
                    ->toArray()
            )->get();
        $sum = 0;

        foreach ($substancesCollection as $key => $substance) {
            $sum += $substance['polution_mass'] * $this->calculateEconomicLoss($data, $substances[$key]);
        }

        return $sum;
    }

    private function calculateCompensation(array $data): float
    {
        return $data['category_coefficient']
            * $data['regional_coefficient']
            * 1.5
            * $this->sumSubstances($data);
    }

    private function calculateEconomicLoss(array $data, Substance $substance): float
    {
        return $this->calculateOwnEconomicLoss($data) / $substance->tlv;
    }

    private function calculateOwnEconomicLoss(array $data): float
    {
        return $data['indexated_loss'] * config('losses')["{$data['year']}"] / 100;
    }
}
