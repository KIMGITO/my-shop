<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function staffIndex()
    {
        $priority = [
            'admin' => 1,
            'manager' => 2,
            'cashier' => 3,
            'rider' => 4,
        ];

        $roles = ['admin', 'manager', 'cashier', 'rider'];

        /**
         * FIX: We convert the collection to an array BEFORE caching.
         * This prevents the __PHP_Incomplete_Class error caused by 
         * unserializing Spatie models before they are fully booted.
         */
        $rolePermissions = Cache::rememberForever('staff_roles_permissions', function () use ($roles) {
            return Role::whereIn('name', $roles)
                ->with('permissions:id,name')
                ->get()
                ->mapWithKeys(function ($role) {
                    return [
                        $role->name => $role->permissions->pluck('name')->toArray()
                    ];
                })
                ->toArray(); // Ensure we store a primitive array
        });

        /**
         * PERFORMANCE: Map the staff data to a plain array. 
         * This prevents sending hidden fields (like password_hash) to the frontend
         * and ensures the React component receives exactly what it needs.
         */
        $staff = User::isStaff()
            ->with('roles:id,name')
            ->get()
            ->map(function ($user) use ($priority) {
                // Determine the primary role based on defined priority
                $primaryRole = $user->roles
                    ->sortBy(fn($r) => $priority[$r->name] ?? 999)
                    ->first();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roleType' => $primaryRole?->name ?? 'Staff',
                    'role' => $user->role_tag, // Custom attribute from your model
                    'avatar' => $user->avatar_url,
                ];
            });

        $allPermissions = Permission::pluck('name');

        // Build the matrix for the React Permissions table
        $roleMatrix = $allPermissions->map(function ($permission) use ($roles, $rolePermissions) {
            $row = ['feature' => $permission];

            foreach ($roles as $role) {
                $row[$role] = in_array($permission, $rolePermissions[$role] ?? []);
            }

            return $row;
        });

        return Inertia::render('Admin/StaffManagement', [
            'staffMembers' => $staff,
            'roleMatrix' => $roleMatrix,
            'roles' => $roles,
        ]);
    }
}
