<?php

namespace App\Models;

use App\Models\Traits\HasCustomerNumber;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
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


    public function getLatestPayments ($limit = 5){
        $orders = $this->orderPayments()->latest()->take($limit)->get();    
        $credits = $this->creditPayments()->latest()->take($limit)->get();

        return $orders->concat($credits) -> sortByDesc('created_at')->take($limit);
    }

}
