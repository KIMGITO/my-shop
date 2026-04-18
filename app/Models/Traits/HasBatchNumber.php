<?php

namespace App\Models\Traits;


trait HasBatchNumber {
    public static function bootHasBatchNumber(){
        static::creating(function ($model){
            $rand = random_int(1000,9000);
            $model -> batch_number = $rand;

        });
    }

}