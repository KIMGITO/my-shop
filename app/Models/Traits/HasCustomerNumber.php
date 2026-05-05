<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 * @method static Builder where(string $column, mixed $value)
 */
trait HasCustomerNumber 
{
    /**
     * Boot the trait to generate a unique customer number on creation.
     */
    public static function bootHasCustomerNumber()
    {
        static::creating(function ($model) {
            // Only generate if the field is empty
            if (empty($model->customer_number)) {
                $model->customer_number = static::generateUniqueCustomerNumber();
            }
        });
    }

    /**
     * Generates a random number and ensures it's unique in the table.
     */
    protected static function generateUniqueCustomerNumber(): int
    {
        do {
            $number = random_int(10000, 99999);
        } while (static::where('customer_number', $number)->exists());

        return $number;
    }
}