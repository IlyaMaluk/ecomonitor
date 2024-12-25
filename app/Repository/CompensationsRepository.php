<?php

namespace App\Repository;

use App\Models\Compensation;
use Illuminate\Database\Eloquent\Collection;

class CompensationsRepository extends AbstractRepository
{
    public function getAll(): Collection
    {
        return Compensation::query()->with(['corporation', 'substance'])->get();
    }

    protected function model():  string
    {
        return Compensation::class;
    }

    protected function getRelations(): array
    {
        return [
          'logs',
        ];
    }
}
