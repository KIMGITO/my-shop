<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\IdentifierRequest;
use App\Services\OTPService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function __construct(
        protected OTPService $otpService,
    ){}
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function identifier(): Response
    {
        return Inertia::render('Auth/Identifier');
    }

    public function otp(){
        return Inertia::render('Auth/Otp');
    }

    public function discoveredCustomer(){
        return Inertia::render('Auth/CustomerDiscovered');
    }

    public function identify(IdentifierRequest  $request){
       $validated =  $request->validated();

       $otp = $this->otpService->generate($validated['identifier']);

       if($otp == 'cooldown'){
            return back()->with(['error' => 'OTP not sent,  try again after 1 minute']);
       }
       
        return Inertia::render('Auth/Login');
    }

    public function verifyOtp(Request $request){
        dd('verify otp');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();

        // Smart Redirect Logic
        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user->hasRole('cashier')) {
            return redirect()->intended(route('pos.index'));
        }

        if ($user->hasRole('rider')) {
            return redirect()->intended('/rider/tasks');
        }

        // Default for Customers
        return redirect()->intended('/shop');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
