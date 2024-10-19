<?php

namespace App\Repository;

use Illuminate\Database\Eloquent\Model;

abstract class AbstractRepository
{
    public function create(array $data): Model
    {
        $modelClass = $this->model();

        /** @var Model $model */
        $model = new $modelClass();

        return $this->update($model, $data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->fill($data);

        if (!$model->save()) {
            throw new \Exception("Failed to update model {${$this->model()}} $model->id");
        }

        return $model;
    }

    public function find(int $id): ?Model
    {
        $modelClass = $this->model();

        /** @var Model $model */
        $model = new $modelClass();

        return $model::query()->find($id);
    }

    public function delete(int $id): bool
    {
        $model = $this->find($id);

        if (!$model) {
            return false;
        }

        return $model->delete();
    }

    abstract protected function model(): string;
}
