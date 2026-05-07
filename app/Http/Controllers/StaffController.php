<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StaffRequest;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{
    public function index()
    {
        $priority = [
            'admin' => 1,
            'manager' => 2,
            'cashier' => 3,
            'rider' => 4,
        ];

        $roles = ['admin', 'manager', 'cashier', 'rider'];


        $rolePermissions = Cache::rememberForever('staff_roles_permissions', function () use ($roles) {
            return Role::whereIn('name', $roles)
                ->with('permissions:id,name')
                ->get()
                ->mapWithKeys(function ($role) {
                    return [
                        $role->name => $role->permissions->pluck('name')->toArray()
                    ];
                })
                ->toArray(); 
        });

    //    map
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
                    'phone' => $user->phone,
                    'email' => $user->email,
                    'roleType' => $primaryRole?->name ?? 'Staff',
                    'role' => $user->role_tag, // Custom attribute from your model
                    'avatar' => $user->avatar_url,
                ];
            });

        $allPermissions = Permission::pluck('name');

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

    public function store(StaffRequest $request){
        dd($request->validated());
    }
}
