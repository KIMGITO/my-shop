import React from "react";
import { useForm, Link } from "@inertiajs/react"; // Use Link instead of <a> for SPA speed
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

export const RegisterForm: React.FC = () => {
    // 1. Use the useForm hook (it handles state, errors, and processing)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "", 

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 2. Submit using the 'post' method from the hook
        post("/register", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="w-full max-w-md space-y-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-play md:text-4xl font-extrabold tracking-tight text-on-background">
                    Begin Your Journey
                </h2>
                <p className="text-on-surface-variant font-body">
                    Join the community of artisanal milk enthusiasts.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        label="name"
                        value={data.name}
                        error={errors.name} 
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Jane Ndiema"
                    />
                    
                </div>

                <Input
                    label="Email Address"
                    type="email"
                    value={data.email}
                    error={errors.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="jane@example.com"
                />

                <Input
                    label="Password"
                    type="password"
                    value={data.password}
                    error={errors.password}
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="••••••••"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    value={data.password_confirmation}
                    error={errors.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    placeholder="••••••••"
                />

                {/* 4. Use 'processing' to disable the button while loading */}
                <Button type="submit" size="lg" fullWidth disabled={processing}>
                    {processing ? "Creating..." : "Create Account"}
                    <span className="material-symbols-outlined ml-2">
                        arrow_forward
                    </span>
                </Button>

                <p className="text-center text-sm text-on-surface-variant pt-4">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-primary font-bold hover:underline ml-1"
                    >
                        Log in here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
