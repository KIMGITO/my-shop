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
        return Payment::thisMonth()->income()->value('income');
    }

    public function revenuePercentage(){
        $revenue = Payment::thisMonth()->income()->value('income');
        $lastMonth = Payment::thisMonth(1)->income()->value('income');
        return (number_format($lastMonth > 0 ? $revenue * 100 / $lastMonth : 0,1));
    }

    public function totalExpenses():float{
        return Payment::thisMonth()->expenses()->value('expenses');
    }
}
