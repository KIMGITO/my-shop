<?php

namespace App\Services;

use App\Models\Batch;
use App\Models\Inventory\Product;
use App\Repositories\POSRepository;

class POSService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected POSRepository $POSRepository)
    {
        $this->POSRepository = $POSRepository;
    }

    public function getPOSProducts(){
        $batch = Batch::with('product')->where('balance','>' ,0)->get();

        $POSProducts = $batch->map(function ($batch){
            $product = $batch->product;
            return  
                [
                    'id' => $batch->id,
                    'batchNumber' => $batch->batch_number,
                    'name' => $product->name ?? '',
                    'price' => (int) $product->price ?? 0,
                    'unit' => $product->unit ?? '',
                    'available' => $batch->balance,
                    'category' => $product->category ?? '',
                    'image' => $product->main_product_image ?? '',
                    'isPopular' => $product->is_popular ?? false,
                    'isOrganic' => $product->is_organic ?? false,
                    'frequency' => $product->frequency ?? 0, 

                ];
        });

        return toCamel($POSProducts->toArray());
        
    }
}
