<?php

namespace App\Services;

use App\Models\Batch;
use App\Repositories\Inventory\BatchRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class BatchService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected BatchRepository $batchRepository)
    {
        $this->batchRepository = $batchRepository;
    }


    public function  getFormattedBatches(){
        try {
            $batches = $this->batchRepository->all();

            $formatted = $batches->map(function ($batch){

            });

        } catch (\Throwable $th) {
            //throw $th;
        }

    }

   
    // process batches 
    public function processBatch(array $payload, $id = null){
        
        try{

            $data = toSnake($payload);

            if($id){
                // update
                $this->batchRepository->update($id, $data);
            }else{
                // crate
                $data['balance'] = $data['intake_quantity'];
                $data['is_active'] = true;
                $this->batchRepository->create($data);
            }
        }catch(Throwable $e){
            Log::error('Batch Error: '. $e->getMessage());
            throw $e;
        }

    }


    public function getStatus($receiveDate, $expiryDate){
        $receiveDate = Carbon::parse($receiveDate);
        $expiryDate = Carbon::parse($expiryDate);
        
    }
    

   


}
