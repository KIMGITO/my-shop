<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Traits\HasRoles;
#[Fillable(['name', 'email', 'password', 'phone', 'address', 'avatar', 'role_tag'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function clearPermissionCache()
    {
        Cache::forget("user_{$this->id}_perms");
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }

    public function scopeIsStaff($query)
    {
        return $query->whereHas('roles', function ($q) {
            $q->whereIn('name', ['admin', 'cashier', 'rider', 'manager']);
        });
    }

    public function scopeIsCustomer($query)
    {
        return $query->role('customer');
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }
}
