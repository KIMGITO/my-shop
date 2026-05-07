<?php

namespace App\Models;

use App\Models\Credit;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Traits\HasCustomerNumber;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
#[Fillable(['user_id','customer_number','notes','name','phone','email','balance','priority','is_active','last_transaction_at','next_transaction_at','customer_type','customer_group','loyalty_points','referral_code','referred_by','metadata'])]

class Customer extends Model
{

use HasCustomerNumber;
    protected $with = ['user:id,name,email,phone','user.addresses'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function credits(){
        return $this->hasMany(Credit::class);
    }
    

    public function orderPayments(){
            return $this->hasManyThrough(Payment::class,  Order::class);
    }

    public function creditPayments(){
        return $this->hasManyThrough(Payment::class, Credit::class);
    }


    public function getLatestPayments(int $customerId, int $limit = 5)
    {
        // 1. Get IDs of orders and credits belonging ONLY to this customer
        $orderIds = DB::table('orders')->where('customer_id', $customerId)->pluck('id');
        $creditIds = DB::table('credits')->where('customer_id', $customerId)->pluck('id');

        // 2. Fetch payments linked to those specific IDs
        return Payment::whereIn('order_id', $orderIds)
            ->orWhereIn('credit_id', $creditIds)
            ->latest()
            ->take($limit)
            ->get();
    }

}
