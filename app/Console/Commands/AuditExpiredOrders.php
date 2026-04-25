<?php

namespace App\Console\Commands;

use App\Jobs\ReleaseProducts;
use App\Models\Order;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('audit:expired-orders')]
#[Description('Audit orders that have expired and Queue work failed to notice and release the stock products back to inventory. This runs every 30 minutes')]
class AuditExpiredOrders extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        Order::whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->whereNotIn('status',['completed','expired'])
            ->chunkById(100, function ($orders){
                foreach($orders as $order){
                    ReleaseProducts::dispatch($order->order_number);
                }
            });

    }
}
