<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable(['order_id','total_amount','customer_id','paid_amount','balance','status','due_date','issued_at','last_payment_at','notes','crated_by'])]


class Credit extends Model
{
    
    public function  customer(){
        return $this->belongsTo(Customer::class);
    }

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function  user(){
        return $this->belongsTo(User::class);
    }

    public function  payments(){
        return $this->hasMany(Payment::class);
    }
}
