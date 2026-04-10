<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'email', 'contact',  'phone', 'type', 'logo_url', 'logo_public_id'])]

class Supplier extends Model {}
