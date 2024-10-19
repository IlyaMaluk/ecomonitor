<?php

namespace App\Repository;

use App\Models\Corporation;
use Illuminate\Database\Eloquent\Collection;

class CorporationRepository extends AbstractRepository
{
    public function getAll(): Collection
    {
        return Corporation::query()->get();
    }

    protected function model(): string
    {
        return Corporation::class;
    }
}
