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

    public function latestPayments(?int $limit = 5){
        return $this->model->getLatestPayments($limit);
    }

    

}
