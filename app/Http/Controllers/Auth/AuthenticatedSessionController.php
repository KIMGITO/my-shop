<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\IdentifierRequest;
use App\Models\User;
use App\Services\OTPService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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




    public function identify(IdentifierRequest $request)
    {
        $validated = $request->validated();

        $otp = $this->otpService->generate($validated['identifier']);

        if ($otp == 'cooldown') {
            return back()->with(['error' => 'OTP not sent, try again after 1 minute']);
        }

        // Store the identifier in session for verification
        session(['otp_identifier' => $validated['identifier'], 'otp_type' => $request->input('type', 'phone')]);

        return redirect()->to('/register/otp');
    }

    public function verify(Request $request)
    {
        
        $validated = $request->validate([
            'otp' => ['required', 'numeric', 'digits:4'], // Assuming 6-digit OTP
        ]);

        // Get identifier from session
        $identifier = session('otp_identifier');
        $identifierType = session('otp_type');

        if (!$identifier) {
            return redirect()->route('register.identifier')->withErrors(['identifier' => 'Session expired. Please try again.']);
        }

        // Verify the OTP
        $verified = $this->otpService->verify($identifier, $validated['otp']);

        if ($verified) {
            // Clear session data
            session()->forget(['otp_identifier', 'otp_type']);

            // Check if user exists
            $user = \App\Models\User::where('email', $identifier)
                ->orWhere('phone', $identifier)
                ->first();

            if ($user) {
                // Login existing user
                Auth::login($user);
                $request->session()->regenerate();

                // Redirect based on role
                return $this->redirectBasedOnRole($user);
            } else {
                // new customer
                // New user - store in session and redirect to registration
                session(['temp_identifier' => $identifier, 'temp_identifier_type' => $identifierType]);
                return redirect()->to('register/identified');
            }
        }

        return back()->withErrors(['otp' => 'Invalid OTP. Please try again.']);
    }

    public function registerNewCustomer(Request $request){

    DB::transaction(function () use($request) {

            $validated = $request->validate([
                'name'=> ['required','string','min:3'],
            ]);


            // register user and customer
            $verifiedAtColumn = session('temp_identifier_type') . '_verified_at';
            $identifierType = session('temp_identifier_type');
            $identifier = session('temp_identifier');
            $user = User::create([
                'name'=> $validated['name'],
                $identifierType => $identifier,
                $verifiedAtColumn => now(),
            ]);

            $user->customer()->create([
                'name' => $validated['name'],
                'phone' => $identifierType == 'phone' ? $identifier :  null,
            ]);
        return $user;
    });

    }

    // Helper method for role-based redirects
    private function redirectBasedOnRole($user)
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
