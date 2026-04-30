// Pages/Auth/RegisterCustomerDiscovered.tsx
import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import SmartBadge from "@/Components/UI/SmartBadge";

const RegisterCustomerDiscovered: React.FC<{setPage:()=>void}> = (setPage) => {
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
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-10">
                    {/* Header Section */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            
                            <h2 className="text-3xl font-play md:text-4xl font-extrabold tracking-tight text-on-background">
                                Welcome to the Family
                            </h2>
                        </div>
                        <p className="text-on-surface-variant font-body">
                            New customer discovered! Enter your name to continue.
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Your Name"
                            type="text"
                            value={data.name}
                            error={errors.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Jane Ndiema"
                        />

                        <Button 
                            type="submit" 
                            size="lg" 
                            fullWidth 
                            disabled={processing || !data.name.trim()}
                        >
                            {processing ? (
                                "Creating Account..."
                            ) : (
                                <>
                                    Join the Community
                                    <span className="material-symbols-outlined ml-2">
                                        arrow_forward
                                    </span>
                                </>
                            )}
                        </Button>

                        <p className="text-center text-sm text-on-surface-variant pt-4">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary font-bold hover:underline ml-1"
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

export default RegisterCustomerDiscovered;