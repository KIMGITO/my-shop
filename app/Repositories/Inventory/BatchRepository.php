<?php

namespace App\Repositories\Inventory;

use App\Models\Batch;
use App\Repositories\BaseRepository;

class BatchRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct( Batch $model)
    {
        parent::__construct($model);
    }
}
