// Pages/Auth/RegisterOTP.tsx
import React, { useState, useRef, useEffect } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import SmartBadge from "@/Components/UI/SmartBadge";

const RegisterOTP: React.FC<{ phone?: string; email?: string, setPage:()=>void }> = ({ phone, email, setPage }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
    
    const { post, processing, errors } = useForm({
        otp: "",
        identifier: phone || email || "",
    });

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4);
        if (!/^\d*$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, i) => {
            if (i < 4) newOtp[i] = char;
        });
        setOtp(newOtp);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 4) return;
        
        post("/register/verify-otp", {
            data: { otp: otpValue, identifier: phone || email },
        });
    };

    const maskedIdentifier = phone 
        ? `****${phone.slice(-4)}` 
        : email 
            ? email.replace(/(.{2}).*(@.*)/, "$1***$2")
            : "";

    return (
        <>
            <Head title="Verify OTP" />
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-10">
                    {/* Header Section */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          
                            <h2 className="text-3xl font-play md:text-4xl font-extrabold tracking-tight text-on-background">
                                Verify Code
                            </h2>
                        </div>
                        <p className="text-on-surface-variant font-body">
                            We sent a 4-digit code to{" "}
                            <span className="font-bold text-on-background">{maskedIdentifier}</span>
                        </p>
                    </div>

                    {/* OTP Input Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-16 h-16 text-center text-2xl font-bold border-2 border-outline rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-200 text-on-background"
                                    aria-label={`Digit ${index + 1}`}
                                />
                            ))}
                        </div>

                        {errors.otp && (
                            <p className="text-error text-sm text-center">
                                {errors.otp}
                            </p>
                        )}

                        <Button 
                            type="submit" 
                            size="lg" 
                            fullWidth 
                            disabled={processing || otp.some(d => !d)}
                        >
                            {processing ? "Verifying..." : "Verify & Continue"}
                        </Button>

                        <div className="text-center space-y-3 pt-4">
                            <p className="text-sm text-on-surface-variant">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    className="text-primary font-bold hover:underline"
                                    onClick={() => post("/register/resend-otp")}
                                >
                                    Resend
                                </button>
                            </p>
                            <Link
                                href="/register"
                                className="text-sm text-on-surface-variant hover:text-primary transition-colors inline-block"
                            >
                                ← Change phone/email
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterOTP;