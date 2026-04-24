<?php

namespace App\Models;

<<<<<<< HEAD
use App\Models\Batch;
use App\Models\Order;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['order_id', 'batch_id', 'quantity', 'price', 'subtotal'])]

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'batch_id', 'quantity', 'price', 'subtotal'];
=======
use Illuminate\Database\Eloquent\Model;
#(Fillable(['order_id','batch_id','quantity','price','subtotal']);

class OrderItem extends Model
{
>>>>>>> features/order-model

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }
}
