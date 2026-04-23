<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable(['order_number','type','source','status','customer_id','user_id','total_amount','paid_amount','balance','discount','tax','notes','expires_at'])]
class Order extends Model
{
    protected $casts = [
        'expires_at' => 'datetime',
    ];
    public function items()
    {
        // return $this->hasMany(OrderItem::class);

    }
    public function customer()
    {
        return $this->belongsTo(User::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
