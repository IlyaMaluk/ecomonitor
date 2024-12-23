<?php

namespace App\Repository;

use App\Models\DamageAmount;
use Illuminate\Database\Eloquent\Collection;

class DamageAmountRepository extends AbstractRepository
{

    protected function getRelations(): array
    {
        return [];
    }

    protected function model(): string
    {
        return DamageAmount::class;
    }

    public function getAll(): Collection
    {
        return DamageAmount::query()
            ->with(['corporation'])
            ->get();
    }
}
