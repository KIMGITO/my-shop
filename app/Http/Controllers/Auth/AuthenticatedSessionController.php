<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\IdentifierRequest;
use App\Models\Customer;
use App\Models\User;
use App\Services\AuthService;
use App\Services\OTPService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

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




    public function identify(IdentifierRequest $request)
    {


        try {
            $validated = $request->validated();
            $otp = $this->otpService->generate($validated['identifier']);

            if ($otp == 'cooldown') {
                return back()->with(['identifier' => 'OTP not sent, try again after 1 minute']);
            }

            // Store the identifier in session for verification
            session(['otp_identifier' => $validated['identifier'], 'otp_type' => $request->input('identifier_type', 'phone')]);
            return redirect()->to('/register/otp');

        }catch(Throwable $th){
            return back()->with(['identifier' => 'Failed to get OTP,  please try again.']);
        }   
    }

    public function verify(Request $request, AuthService $authService)
    {
        try{
            $validated = $request->validate([
                'otp' => ['required', 'numeric', 'digits:4'],
            ]);

            $identifier = session('otp_identifier');
            $type = session('otp_type');

            if (!$identifier) {
                return redirect()->route('register.identifier')->withErrors(['identifier' => 'Session expired.']);
            }

            if ($this->otpService->verify($identifier, $validated['otp'])) {
                session()->forget(['otp_identifier', 'otp_type']);

                // Use the service to find or create the user
                $user = $authService->handleVerifiedIdentifier($identifier, $type);

                if ($user) {
                    Auth::login($user);
                    $request->session()->regenerate();
                    return $this->redirectBasedOnRole($user);
                }

                // New customer flow
                session(['temp_identifier' => $identifier, 'temp_identifier_type' => $type]);
                return redirect()->to('register/identified');
            }

            return back()->withErrors(['otp' => 'Invalid OTP. Please try again.']);
        }catch(Throwable $th){
            return back()->withErrors(['otp' => 'Failed to verify OTP,  try again.']);
            
        }
    }

    public function registerNewCustomer(Request $request, AuthService $authService)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3'],
        ]);

        $identifier = session('temp_identifier');
        $type = session('temp_identifier_type');


        if (!$identifier || !$type) {
            return redirect()->route('login')->withErrors(['name' => 'Registration Session expired.']);
        }
        try{
            // Call the service
            $user = $authService->registerNewCustomer($validated, $identifier, $type);

            // Login and cleanup
            Auth::login($user);
            session()->forget(['temp_identifier', 'temp_identifier_type']);

            return redirect()->intended('/dashboard');
        }catch(Throwable $th){
            report($th);
            return redirect()->route('login')->withErrors(['name' => 'Registration could not complete, Please try again.']);
        }
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    // Helper method for role-based redirects
    private function redirectBasedOnRole(User $user)
    {
        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user->hasRole('cashier')) {
            return redirect()->intended(route('pos.index'));
        }

        if ($user->hasRole('rider')) {
            return redirect()->intended('/rider/tasks');
        }

        return redirect()->intended('/shop');
    }
}
