<?php

namespace App\Jobs;


use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class ReleaseProducts implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */

    public function __construct(
        public $orderNumber,
     
        )
    {

    }

    /**
     * Execute the job.
     */
    public function handle(OrderRepository $orderRepository, BatchRepository $batchRepository): void
    {
        $order = $orderRepository->findByOrderNumber($this->orderNumber);

        

        if(
            !$order || 
            in_array($order->status, ['expired','completed']) || 
            is_null( $order->expires_at) ||  
            $order->expires_at->isFuture()
        ){
            return;
        }


        DB::transaction(function () use($order, $orderRepository, $batchRepository){
            $orderRepository->update($order->id, ['status' => 'expired','expires_at' => null]);

            $order->items->each(function ($item) use($batchRepository){
                $batchRepository->releaseStock($item->batch_id,  $item->quantity);
            });
        },2);

        
    }
}
