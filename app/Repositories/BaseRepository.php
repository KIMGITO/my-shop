<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Psy\CodeCleaner\FunctionReturnInWriteContextPass;

class BaseRepository
{

    protected Model $model;
    protected Builder $query;
    public function __construct(Model $model)
    {
        $this->model = $model;
        $this->query = $model->newQuery();
    }

   public function all(): Collection
    {
        $result = $this->query->get();

        $this->reset();

        return $result;
    }

    protected function reset()
    {
        $this->query = $this->model->newQuery();
    }

    public function with(array $relations)
    {
        $this->query = $this->query->with($relations);
        return $this;
    }


    public function paginate($per_page = 15)
    {
        return $this->model->paginate($per_page);
    }

    public function find(int $id): Model
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create(toSnake($data));
    }

    public function update($id, array $data)
    {
        $record = $this->model->findOrFail($id);
        $record->update(toSnake($data));
        return $record;
    }
    public function delete($id)
    {
        return $this->model->find($id)->delete();
    }
}
