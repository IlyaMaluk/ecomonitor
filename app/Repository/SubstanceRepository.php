<?php

namespace App\Repository;

use App\Models\Substance;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class SubstanceRepository extends AbstractRepository
{
    public function getAll(): Collection
    {
        return Substance::query()->get();
    }

    protected function model(): string
    {
        return Substance::class;
    }

    protected function getRelations(): array
    {
        return [
            'logs',
        ];
    }

    public function query(): Builder
    {
        return Substance::query();
    }
}
