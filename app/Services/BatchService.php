<?php

namespace App\Services;

use App\Models\Batch;
use App\Repositories\Inventory\BatchRepository;
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

    // transform batches data (camelCase)

    // process batches 
    public function processBatch(array $payload, $id = null){
        
        try{

            $data = toSnake($payload);

            if($id){
                // update
                $this->batchRepository->update($id, $data);
            }else{
                // crate
                $this->batchRepository->create($data);
            }
        }catch(Throwable $e){
            Log::error('Batch Error: '. $e->getMessage());
            throw $e;
        }

    }

    

    // generate batch number
    public function generateBatchNumber(Batch $batch){
        $rand = random_int(1000,9000);
    }


}
