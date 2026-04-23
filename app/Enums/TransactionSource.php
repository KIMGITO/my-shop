<?php

namespace App\Enums;

enum TransactionSource: string
{
    case WEBSITE = 'website';
    case MOBILE_APP = 'mobile_app';
    case POS = 'pos';
    case SOCIAL = 'social';
    case MANUAL = 'manual';
    case MARKETPLACE = 'marketplace';
    case SUBSCRIPTION = 'subscription';
    case API = 'api';
    public function prefix(): string
    {
        return match($this) {
            self::WEBSITE      => 'WEB',
            self::MOBILE_APP   => 'APP',
            self::POS          => 'POS',
            self::SOCIAL       => 'SOC',
            self::MANUAL       => 'MAN',
            self::MARKETPLACE  => 'MP',
            self::SUBSCRIPTION => 'SUB',
            self::API          => 'API',
        };
    }

}
