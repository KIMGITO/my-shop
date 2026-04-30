// Pages/Auth/RegisterName.tsx
import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import SmartBadge from "@/Components/UI/SmartBadge";

const RegisterName: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/register/complete", {
            onSuccess: () => {
                // Redirect to dashboard or welcome page
            },
        });
    };

    return (
        <>
            <Head title="Complete Registration" />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-12">
                    {/* Badge + Header Section */}
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            <SmartBadge
                                text="NEW\nUSER"
                                type="burst"
                                variant="amber"
                                size="lg"
                                className="absolute -top-6 -right-6 z-10"
                            />
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl shadow-amber-200 animate-pulse">
                                <span className="material-symbols-outlined text-5xl text-white">
                                    person_celebrate
                                </span>
                            </div>
                        </div>
                        
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
                                <span className="material-symbols-outlined text-amber-600 text-xl">
                                    stars
                                </span>
                                <span className="text-amber-700 font-semibold text-sm">
                                    New Customer Discovered!
                                </span>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                Welcome to the Family
                            </h2>
                            <p className="text-gray-600 font-medium max-w-sm mx-auto">
                                We're thrilled to have you! What should we call you?
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl shadow-amber-100/50 p-6 space-y-5">
                            <Input
                                label="Your Name"
                                type="text"
                                value={data.name}
                                error={errors.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Jane Ndiema"
                                autoFocus
                            />

                            {/* Quick Suggestions */}
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs text-gray-500 font-medium">Quick suggestions:</span>
                                {["Jane", "Mary", "Faith", "Grace"].map((name) => (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => setData("name", name)}
                                        className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors font-medium"
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>

                            <Button 
                                type="submit" 
                                size="lg" 
                                fullWidth 
                                disabled={processing || !data.name.trim()}
                                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-200 transform hover:scale-[1.02] transition-all duration-200"
                            >
                                <span className="flex items-center">
                                    {processing ? "Creating Account..." : "Join the Community"}
                                    <span className="material-symbols-outlined ml-2">
                                        celebration
                                    </span>
                                </span>
                            </Button>
                        </div>

                        {/* Benefits */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                            <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">card_giftcard</span>
                                What you'll get:
                            </p>
                            <ul className="space-y-1 text-xs text-amber-700">
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Exclusive first-order discount
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Weekly artisanal milk selections
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Free delivery on your first week
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterName;