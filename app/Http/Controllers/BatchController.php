<?php

namespace App\Http\Controllers;

use App\Http\Requests\Inventory\BatchRequest;
use App\Models\Batch;
use App\Repositories\Inventory\BatchRepository;
use App\Services\BatchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

class BatchController extends Controller
{
    public function __construct(protected BatchService $batchService, protected BatchRepository $batchRepository )
    {
        $this->batchService = $batchService;
        $this->batchRepository = $batchRepository;
    }


    public function index(){
        
        try{
            
            $batches = $this->batchService->getFormattedBatches();
            return Inertia::render('Admin/Stock/Index', ['batches' => toCamel($batches->toArray())]);
        } catch(Throwable $e){
            throw $e;
        }
    }

    public function store(BatchRequest $request){   
        try{
            DB::beginTransaction();
            $payload = $request->validated();

            $this->batchService->processBatch($payload);
            DB::commit();

            return redirect()->back()->with(['success' =>'Batch created successfully']);
        }catch(Throwable $e){
            DB::rollBack();
            return redirect()->back()->withErrors('Failed to save batch: '.$e->getMessage());
        }
    }

    public function update(BatchRequest $request,  $id){
        try{
            DB::beginTransaction();
            $payload = $request->validated();

            $this->batchService->processBatch($payload);
            
            DB::commit();
            return back()->with('success', 'Batch updated successfully');

        }catch(Throwable $e){
            DB::rollBack();
            return back()->withErrors('Failed to update batch: '.$e->getMessage());
        }
    }

}
