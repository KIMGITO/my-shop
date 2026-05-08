<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AdminService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

public function __construct(
    protected AdminService $adminService,
){}


    public function dashboard(){
        // all info
        $dashboardData = $this->adminService->dashboardData();
        return Inertia::render('Admin/Dashboard', $dashboardData);
    }


    public function chartData(Request $request, string $chartType = 'income')
    {
        $request = $request->all();


        if ($chartType === 'income') {
            $data = $this->adminService->incomeChartData($request['start'],  $request['end']);

            return response()->json($data);
        }

        return response()->json([]);
    }
}
