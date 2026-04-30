// Pages/Auth/RegisterOTP.tsx
import React, { useState, useRef, useEffect } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import SmartBadge from "@/Components/UI/SmartBadge";

const RegisterOTP: React.FC<{ phone?: string; email?: string }> = ({ phone, email }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
    
    const { post, processing, errors } = useForm({
        otp: "",
        identifier: phone || email || "",
    });

    useEffect(() => {
        // Auto-focus first input
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only digits
        
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Take only last digit
        setOtp(newOtp);

        // Auto-advance to next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all digits entered
        if (newOtp.every(digit => digit) && newOtp.join("").length === 4) {
            const otpValue = newOtp.join("");
            post("/register/verify-otp", {
                data: { otp: otpValue, identifier: phone || email },
            });
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
        
        // Focus last filled or next empty
        const nextEmpty = newOtp.findIndex(d => !d);
        if (nextEmpty !== -1) {
            inputRefs.current[nextEmpty]?.focus();
        }
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
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-12">
                    {/* Badge + Header Section */}
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            <SmartBadge
                                text="OTP"
                                type="seal"
                                variant="green"
                                size="md"
                                className="absolute -top-4 -right-4 z-10"
                            />
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                                <span className="material-symbols-outlined text-4xl text-white">
                                    pin
                                </span>
                            </div>
                        </div>
                        
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                Verify Code
                            </h2>
                            <p className="text-gray-600 font-medium">
                                We sent a 4-digit code to{" "}
                                <span className="font-bold text-gray-800">{maskedIdentifier}</span>
                            </p>
                        </div>
                    </div>

                    {/* OTP Input Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl shadow-green-100/50 p-8 space-y-6">
                            <div className="flex justify-center gap-3">
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
                                        className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                                        aria-label={`Digit ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {errors.otp && (
                                <p className="text-red-500 text-sm text-center animate-shake">
                                    {errors.otp}
                                </p>
                            )}

                            <Button 
                                type="submit" 
                                size="lg" 
                                fullWidth 
                                disabled={processing || otp.some(d => !d)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200 transform hover:scale-[1.02] transition-all duration-200"
                            >
                                {processing ? "Verifying..." : "Verify & Continue"}
                            </Button>
                        </div>

                        {/* Help Links */}
                        <div className="text-center space-y-3">
                            <p className="text-sm text-gray-500">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    className="text-green-600 font-bold hover:text-emerald-500 transition-colors"
                                    onClick={() => post("/register/resend-otp")}
                                >
                                    Resend
                                </button>
                            </p>
                            <Link
                                href="/register"
                                className="text-sm text-gray-400 hover:text-gray-600 transition-colors inline-block"
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