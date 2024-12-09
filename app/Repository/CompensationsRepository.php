<?php

namespace App\Repository;

use App\Models\Compensation;

class CompensationsRepository extends AbstractRepository
{
    public function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        return Compensation::query()->with(['corporation', 'substance'])-> get();
    }

    protected function model():  string{
        return Compensation::class;
    }

    protected function getRelations(): array
    {
        return [
          'logs',
        ];
    }
}
