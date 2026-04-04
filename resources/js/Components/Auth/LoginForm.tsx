// resources/js/Components/Auth/LoginForm.tsx
import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { FaApple, FaGoogle } from "react-icons/fa6";

interface LoginFormProps {
    canResetPassword?: boolean;
    status?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    canResetPassword,
    status,
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/login", data);
    };

    return (
        <div className="flex flex-col space-y-8">
            <div className="space-y-2">
                <h2 className=" text-4xl font-extrabold font-play text-on-surface tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-on-surface-variant font-medium">
                    Please enter your details to access your account.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    {status}
                </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                        error={errors.email}
                        placeholder="name@example.com"
                        icon="mail"
                    />

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                Password
                            </label>
                            {canResetPassword && (
                                <a
                                    href="/forgot-password"
                                    className="text-sm font-bold text-primary hover:opacity-80 transition-opacity"
                                >
                                    Forgot Password?
                                </a>
                            )}
                        </div>
                        <Input
                            icon="lock"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })
                            }
                            error={errors.password}
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <Button
                    disabled={processing}
                    onClick={handleSubmit}
                    size="md"
                    fullWidth
                >
                    Login
                </Button>
            </div>

            <div className="flex items-center gap-4 py-2">
                <div className="h-px grow bg-primary/50"></div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    or continue with
                </span>
                <div className="h-px grow bg-primary/50"></div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <Button
                    size="md"
                    variant="outline"
                    className="bg-primary/10 gap-2 p-2 hover:brightness-120 "
                >
                    <FaGoogle className="text-2xl" />
                    <span className="font-bold text-on-surface">Google</span>
                </Button>
                <Button
                    size="md"
                    variant="outline"
                    className="bg-primary/10 gap-2 p-2 hover:brightness-120"
                >
                    <FaApple className="text-3xl" />
                    <span className="font-bold text-on-surface">Apple</span>
                </Button>
            </div>

            <div className="text-center pt-4">
                <p className="text-on-surface-variant font-medium">
                    Don't have an account?
                    <a
                        href="/register"
                        className="text-primary font-bold hover:underline underline-offset-4 ml-1"
                    >
                        Create an account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
