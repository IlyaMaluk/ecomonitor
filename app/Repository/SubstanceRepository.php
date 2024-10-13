<?php

namespace App\Repository;

use App\Models\Substance;
use Illuminate\Database\Eloquent\Collection;

class SubstanceRepository
{
    public function create(array $data): Substance
    {
        $substance = new Substance();

        return $this->update($substance, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(Substance $substance, array $data): Substance
    {
        $substance->fill($data);

        if (!$substance->save()) {
            throw new \Exception("Failed to update substance $substance->id");
        }

        return $substance;
    }

    public function getAll(): Collection
    {
        return Substance::query()->get();
    }

    public function delete(int $id): bool
    {
        $substance = Substance::query()->find($id);

        if (!$substance) {
            return false;
        }

        $substance->delete();

        return true;
    }
}
