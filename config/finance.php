<?php 
    return [
    'tax' => [
        'vat' => env('VAT_PERCENT', 0)/100,
        'apply_vat' => env('APPLY_VAT', true),
    ],

    'discount' => [
        'default' => env('DEFAULT_DISCOUNT', 0),
        'max_allowed' => env('MAX_DISCOUNT', 50),
    ],

    'currency' => env('APP_CURRENCY', 'KES'),
];