<?php

namespace App\Services;

use App\Mail\OTPMail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OTPService
{
    /**
     * Generate and store a 4-digit OTP.
     */
    public function generate(string $identifier)
    {
        // Check if user is clicking "Resend" too fast
        if (Cache::has('otp_cooldown_' . $identifier)) {
            return 'cooldown';
        }

        $otp = rand(1000, 9999);
        $expiry = 10; 

    
        Cache::put('otp_' . $identifier, $otp, now()->addMinutes($expiry));
        
        // Set a 60-second cooldown before they can generate a new one
        Cache::put('otp_cooldown_' . $identifier, true, now()->addSeconds(60));

        $this->sendSms($identifier, $otp, now()->addMinutes($expiry)->format('d M Y, h:i A'));

        return $otp;
    }

    /**
     * Regenerate a new OTP for the same identifier.
     */
    public function regenerate(string $identifier)
    {
        return $this->generate($identifier);
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
        
        // Using Mail as a placeholder for SMS as per your example
        Mail::to('kimanthidennis02@gmail.com')->send(new OTPMail($otp, $time));
    }
}