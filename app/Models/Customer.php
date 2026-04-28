<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable(['user_id','notes','balance','priority','is_active','last_transaction_at','next_transaction_at','customer_type','customer_group','loyalty_points','referral_code','referred_by','metadata'])]

class Customer extends Model
{
    protected $with = ['user:id,name,email,phone','user.addresses'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }


}
