<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

trait HasDatesScopes
{
    public function scopeToday(Builder $query, int $daysAgo = 0): Builder
    {
        return $query->whereDate(
            'created_at',
            now()->subDays($daysAgo)
        );
    }

 
    public function scopeThisWeek(Builder $query, int $weeksAgo = 0): Builder
    {
        $start = now()->subWeeks($weeksAgo)->startOfWeek();
        $end = now()->subWeeks($weeksAgo)->endOfWeek();

        return $query->whereBetween('created_at', [$start, $end]);
    }

  
    public function scopeThisMonth(Builder $query, int $monthsAgo = 0): Builder
    {
        $date = now()->subMonths($monthsAgo);

        return $query->whereMonth('created_at', $date->month)
            ->whereYear('created_at', $date->year);
    }

    public function scopeThisYear(Builder $query, int $yearsAgo = 0): Builder
    {
        return $query->whereYear('created_at', now()->subYears($yearsAgo)->year);
    }
}