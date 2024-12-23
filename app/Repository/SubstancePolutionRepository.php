<?php

namespace App\Repository;

use App\Models\SubstancePolution;
use Illuminate\Database\Eloquent\Collection;

class SubstancePolutionRepository extends AbstractRepository
{
    protected function getRelations(): array
    {
        return [];
    }

    protected function model(): string
    {
        return SubstancePolution::class;
    }

    public function getAll(): Collection
    {
        return SubstancePolution::query()
            ->with(['substance'])
            ->get();
    }
}
