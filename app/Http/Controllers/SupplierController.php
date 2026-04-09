<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\SupplierRequest;
use App\Repositories\Inventory\SupplierRepository;
use App\Services\CloudinaryService;
use App\Services\SupplierService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    protected $supplierRepository;
    protected $supplierService;


    public function __construct(SupplierRepository $supplierRepository, SupplierService $supplierService)
    {
        $this->supplierRepository = $supplierRepository;
        $this->supplierService = $supplierService;
    }

    public function index()
    {
        $suppliers = $this->supplierRepository->all();
        return Inertia::render('Admin/Supplier/Index', ['suppliers' => $suppliers->toArray(), 'modalOpen' => false]);
    }

    public function store(SupplierRequest  $request)
    {
        $payload = $request->validated();
        $this->supplierService->storeData($payload);
    }
}
