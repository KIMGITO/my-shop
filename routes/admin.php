

<?php 



    // ============================================================================
    // Admin Routes (Backend Management)
    // ============================================================================

use App\Http\Controllers\BatchController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

    Route::prefix('admin')->name('admin.')->group(function () {

        // Admin Dashboard
        Route::get('/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('dashboard');

        // Inventory Management
        Route::prefix('inventory')->name('inventory.')->group(function () {
            // products
            Route::prefix('products')->name('products.')->group(function () {
                Route::get('/', [ProductController::class,  'index'])->name('index');
                Route::get('/create', [ProductController::class, 'method'])->name('create');
                Route::post('/', [ProductController::class, 'store'])->name('store');
                Route::put('/{product}', [ProductController::class, 'update'])->name('update');
                Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
            });
            // bathes
            Route::prefix('batches')->name('batches.')->group(function () {
                Route::get('/', [BatchController::class, 'index'])->name('index');
                Route::get('/{id}', fn($id) => Inertia::render('Admin/BatchShow', ['id' => $id]))->name('show');
                Route::get('/{id}/edit', fn($id) => Inertia::render('Admin/BatchEdit', ['id' => $id]))->name('edit');
            });

            Route::get('/analytics', fn() => Inertia::render('Admin/InventoryAnalytics'))->name('analytics');
            Route::get('/intake', fn() => Inertia::render('Admin/StockIntake'))->name('intake');
            Route::get('/adjustment', fn() => Inertia::render('Admin/StockAdjustment'))->name('adjustment');
            Route::get('/history', fn() => Inertia::render('Admin/StockHistory'))->name('history');
        }); //END OF inventory


         //staff
         Route::get('/staff', [UserController::class, 'staffIndex'])->name('staff');


        // Sales Reports
        Route::get('/sales', fn() => Inertia::render('Admin/SalesReports'))->name('sales');

        // Staff Management

        // System Settings
        Route::get('/settings', fn() => Inertia::render('Admin/SystemSettings'))->name('settings');

        // Audit Logs
        Route::get('/audit-logs', fn() => Inertia::render('Admin/AuditLogs'))->name('audit-logs');
       

        // Supplier Management
        Route::prefix('suppliers')->name('suppliers.')->group(function () {
            Route::get('/', [SupplierController::class, 'index'])->name('index');
            Route::post('/',[SupplierController::class, 'store'])->name('store');
            Route::put('/{supplier}',[SupplierController::class, 'update'])->name('update');
            Route::delete('/{supplier}',  [SupplierController::class, 'destroy']) -> name('destroy');
            // Route::get('/orders', fn() => Inertia::render('Admin/SupplierOrders'))->name('orders');
            // Route::get('/create', fn() => Inertia::render('Admin/SupplierCreate'))->name('create');
            // Route::get('/{id}', fn($id) => Inertia::render('Admin/SupplierShow', ['id' => $id]))->name('show');
            // Route::get('/{id}/edit', fn($id) => Inertia::render('Admin/SupplierEdit', ['id' => $id]))->name('edit');
            // Route::get('/orders/create', fn() => Inertia::render('Admin/POCreate'))->name('po.create');
            // Route::get('/orders/{id}', fn($id) => Inertia::render('Admin/POShow', ['id' => $id]))->name('po.show');
        });

        // Feedbacks
        Route::get('/feedback', function () {
            return Inertia::render('Admin/FeedbackManagement');
        })->name('feedback');
    });
