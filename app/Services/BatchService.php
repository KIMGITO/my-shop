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


   public function getFormattedBatches()
{
    try {
        $batches = Batch::with('product')->get();
        
        $formatted = $batches->map(function ($batch) {
            $product = $batch->product;
            
            return array_merge( $batch->toArray(), [
                
                'product' => $product ? [
                    'id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->main_product_image,
                ] : null,
                
                'status' => $this->getBatchStatus($batch),
                
                'receiveDate' => Carbon::parse($batch->created_at)->format('d M Y'),
                
                'expiryDate' => Carbon::parse($batch->created_at)
                    ->addDays($product?->shelf_life ?? 0)
                    ->format('d M Y'),
                
                'intakeQuantity' => $batch->intake_quantity . ' ' . ($product->unit ?? ''),
                'balance' => $batch->balance . ' ' .($product->unit?? ''),
            ]);
        });
        
        return $formatted;
        
    } catch (\Throwable $th) {
        throw $th;
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
                $data['available_quantity'] = $data['intake_quantity'];
                $data['is_active'] = true;
                $this->batchRepository->create($data);
            }
        }catch(Throwable $e){
            Log::error('Batch Error: '. $e->getMessage());
            throw $e;
        }

    }


    public function getBatchStatus(Batch $batch){
        try {
            $batch = $batch->load('product:id,shelf_life');

            $receiveDate = Carbon::parse($batch->created_at);
            $shelfLife = $batch->product->shelf_life;
            $expiryDate = $receiveDate->addDays($shelfLife);

            $expireDays = (int) Carbon::today()->diffInDays($expiryDate);

            if($expireDays >= floor($shelfLife/2)){
                return 'expiring_soon';
            }else if($expireDays < floor($shelfLife/2) && $expireDays > 0){
                return 'expiring_soon';
            }else if($expireDays == 0){
                return 'expiring_today';
            } else{
                return 'expired';
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    

   


}
