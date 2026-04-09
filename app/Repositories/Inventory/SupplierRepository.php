<?php

namespace App\Repositories\Inventory;

use App\Models\Supplier;
use App\Repositories\BaseRepository;

class SupplierRepository extends BaseRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(Supplier $model)
    {
        parent::__construct($model);
    }
}
