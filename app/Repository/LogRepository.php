<?php

namespace App\Repository;

use App\Models\Log;
use App\Repository\QueryBuilders\LogQueryBuilder;
use Illuminate\Database\Eloquent\Collection;

class LogRepository
{
    public function create(array $data): Log
    {
        $log = new Log();

        return $this->update($log, $data);
    }

    public function update(Log $log, array $data): Log
    {
        $log->fill($data);

        if (!$log->save()) {
            throw new \Exception("Failed to update log $log->id");
        }

        return $log;
    }

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

    public function delete(int $id): bool
    {
        $log = Log::query()->find($id);

        if (!$log) {
            return false;
        }

        $log->delete();

        return true;
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
}
