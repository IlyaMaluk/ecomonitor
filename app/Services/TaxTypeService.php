<?php

namespace App\Services;

use App\Repository\TaxTypeRepository;
use Illuminate\Database\Eloquent\Collection;

class TaxTypeService
{
    public function __construct(
        private readonly TaxTypeRepository $taxTypeRepository,
    ) {
    }

    public function getAll(): Collection
    {
        return $this->taxTypeRepository->getAll();
    }
}
