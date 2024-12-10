<?php

namespace App\Repository;

use App\Models\WaterCompensation;
use Illuminate\Database\Eloquent\Collection;

class WaterCompensationRepository extends AbstractRepository
{
    public function getAll(): Collection
    {
        return WaterCompensation::query()->with(['corporation', 'substance'])->get();
    }

    protected function getRelations(): array
    {
        return [
            'logs',
        ];
    }

    protected function model(): string
    {
        return WaterCompensation::class;
    }
}
