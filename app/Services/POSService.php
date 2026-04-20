<?php

namespace App\Services;

use App\Models\Batch;
use App\Models\Inventory\Product;
use App\Repositories\POSRepository;

class POSService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected POSRepository $POSRepository)
    {
        $this->POSRepository = $POSRepository;
    }

    public function getPOSProducts(){
        $products = Batch::all();
    }
}
