<?php

namespace App\Repository\QueryBuilders;

use App\Models\Log;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class LogQueryBuilder
{
    private Builder $query;

    public function __construct()
    {
        $this->query = Log::query();
    }

    public function load(array $relations): self
    {
        $this->query->with($relations);

        return $this;
    }

    public function filterWithRelations(array $args, array $relations = []): self
    {
        $this->load($relations);

        if (!empty($args['sort_by'])) {
            if (!empty($args['desc'])) {
                $this->query->orderByDesc($args['sort_by']);
            } else {
                $this->query->orderBy($args['sort_by']);
            }
        }

        if (!empty($args['q'])) {
            $this->query
                ->whereRelation('corporation', 'title', $args['q'])
                ->orWhereRelation('substance', 'title', $args['q'])
                ->orWhere('year', $args['q']);
        }

        return $this;
    }

    public function get(): Collection
    {
        return $this->query->get();
    }
}
