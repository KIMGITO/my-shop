// Pages/Auth/RegisterIdentifier.tsx
import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import SmartBadge from "@/Components/UI/SmartBadge";
import { HiArrowRight } from "react-icons/hi";

const RegisterIdentifier = () => {
    const { data, setData, post, processing, errors } = useForm({
        identifier: "", // phone or email
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/register/send-otp", {
            onSuccess: () => {
                // Will redirect to OTP page via Inertia
            },
        });
    };

    return (
        <>
            <Head title="Create Account" />
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-10">
                    {/* Header Section */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">

                            <h2 className="text-3xl font-play md:text-4xl font-extrabold tracking-tight text-on-background">
                                Start Your Journey
                            </h2>
                        </div>
                        <p className="text-on-surface-variant font-body">
                            Enter your phone number or Email  to continue.
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Phone or Email"
                            type="text"
                            value={data.identifier}
                            error={errors.identifier}
                            onChange={(e) => setData("identifier", e.target.value)}
                            placeholder="0700112233 Or kim@test.com"
                        />

                        <Button 
                            type="submit" 
                            size="lg" 
                            fullWidth 
                            disabled={processing}
                        >
                            {processing ? (
                                "Sending code..."
                            ) : (
                                <div className="flex items-center gap-4">
                                    Continue
                                    <HiArrowRight/>
                                </div>
                            )}
                        </Button>

                         <div className="flex items-center gap-4 py-2">
                            <div className="h-px grow bg-primary/50"></div>
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                Or
                            </span>
                            <div className="h-px grow bg-primary/50"></div>
                        </div>
                        <Link
                            href="/login"
                            className="text-primary font-bold hover:underline ml-1 flex justify-center "
                        >
                            Log in with email here
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterIdentifier;