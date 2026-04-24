<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ============================================================================
// Public Routes
// ============================================================================

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// ============================================================================
// Shop Routes
// ============================================================================

Route::prefix('shop')->name('shop.')->group(function () {
    Route::get('/', fn() => Inertia::render('Shop/Index'))->name('index');
    Route::get('/product/{id}', fn($id) => Inertia::render('Product/Show', ['id' => $id]))->name('show');
});

// ============================================================================
// Auth Routes (Public)
// ============================================================================

Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('/login', fn() => Inertia::render('Auth/Login', ['canResetPassword' => true]))->name('login');
    Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');
});


Route::get('/product/{id}', fn($id) => Inertia::render('Product/Show', ['id' => $id]))->name('product.show');

// ============================================================================
// Cart Routes
// ============================================================================
Route::middleware(['auth'])->group(function () {

    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', fn() => Inertia::render('Cart/Index'))->name('index');
        Route::post('/add', fn() => redirect()->back())->name('add');
        Route::post('/update', fn() => redirect()->back())->name('update');
        Route::post('/remove', fn() => redirect()->back())->name('remove');
    });

    Route::get('/cart', fn() => Inertia::render('Cart/Index'))->name('cart');

    // ============================================================================
    // Checkout Routes
    // ============================================================================

    Route::prefix('checkout')->name('checkout.')->group(function () {
        // Route::get('/', fn() => Inertia::render('Checkout/Index'))->name('index');
        Route::get('/confirmation', fn() => Inertia::render('Checkout/Confirmation'))->name('confirmation');
        Route::post('/process', fn() => redirect()->route('checkout.confirmation'))->name('process');
    });

    // ============================================================================
    // Wishlist Routes
    // ============================================================================

    Route::prefix('wishlist')->name('wishlist.')->group(function () {
        Route::get('/', fn() => Inertia::render('Wishlist/Index'))->name('index');
        Route::post('/toggle', fn() => redirect()->back())->name('toggle');
    });

    Route::get('/wishlist', fn() => Inertia::render('Wishlist/Index'))->name('wishlist');



    // ============================================================================
    // Customer Routes (Authenticated)
    // ============================================================================

    // Route::middleware(['auth', 'verified'])->group(function () {

    // Customer Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Customer/Dashboard'))->name('dashboard');

    // Customer Settings
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::prefix('address')->name('address.')->group(function () {
            Route::get('/', [AddressController::class, 'index'])->name('index');
            Route::get('/create', [AddressController::class, 'create'])->name('create');
            Route::post('/', [AddressController::class, 'store'])->name('store');
            Route::put('/{address}', [AddressController::class, 'update'])->name('update');
            Route::patch('/{address}/default', [AddressController::class, 'toggleDefault'])->name('set-default');
            Route::delete('/{address}', [AddressController::class, 'delete'])->name('destroy');
        });
        Route::get('/', fn() => Inertia::render('Settings/Customer/AccountSetting'))->name('account');


        Route::get('/notifications', fn() => Inertia::render('Settings/Notifications/Index'))->name('notifications');
    });

    // Profile Management
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
        Route::get('/security', [ProfileController::class, 'security'])->name('security');
    });

    // Billing
    Route::prefix('billing')->name('billing.')->group(function () {
        Route::get('/', fn() => Inertia::render('Billing/Index'))->name('index');
    });

    // Orders
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', fn() => Inertia::render('Orders/Index'))->name('index');
        Route::get('/history', fn() => Inertia::render('Orders/History'))->name('history');
        // Route::get('/{id}', fn($id) => Inertia::render('Orders/Show', ['id' => $id]))->name('show');
    });

    // Subscriptions
    Route::prefix('subscriptions')->name('subscriptions.')->group(function () {
        Route::get('/delivery', fn() => Inertia::render('Subscriptions/DeliverySubscription'))->name('index');
        Route::get('/{id}', fn($id) => Inertia::render('Subscriptions/Show', ['id' => $id]))->name('show');
    });

    // Loyalty
    Route::prefix('loyalty')->name('loyalty.')->group(function () {
        Route::get('/', fn() => Inertia::render('Loyalty/Index'))->name('index');
    });

    Route::get('/feedback', function () {
        return Inertia::render('Customer/Feedback');
    })->name('feedback');

    Route::post('/feedback', function () {
        return redirect()->back()->with('success', 'Feedback submitted successfully!');
    })->name('feedback.submit');
    // });

    // ============================================================================
    // Cashier Routes (POS System)
    // ============================================================================

    Route::prefix('cashier')->name('cashier.')->group(function () {
        Route::get('/', fn() => Inertia::render('Cashier/Dashboard'))->name('dashboard');
        Route::get('/checkout', fn() => Inertia::render('Cashier/Checkout'))->name('checkout');
        Route::get('/transactions', fn() => Inertia::render('Cashier/Transactions'))->name('transactions');
        Route::post('/transaction', fn() => redirect()->route('cashier.transactions'))->name('transaction.store');
    });

    Route::prefix('pos')->name('pos.')->group(function () {
        Route::get('/', [POSController::class, 'index'])->name('index');
        Route::get('/history', fn() => Inertia::render('Pos/History'))->name('history');
        Route::get('/dashboard', fn() => Inertia::render('Pos/Dashboard'))->name('dashboard');
        // POS orders
    });

    Route::prefix('orders')->name('orders.')->group(function () {
        Route::patch('/checkout', [OrderController::class, 'checkout'])->name('checkout');
        Route::patch('/{orderNumber}/unpark', [OrderController::class, 'unpark'])->name('unpark');
        Route::delete('/{orderNumber}/void', [OrderController::class, 'void'])->name('void');
        Route::patch('/park', [OrderController::class, 'parkOrder'])->name('park');
    });

    // ============================================================================
    // Dispatch Routes (Logistics & Delivery)
    // ============================================================================

    Route::prefix('dispatch')->name('dispatch.')->group(function () {
        Route::get('/', fn() => Inertia::render('Dispatch/Dashboard'))->name('dashboard');
        Route::get('/orders', fn() => Inertia::render('Dispatch/Orders'))->name('orders');
        Route::get('/assign', fn() => Inertia::render('Dispatch/AssignRider'))->name('assign');
        Route::get('/riders', fn() => Inertia::render('Dispatch/Riders'))->name('riders');
        Route::get('/track', fn() => Inertia::render('Dispatch/LiveTrack'))->name('track');
        Route::get('/history', fn() => Inertia::render('Dispatch/History'))->name('history');
        Route::get('/exceptions', fn() => Inertia::render('Dispatch/Exceptions'))->name('exceptions');
    });


    // ============================================================================
    // Static Pages / Information Routes
    // ============================================================================

    Route::prefix('info')->name('info.')->group(function () {
        Route::get('/help', fn() => Inertia::render('Info/Help'))->name('help');
        Route::get('/privacy', fn() => Inertia::render('Info/Privacy'))->name('privacy');
        Route::get('/terms', fn() => Inertia::render('Info/Terms'))->name('terms');
        Route::get('/contact', fn() => Inertia::render('Info/Contact'))->name('contact');
        Route::get('/shipping', fn() => Inertia::render('Info/Shipping'))->name('shipping');
        Route::get('/story', fn() => Inertia::render('Info/Story'))->name('story');
        Route::get('/farm', fn() => Inertia::render('Info/Farm'))->name('farm');
        Route::get('/sustainability', fn() => Inertia::render('Info/Sustainability'))->name('sustainability');
        Route::get('/wholesale', fn() => Inertia::render('Info/Wholesale'))->name('wholesale');
    });
});
// Alias for backward compatibility
Route::get('/help', fn() => Inertia::render('Info/Help'))->name('help');
Route::get('/privacy', fn() => Inertia::render('Info/Privacy'))->name('privacy');
Route::get('/terms', fn() => Inertia::render('Info/Terms'))->name('terms');
Route::get('/contact', fn() => Inertia::render('Info/Contact'))->name('contact');

// ============================================================================
// Voucher Routes
// ============================================================================

Route::prefix('voucher')->name('voucher.')->group(function () {
    Route::post('/apply', fn() => redirect()->back())->name('apply');
});

Route::post('/apply-voucher', fn() => redirect()->back())->name('voucher.apply');

// ============================================================================
// API-like Routes (AJAX endpoints)
// ============================================================================

Route::prefix('api')->name('api.')->group(function () {

    // Cart endpoints
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::post('/add', fn() => response()->json(['success' => true]))->name('add');
        Route::post('/update', fn() => response()->json(['success' => true]))->name('update');
        Route::post('/remove', fn() => response()->json(['success' => true]))->name('remove');
    });

    // Wishlist endpoints
    Route::prefix('wishlist')->name('wishlist.')->group(function () {
        Route::post('/toggle', fn() => response()->json(['success' => true]))->name('toggle');
    });

    // Checkout endpoints
    Route::prefix('checkout')->name('checkout.')->group(function () {
        Route::post('/process', fn() => response()->json(['success' => true]))->name('process');
    });
});


require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
