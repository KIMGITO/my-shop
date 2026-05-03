<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case DRAFT = 'draft';
    case PENDING = 'pending';
    case AUTHORIZED = 'authorized';
    case PAID = 'paid';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';
}
