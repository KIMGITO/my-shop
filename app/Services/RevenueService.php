<?php

namespace App\Services;

use App\Models\Payment;

class RevenueService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function totalRevenue(): float {
        return  Payment::paid()->sum();
    }
}
