<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
#[Fillable(['order_number','type','source','status','customer_id','user_id','total_amount','paid_amount','balance','discount','tax','notes','expires_at'])]
class Order extends Model
{
    
}
