<?php

namespace App\Models;

use App\Models\Credit;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\User;
use App\Traits\HasDatesScopes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable(['order_number','type','source','status','customer_id','user_id','total_amount','paid_amount','payment_status','balance','discount','tax','notes','expires_at'])]
class Order extends Model
{
    use HasDatesScopes;
    
    protected $casts = [
        'expires_at' => 'datetime',
    ];

    protected $with = ['items'];
    
    public function items()
    {
        return $this->hasMany(OrderItem::class);

    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payments(){
        return $this->hasMany(Payment::class);
    }

    public function credit(){
        return $this->hasOne(Credit::class);
    }


    public function scopePeakHours(Builder $query)
    {
        return $query->selectRaw('HOUR(created_at) as hour, COUNT(*) as total_orders')
            ->groupBy('hour')
            ->orderBy('total_orders', 'desc')
            ->first();
    }

}
