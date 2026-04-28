<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Repositories\BaseRepository;

class CustomerRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(Customer $model)
    {
        parent::__construct($model);
    }
}
