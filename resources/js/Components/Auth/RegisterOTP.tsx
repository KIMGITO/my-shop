import React, { useState, useRef, useEffect } from "react";
import { useForm, Link, Head, router } from "@inertiajs/react"; // Added router
import Button from "@/Components/UI/Button";

type OtpForm = {
  otp: string;
  identifier: string;
};

const RegisterOTP: React.FC<{ phone?: string; email?: string }> = ({ phone, email }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

    
    // We initialize the form, but since your inputs are "uncontrolled" (using an array)
    // we will handle the submission manually to ensure the data is fresh.
    const { processing, errors, setError } = useForm<OtpForm>();

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

        // FIX: Use 'router.post' instead of 'useForm.post' for manual data mapping
        // OR use useForm's post but pass the data in an object if you don't use setData
        router.post("/register/otp", {
            otp: otpValue,
            identifier: phone || email,
        },{
            onError: (errors )=>{
                setError('otp',errors.otp);
            }
        });
    };

    const handleResend = () => {
        router.post("/register/resend-otp", {
            identifier: phone || email
        });
    };

    const maskedIdentifier = phone 
        ? `${phone.slice(0,2)}******${phone.slice(-2)}` 
        : email 
            ? email.replace(/(.{2}).*(@.*)/, "$1*********$2")
            : "";

    return (
        <>
            <Head title="Verify OTP" />
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-headline md:text-4xl font-extrabold tracking-tight text-on-surface">
                            Verify Code
                        </h2>
                        <p className="text-on-surface-variant font-body">
                            We sent a 4-digit code to{" "}
                            <span className="font-bold text-on-surface">{maskedIdentifier}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {inputRefs.current[index] = el}}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-16 h-16 text-center text-2xl font-bold border-2 border-outline rounded-xl bg-surface-container-low focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-200 text-on-surface"
                                />
                            ))}
                        </div>

                        {errors.otp && (
                            <p className="text-error text-sm text-center animate-shake">
                                {errors.otp}
                            </p>
                        )}

                        <Button 
                            type="submit" 
                            className="btn-press editorial-gradient"
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
                                    className="text-primary font-bold hover:underline cursor-pointer"
                                    onClick={handleResend}
                                >
                                    Resend
                                </button>
                            </p>
                            <Link
                                href="/register"
                                className="text-sm text-on-surface-variant hover:text-primary transition-colors"
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