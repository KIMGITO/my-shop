<?php

namespace App\Enums;
enum CreditStatus: string {
    case UNPAID = 'unpaid';
    case PARTIAL = 'partial';
    case PAID = 'paid';
    case OVERDUE = 'overdue';
    case DEFAULTED = 'defaulted';
}
