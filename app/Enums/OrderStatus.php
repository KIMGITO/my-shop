<?php

namespace App\Enums;

enum OrderStatus:string
{
    case ACTIVE = 'active';
    case PARKED = 'parked';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
    case EXPIRED = 'expired';
}
