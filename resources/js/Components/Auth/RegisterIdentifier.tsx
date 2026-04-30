// Pages/Auth/RegisterIdentifier.tsx
import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import SmartBadge from "@/Components/UI/SmartBadge";

const RegisterIdentifier: React.FC = () => {
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
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-12">
                    {/* Badge + Header Section */}
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            <SmartBadge
                                text="NEW"
                                type="ribbon"
                                variant="purple"
                                size="lg"
                                className="absolute -top-3 -right-3 z-10"
                            />
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
                                <span className="material-symbols-outlined text-4xl text-white">
                                    nest_eco_leaf
                                </span>
                            </div>
                        </div>
                        
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                                Start Your Journey
                            </h2>
                            <p className="text-gray-600 font-medium max-w-sm">
                                Enter your phone number or email to discover the finest artisanal milk.
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-6 space-y-5">
                            <Input
                                label="Phone or Email"
                                type="text"
                                value={data.identifier}
                                error={errors.identifier}
                                onChange={(e) => setData("identifier", e.target.value)}
                                placeholder="07XXXXXXXX or jane@email.com"
                                autoFocus
                            />

                            <Button 
                                type="submit" 
                                size="lg" 
                                fullWidth 
                                disabled={processing}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-200 transform hover:scale-[1.02] transition-all duration-200"
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending code...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        Continue
                                        <span className="material-symbols-outlined ml-2">
                                            arrow_forward
                                        </span>
                                    </span>
                                )}
                            </Button>
                        </div>

                        {/* Benefits Showcase */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: "bolt", text: "Fast", color: "amber" },
                                { icon: "verified_user", text: "Secure", color: "green" },
                                { icon: "local_shipping", text: "Delivery", color: "blue" },
                            ].map((benefit) => (
                                <div key={benefit.text} className="text-center space-y-1">
                                    <div className={`w-10 h-10 mx-auto bg-${benefit.color}-100 rounded-xl flex items-center justify-center`}>
                                        <span className={`material-symbols-outlined text-${benefit.color}-600 text-xl`}>
                                            {benefit.icon}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600">{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-sm text-gray-500 pt-2">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-purple-600 font-bold hover:text-pink-500 transition-colors"
                            >
                                Log in here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterIdentifier;