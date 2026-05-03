<?php

namespace App\Repositories;

use App\Models\Credit;

class CreditRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(Credit $model)
    {
        parent::__construct($model);
    }
}
