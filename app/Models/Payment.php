<?php

namespace App\Models;

use App\Models\Order;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['order_id','amount_due','amount_paid','change_given','method','status','reference','transaction_code','phone_number','notes'])]

class Payment extends Model
{
    
    public function order(){
        return $this->belongsTo(Order::class);
    }

}
