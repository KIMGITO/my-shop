<?php

namespace App\Repositories;

use App\Models\POS;

class POSRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(POS $model)
    {
        parent::__construct($model);
    }
}
