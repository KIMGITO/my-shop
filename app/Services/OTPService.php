<?php

namespace App\Services;

use App\Mail\OTPMail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OTPService
{
    /**
     * Generate and store a 4-digit OTP for 10 minutes.
     */
    public function generate($identifier)
    {
        if (Cache::has('otp_cooldown_' . $identifier)) {
            return 'cooldown';
        }

        $otp = rand(1000, 9999);

        // Store OTP for 10 minutes
        $time = now()->addMinutes(10);
        Cache::put('otp_' . $identifier, $otp, );
        
        Cache::put('otp_cooldown_' . $identifier, true, now()->addSeconds(60));

        $this->sendSms($identifier, $otp, $time->format('d M Y, h:i A'));

        return $otp;
    }

    public function verify(string $identifier, string $code): bool
    {
        $cacheKey = 'otp_' . $identifier;
        $storedOtp = Cache::get($cacheKey);

        if ($storedOtp && (int)$storedOtp === (int)$code) {
            Cache::forget($cacheKey);
            Cache::forget('otp_cooldown_' . $identifier);
            return true;
        }

        return false;
    }

    private function sendSms(string $phone, string $otp, string $time)
    {
        Log::info("OTP for $phone: $otp"); 
        
        // Example: Http::post(...)
        Mail::to('kimanthidennis02@gmail.com')->send(new OTPMail($otp, $time));
    }
}