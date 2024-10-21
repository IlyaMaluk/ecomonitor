<?php

namespace App\Services;

use App\Http\Requests\CreateLogRequest;
use App\Http\Requests\FilterLogRequest;
use App\Models\Log;
use App\Repository\LogRepository;
use App\Services\TaxCalculation\TaxCalculationFactory;
use Illuminate\Database\Eloquent\Collection;

class LogService
{
    public function __construct(
        private readonly LogRepository $repository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function create(CreateLogRequest $request): Log
    {
        $data = $request->validated();
        $log = $this->repository->create($data);
        $calculator = TaxCalculationFactory::calculationMethod($data['tax_type_slug']);

        return $this->repository->update($log, [
            'tax_rate' => $calculator->calculate($log->volume, $data['params']),
        ]);
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }

    public function getAllWithRelations(): Collection
    {
        return $this->repository->getAllWithRelations([
            'corporation',
            'substance',
        ]);
    }

    public function getFilteredWithRelations(FilterLogRequest $request): Collection
    {
        return $this->repository
            ->query()
            ->filterWithRelations(
                $request->validated(),
                [
                    'corporation',
                    'substance',
                    'taxType',
                ]
            )
            ->get();
    }

    public function getGroupedByTaxRate(): Collection
    {
        return $this->repository->getGroupedByTaxRate();
    }

    /**
     * @throws \Exception
     */
    public function update(int $id, CreateLogRequest $request): Log
    {
        return $this->repository->updateById($id, $request->validated());
    }

    public function destroy(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
