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
    public function handleVerifiedIdentifier(string $identifier, string $type)
    {
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

            return $user;
        }

        return null; 
    }

    public function registerNewCustomer(array $data, string $identifier, string $type)
    {
        return DB::transaction(function () use ($data, $identifier, $type) {
            $verifiedAtColumn = "{$type}_verified_at";

            // 1. Create User
            $user = User::create([
                'name' => $data['name'],
                $type  => $identifier,
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