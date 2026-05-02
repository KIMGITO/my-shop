<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthService
{
    /**
     * Handle the logic for a verified identifier (email/phone)
     * Returns the user to be logged in, or null if registration is needed.
     */
   public function handleVerifiedIdentifier(string $identifier, string $type): ?User
{
    // 1. FIRST: Check if user exists directly
    $user = User::where($type, $identifier)->first();

    if ($user) {
        // Optional: mark as verified
        if (!$user->{"{$type}_verified_at"}) {
            $user->update([
                "{$type}_verified_at" => now(),
            ]);
        }

        return $user; // ✅ EXISTING USER LOGIN
    }

    // 2. THEN: Check customer
    $customer = Customer::where('phone', $identifier)
        ->orWhere('email', $identifier)
        ->first();

    if ($customer) {
        $user = $customer->user;

        if (!$user) {
            $user = User::create([
                'name' => $customer->name,
                $type  => $identifier,
                "{$type}_verified_at" => now(),
            ]);

            $customer->update(['user_id' => $user->id]);
        }

        return $user; // ✅ CUSTOMER → USER
    }

    // 3. NOT FOUND → new registration
    return null;
}

    public function registerNewCustomer(array $data, string $identifier, string $type)
    {
        return DB::transaction(function () use ($data, $identifier, $type) {
            $verifiedAtColumn = "{$type}_verified_at";


            // 1. Create User
            $user = User::create([
                'name' => $data['name'],
                'email'  =>($type == 'email')? $identifier: null,
                'phone'  => ($type == 'phone')? $identifier: null,
                $verifiedAtColumn => now(),
            ]);

            // 2. Create Customer Profile
            $user->customer()->create([
                'name'  => $data['name'],
                'phone' => ($type === 'phone') ? $identifier : null,
                'email' => ($type === 'email') ? $identifier : null,
            ]);

            return $user;
        });
    }
}