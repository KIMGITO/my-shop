<?php

namespace App\Enums;

enum PaymentMethods: string
{
    case CASH = 'cash';
    case MPESA = 'mpesa';
    case CARD = 'card';
    case BANK = 'bank';
}
