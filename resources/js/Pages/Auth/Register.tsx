
import React from "react";
import { Head, Link } from "@inertiajs/react";
import LoginForm from "@/Components/Auth/LoginForm";
import GuestLayout from "@/Components/Layout/GuestLayout";
import SimpleFooter from "@/Components/Layout/SimpleFooter";
import RegisterForm from "@/Components/Auth/RegisterForm";
import SimpleHeader from "@/Components/Layout/SimpleHeader";

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Register({ status, canResetPassword }: LoginProps) {
    return (
        <GuestLayout>
            <Head title="Login - Kaykay's Dairy" />

            <div className="min-h-screen flex flex-col">
                <SimpleHeader/>
                <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden p-4">
                    {/* Left Side - Hero Section */}
                    <section className="hidden lg:flex lg:col-span-7 relative items-end p-20 pb-8 overflow-hidden ">
                        <div className="absolute inset-0 z-0 rounded-2xl">
                            <img
                                alt="Sunrise on a dairy farm"
                                className="w-full h-full object-cover  "
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0odJGOeT_ksY5K6cLHN5ZHIpoA1CRDKVAqOscR9MIY9bm6zt75mJDBamXXs9iCfD9TPtL_7f3egP7iE6tU9sQ54Bqo8RgO7a3BF_FMUwJXxFOtCKOmcfJviczF_hkD234akUC4aabRliTiztNQyQrS_pjyK6jWcMz6qqEXGRArlvgZ-T-8evZgmoO41ZhOltNcHpny9fdFpPedi2xzpLbKOA4eltOvnmG0zwB1i8E5QCPopS3O9AprcnB2W3ad4gG0hIY9IqWBfcI"
                            />
                            <div className="absolute inset-0 bg-linear-0  from-background  via-lime-600/20  to-transparent"></div>
                        </div>
                        <div className="relative z-10 space-y-6 max-w-xl">
                            <h1 className="font-headline text-6xl text-end  font-extrabold text-primary/60 tracking-tight leading-none">
                                Kaykay's
                            </h1>
                            <p className=" text-primary font-play italic text-4xl  font-bold leading-tight">
                                Pure, Artisanal & Delivered Fresh with First
                                Light.
                            </p>
                        </div>
                    </section>

                    {/* Right Side - Register Form */}
                    <section className="col-span-1 lg:col-span-5 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-surface">
                        <div className="w-full max-w-md space-y-10">
                            <div className="lg:hidden flex items-center justify-between mb-8">
                                <span className="font-headline text-2xl font-bold text-primary">
                                    Kaykay's
                                </span>
                                <a
                                    href="/login"
                                    className="text-sm font-label text-primary hover:underline"
                                >
                                    Log in
                                </a>
                            </div>
                            <RegisterForm />
                        </div>
                    </section>
                </main>

                <SimpleFooter />
            </div>
        </GuestLayout>
    );
}
