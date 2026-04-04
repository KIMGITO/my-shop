<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // --- 1. Module Specific Permissions ---

        $productPermissions = [
            'view products',
            'create products',
            'edit products',
            'delete products',
            'manage inventory',
            'manage production', // Bakery: converting flour/milk to bread
        ];

        $orderPermissions = [
            'view orders',
            'create orders',
            'process orders',
            'cancel orders',
            'view order history',
        ];

        $checkoutPermissions = [
            'add to cart',
            'update cart',
            'remove from cart',
            'process checkout',
            'process payments',
        ];

        $deliveryPermissions = [
            'view deliveries',
            'accept delivery',
            'update delivery status',
            'view delivery history',
        ];

        $customerPermissions = [
            'view customers',
            'manage customer addresses',
            'view customer orders',
        ];

        $reportPermissions = [
            'view sales reports',
            'view inventory reports',
            'view delivery reports',
            'export reports',
        ];

        $systemPermissions = [
            'view settings',
            'edit settings',
            'manage staff',
            'view audit logs',
        ];

        $dashboardPermissions = [
            'view admin dashboard',
            'view cashier dashboard',
            'view rider dashboard',
            'view customer dashboard',
            'view manager dashboard',
        ];

        // Combine all
        $allPermissions = array_merge(
            $productPermissions,
            $orderPermissions,
            $checkoutPermissions,
            $deliveryPermissions,
            $customerPermissions,
            $reportPermissions,
            $systemPermissions,
            $dashboardPermissions
        );

        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // --- 2. Define Roles & Assignments ---

        // ADMIN: The Owner
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(Permission::all());

        // MANAGER: Runs the daily Bakery/Milk Bar operations
        $manager = Role::firstOrCreate(['name' => 'manager']);
        $manager->syncPermissions([
            'view manager dashboard',
            'view products',
            'create products',
            'edit products',
            'manage inventory',
            'manage production',
            'view orders',
            'process orders',
            'cancel orders',
            'view order history',
            'view customers',
            'view customer orders',
            'view sales reports',
            'view inventory reports',
            'export reports',
            'manage staff',
        ]);

        // CASHIER: Front-of-house POS
        $cashier = Role::firstOrCreate(['name' => 'cashier']);
        $cashier->syncPermissions([
            'view cashier dashboard',
            'add to cart',
            'update cart',
            'remove from cart',
            'process checkout',
            'process payments',
            'create orders',
            'view orders',
            'cancel orders', 
            'view products',
            'view customers',
        ]);

        // RIDER: Delivery
        $rider = Role::firstOrCreate(['name' => 'rider']);
        $rider->syncPermissions([
            'view rider dashboard',
            'view deliveries',
            'accept delivery',
            'update delivery status',
            'view delivery history',
            'view orders', // To check items in the package
        ]);

        // CUSTOMER: End user
        $customer = Role::firstOrCreate(['name' => 'customer']);
        $customer->syncPermissions([
            'view customer dashboard',
            'add to cart',
            'update cart',
            'remove from cart',
            'process checkout',
            'create orders',
            'cancel orders',
            'view order history',
            'view deliveries', // To track their own milk/bread
        ]);

        // --- 3. Create Default Users ---

        $this->createUser('Admin User', 'admin@kaykays.com', 'admin');
        $this->createUser('Manager User', 'manager@kaykays.com', 'manager');
        $this->createUser('Cashier User', 'cashier@kaykays.com', 'cashier');
    }

    private function createUser($name, $email, $role)
    {
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make('password'),
            ]
        );
        $user->assignRole($role);
    }
}
