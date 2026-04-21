<?php

namespace App\Enums;

enum TransactionType: string
{
    case POS = 'pos';
    case CUSTOMER = 'customer';
    case REFUND = 'refund';
    case ADJUSTMENT = 'adjustment';
    case EXPENSE = 'expense';
    case QUOTATION = 'quotation';

    public function prefix(): string
    {
        return match($this) {
            self::POS        => 'PS',
            self::CUSTOMER   => 'CS',
            self::REFUND     => 'RF',
            self::ADJUSTMENT => 'AJ',
            self::EXPENSE    => 'EX',
            self::QUOTATION  => 'QU',
        };
    }
}
