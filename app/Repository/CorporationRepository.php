<?php

namespace App\Repository;

use App\Models\Corporation;
use Illuminate\Database\Eloquent\Collection;

class CorporationRepository
{
    public function create(array $data): Corporation
    {
        $corporation = new Corporation();

        return $this->update($corporation, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(Corporation $corporation, array $data): Corporation
    {
        $corporation->fill($data);

        if (!$corporation->save()) {
            throw new \Exception("Failed to update corporation $corporation->id");
        }

        return $corporation;
    }

    public function getAll(): Collection
    {
        return Corporation::query()->get();
    }

    public function delete(int $id): bool
    {
        $corporation = Corporation::query()->find($id);

        if (!$corporation) {
            return false;
        }

        $corporation->delete();

        return true;
    }
}
