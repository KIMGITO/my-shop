<?php 
namespace App\Services;

use App\Enums\TransactionType;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class TransactionNamingService
{
    public function generate(string $table, string $column, TransactionType $type): string
    {
        // 1. Year (2026 = A, 2027 = B...)
        $baseYear = 2026;
        $diff = max(0, (int)date('Y') - $baseYear);
        
        $yearStr = '';
        $n = $diff;
        do {
            $yearStr = chr(65 + ($n % 26)) . $yearStr;
            $n = floor($n / 26) - 1;
        } while ($n >= 0);

        // 2. Date Components
        $month = date('n') <= 9 ? date('n') : chr(55 + date('n'));
        $day = date('j') <= 9 ? date('j') : chr(55 + date('j'));
        
        // 3. Get Prefix from Enum
        $prefix = $type->prefix();
        
        // 4. Uniqueness Loop
        do {
            $random = strtoupper(Str::random(4));
            $id = "{$yearStr}{$month}{$day}{$prefix}{$random}";
            $exists = DB::table($table)->where($column, $id)->exists();
        } while ($exists);

        return strtoupper($id);
    }
}