<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\BaseRepository;

class CategoryRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }
}
