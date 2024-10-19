<?php

namespace App\Repository;

use App\Models\Log;
use App\Repository\QueryBuilders\LogQueryBuilder;
use Illuminate\Database\Eloquent\Collection;

class LogRepository extends AbstractRepository
{
    /**
     * @throws \Exception
     */
    public function updateById(int $id, array $data): ?Log
    {
        $log = Log::query()->find($id);

        if (!$log) {
            return null;
        }

        return $this->update($log, $data);
    }

    public function getAll(): Collection
    {
        return Log::query()->get();
    }

    public function getAllWithRelations(array $relations): Collection
    {
        return Log::query()->with($relations)->get();
    }

    public function query(): LogQueryBuilder
    {
        return new LogQueryBuilder();
    }

    protected function model(): string
    {
        return Log::class;
    }
}
