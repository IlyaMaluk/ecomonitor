<?php

namespace App\Services;

use App\Http\Requests\DamageAmountRequest;
use App\Models\DamageAmount;
use App\Repository\DamageAmountRepository;
use Illuminate\Database\Eloquent\Collection;

class DamageAmountService
{
    public function __construct(
        private readonly DamageAmountRepository $damageAmountRepository
    ) {
    }

    public function create(DamageAmountRequest $request): DamageAmount
    {
        $data = $request->validated();
        $amount = $data['monetary_evaluation']
            * $data['land_area']
            * $data['hazard_coeff']
            * $data['natural_value_coeff']
            * $data['complexity_coeff']
            * $data['pollution_area_coeff']
            * $data['reclamation_coeff'];

        /** @var DamageAmount */
        return $this->damageAmountRepository->create([
            'corporation_id' => $data['corporation_id'],
            'amount' => $amount,
        ]);
    }

    public function getAll(): Collection
    {
        return $this->damageAmountRepository->getAll();
    }
}
