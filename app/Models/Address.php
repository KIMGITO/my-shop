<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'name', 'street', 'land_mark', 'type', 'county', 'estate', 'house_number', 'phone_number','delivery_instructions', 'is_default'])]
class Address extends Model
{

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
