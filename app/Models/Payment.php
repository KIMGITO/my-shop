<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
#(Fillable(['order_id','amount','method','status','reference','transaction_code','phone_number','notes]));

class Payment extends Model
{
    
    public function order(){
        return $this->belongsTo(Order::class);
    }

}
