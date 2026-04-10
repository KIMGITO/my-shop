<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\SupplierRequest;
use App\Repositories\Inventory\SupplierRepository;
use App\Services\SupplierService;
use Inertia\Inertia;
use Throwable;

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
        $transformedData = $this->supplierService->transformSuppliers($suppliers);

        return Inertia::render('Admin/Supplier/Index', [
            'suppliers' => $transformedData,
            'modalOpen' => false
        ]);
    }

    public function store(SupplierRequest $request)
    {
        try {
            $this->supplierService->processSupplier($request->validated());

            return redirect()->back()->with('success', 'Supplier created successfully');
        } catch (Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Failed to create supplier: ' . $e->getMessage()
            ]);
        }
    }

    public function update(SupplierRequest $request, $id)
    {
        try {
            $this->supplierService->processSupplier($request->validated(), $id);

            return redirect()->back()->with('success', 'Supplier updated successfully');
        } catch (Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Failed to update supplier: ' . $e->getMessage()
            ]);
        }
    }
}
