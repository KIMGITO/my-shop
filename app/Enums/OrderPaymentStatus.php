<?php

namespace App\Enums;

enum OrderPaymentStatus: string
{
    case PARTIALLY_PAID = 'partially_paid';
    case PARTIALLY_REFUNDED = 'partially_refunded';
    case UNPAID = 'unpaid';
    case PAID = 'paid';
    case CREDIT = 'credit';
}
