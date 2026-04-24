<?php

namespace App\Jobs;

use App\Services\OrderService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ReleaseProducts implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public $orderNumber,
        protected OrderService $orderService,

        )
    {
        $this->orderNumber = $orderNumber;
        $this->orderService = $orderService;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        
    }
}
