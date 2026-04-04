// resources/js/Pages/Auth/Login.tsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import LoginForm from "@/Components/Auth/LoginForm";
import GuestLayout from "@/Components/Layout/GuestLayout";
import SimpleFooter from "@/Components/Layout/SimpleFooter";
import SimpleHeader from "@/Components/Layout/SimpleHeader";

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <GuestLayout>
            <Head title="Login - Kaykay's Dairy" />

            <div className="min-h-screen flex flex-col">
              <SimpleHeader/>
                <main className="grow flex items-center justify-center pt-24 pb-12 px-6">
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Hero Image */}
                        <div className="hidden md:block relative h-175 rounded-xl overflow-hidden shadow-2xl">
                            <img
                                alt="Artisan milk bottles"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATFG0OE5zyZd-LzAHqewYMaTdg_Q5prWNMw7ylQ_AqfEuDe907VecjJp3lU3i59a7bsEdlDzd93tG4kBTyLqH2ofFiQuZpINFhBl3FHwfwu3ECcwJCJ_5n5_-JHONuuMEdD4qMMolUQhs9Ym6VewAtD8kCUmZuMa1uAI4aN_jw3HKtLaCAdR4tpL5DwXeKhMerA2VtRGf8LtSL-0y9cvGJ96EQzdLjWgaF3-ffv6kEye8izvaoCAVU7LukdCII-V9jU2drZQoov0Qf"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20  to-transparent flex flex-col justify-end p-12 pb-4">
                                <h1 className="font-headline text-5xl font-extrabold text-primary/50 tracking-tight mb-4">
                                    Pure Fresh & Daily.
                                </h1>
                                <p className="text-primary italic font-play text-lg max-w-md font-medium leading-relaxed">
                                    Join the family and get the finest dairy
                                    products delivered to your doorstep.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <LoginForm
                            status={status}
                            canResetPassword={canResetPassword}
                        />
                    </div>
                </main>
                <SimpleFooter />
            </div>
        </GuestLayout>
    );
}
