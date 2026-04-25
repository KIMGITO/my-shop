<?php

namespace App\Providers;

use App\Repositories\Inventory\BatchRepository;
use App\Repositories\OrderRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(OrderRepository::class, function ($app) {
            return new OrderRepository(new \App\Models\Order());
        });

        $this->app->bind(BatchRepository::class, function ($app) {
            return new BatchRepository(new \App\Models\Batch());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
