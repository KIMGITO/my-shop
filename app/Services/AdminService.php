<?php

namespace App\Services;

use App\Models\Payment;
use App\Services\BatchService;
use App\Services\CustomerService;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Services\RevenueService;
use Carbon\Carbon;

class AdminService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected RevenueService $revenueService,
        protected OrderService $orderService,
        protected BatchService $batchService,
        protected ProductService $productService,
        protected CustomerService $customerService,


    ){}

    public function  dashboardData(){
        $income = $this->revenueService->totalRevenue();
        $revenuePercentage = $this->revenueService->revenuePercentage();

        $revenue = [
            'income' =>  number_format($income,2),
            'percentage' =>  $revenuePercentage
        ];

        // $expenses = $this->revenueService->totalExpenses();
        $expired = $this->batchService->countExpired();
        $expiringSoon = $this->batchService->countExpiringSoon();
        $totalProducts = $this->productService->totalProducts();
        $customers = $this->customerService->customerStats();

        $orderCount = $this->orderService->totalOrders();
        $peakHours = $this->orderService->peakHours();

        $orders = [
            'count' =>  $orderCount,
            'peakHour' => $peakHours->hour.':00 Hrs',
        ];

        $status = [];

        if ($expired > 0) {
            $status['count'] = "$expired";
            $status['message'] = "Expired products";
        }

        if ($expiringSoon > 0) {
            $status['count'] = "$expiringSoon";
            $status['message'] = "Expiring soon";
        }

        if ($totalProducts > 0) {
            $status['count'] = "$totalProducts";
            $status['message'] = "Expired products";
        }


        return [
            'revenue' =>$revenue,
            'orders' => $orders,
            'products' =>  $status,
            'customers' =>  $customers
        ];
    }

    public function incomeChartData(string $start, string $end)
    {
        $start = Carbon::parse($start)->startOfDay();
        $end = Carbon::parse($end)->endOfDay();
        return Payment::selectRaw('DATE(created_at) as date, SUM(amount_paid) as amount')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('date')
            ->orderBy('date')
            ->get();  
    }
}
