<?php

namespace App\Repositories;

use App\Models\Payment;
use App\Repositories\BaseRepository;

class PaymentRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(Payment $model)
    {
        parent::__construct($model);
    }
}
