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

        $this->deleteRelatedRecords($model);

        return $model->delete();
    }

    protected function deleteRelatedRecords(Model $model): void
    {
        $relations = $this->getRelations();

        foreach ($relations as $relation) {
            if (method_exists($model, $relation)) {
                $relatedRecords = $model->$relation()->get();

                foreach ($relatedRecords as $relatedRecord) {
                    $relatedRecord->delete();
                }
            }
        }
    }

    abstract protected function getRelations(): array;

    abstract protected function model(): string;
}
