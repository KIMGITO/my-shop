<?php

namespace App\Models;

use App\Models\Order;
use App\Traits\HasDatesScopes;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['order_id','credit_id','amount_due','amount_paid','change_given','method','status','reference','transaction_code','phone_number','notes'])]

class Payment extends Model
{
    use HasDatesScopes;//for sorting daily,weekly,monthly,yearly

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function credit(){
        return $this->belongsTo(Credit::class);
    }


    public function scopeIncome($query){
        return $query->selectRaw(
            'SUM(amount_paid - change_given) as income'
        );
    }

    public function scopeExpenses($query){
        return $query->selectRaw(
            'SUM(CASE WHEN amount_paid < 0 THEN amount_paid ELSE 0 END) as expenses'
        );
    }


}
