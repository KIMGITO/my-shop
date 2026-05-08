<?php

namespace App\Models;

use App\Models\Order;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['order_id','credit_id','amount_due','amount_paid','change_given','method','status','reference','transaction_code','phone_number','notes'])]

class Payment extends Model
{
    
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

    public function scopeExpense($query){
        return $query->selectRaw(
            'SUM(CASE WHEN amount_paid < 0 THEN amount_paid ELSE 0 END) as expense'
        );
    }

    public function scopeToday($query)
    {
        return $query->whereDate(
            'created_at',
            today()
        );
    }

    public function scopeThisWeek($query)
    {
        return $query->whereBetween(
            'created_at',
            [
                now()->startOfWeek(),
                now()->endOfWeek(),
            ]
        );
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth(
            'created_at',
            now()->month
        )->whereYear(
            'created_at',
            now()->year
        );
    }

    public function scopeThisYear($query)
    {
        return $query->whereYear(
            'created_at',
            now()->year
        );
    }

}
