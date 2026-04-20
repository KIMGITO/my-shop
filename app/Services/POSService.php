<?php

namespace App\Services;

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
}
