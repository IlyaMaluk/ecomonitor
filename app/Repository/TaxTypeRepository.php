<?php

namespace App\Repository;

use App\Models\TaxType;
use Illuminate\Database\Eloquent\Collection;

class TaxTypeRepository extends AbstractRepository
{
    public function getAll(): Collection
    {
        return TaxType::query()->get();
    }

    protected function model(): string
    {
        return TaxType::class;
    }
}
