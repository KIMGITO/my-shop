import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineUserCircle } from "react-icons/hi2";
import { cn } from "@/Utils/helpers";
import Button from "@/Components/UI/Button";

interface PaymentTerminalProps {
    total: number;
    customerSelected: boolean;
    allowCredit?: boolean;
    onComplete: (data: any) => void;
    isProcessing?: boolean;
}

export default function PaymentTerminal({
    total,
    customerSelected,
    allowCredit = true,
    onComplete,
    isProcessing = false,
}: PaymentTerminalProps) {
    // We track amounts for each source
    const [cash, setCash] = useState<number>(0);
    const [mpesa, setMpesa] = useState<number>(0);
    const [useCredit, setUseCredit] = useState(false);

    const amountPaid = cash + mpesa;
    const balance = total - amountPaid;

    // Logic: If credit is toggled, remaining balance is moved to credit.
    // If not, we check if fully paid.
    const canComplete = useCredit
        ? customerSelected && balance > 0 // Credit requires customer and a debt
        : amountPaid >= total; // Standard checkout requires full payment

    const changeToGive = useMemo(() => {
        const raw = amountPaid - total;
        return raw > 0 ? Math.floor(raw / 5) * 5 : 0;
    }, [amountPaid, total]);

    const handleAction = () => {
        onComplete({
            cash,
            mpesa,
            credit: useCredit ? balance : 0,
            change: changeToGive,
        });
    };

    return (
        <div className="bg-surface-container-low rounded-[3rem] p-8 shadow-2xl border border-outline-variant/20 sticky top-8">
            <h2 className="text-2xl font-headline font-black mb-6 text-center text-on-surface">
                Payment
            </h2>

            {/* Split Payment Inputs */}
            <div className="space-y-4 mb-6">
                <PaymentInput
                    label="Cash Amount"
                    value={cash}
                    onChange={setCash}
                    placeholder="Enter Cash"
                />
                <PaymentInput
                    label="M-Pesa Amount"
                    value={mpesa}
                    onChange={setMpesa}
                    placeholder="Enter M-Pesa"
                />
            </div>

            {/* Credit Toggle Section */}
            {allowCredit && (
                <div
                    className={cn(
                        "p-4 rounded-2xl mb-6 transition-all border",
                        useCredit
                            ? "bg-primary/5 border-primary/20"
                            : "bg-surface-container-highest border-transparent"
                    )}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="credit-toggle"
                                checked={useCredit}
                                onChange={(e) => setUseCredit(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                                htmlFor="credit-toggle"
                                className="font-bold text-sm cursor-pointer select-none"
                            >
                                Pay remaining via Credit
                            </label>
                        </div>
                        {useCredit && balance > 0 && (
                            <span className="font-black text-primary">
                                KES {balance.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {!customerSelected && useCredit && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 flex items-center gap-2 text-error text-[10px] font-bold uppercase tracking-wider"
                        >
                            <HiOutlineUserCircle className="text-lg" />
                            Select a customer to enable credit
                        </motion.div>
                    )}
                </div>
            )}

            {/* Dynamic Summary */}
            <div className="space-y-3 bg-white/40 backdrop-blur-md rounded-[2rem] p-6 mb-8 border border-white/20">
                <div className="flex justify-between text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    <span>Grand Total</span>
                    <span>KES {total.toFixed(2)}</span>
                </div>

                {changeToGive > 0 && !useCredit && (
                    <div className="flex justify-between items-center text-secondary pt-2 border-t border-outline-variant/10">
                        <span className="text-xs font-bold uppercase">
                            Change (Round 5)
                        </span>
                        <span className="text-xl font-black text-secondary">
                            KES {changeToGive.toFixed(2)}
                        </span>
                    </div>
                )}
            </div>

            <Button
                onClick={handleAction}
                disabled={!canComplete || isProcessing}
                className="w-full py-8 rounded-[2rem] text-xl font-black shadow-xl"
            >
                {isProcessing
                    ? "Processing..."
                    : canComplete
                    ? "Finalize Sale"
                    : `Remaining: KES ${balance.toFixed(2)}`}
                {canComplete && (
                    <HiOutlineCheckCircle className="ml-2 text-2xl" />
                )}
            </Button>
        </div>
    );
}

// Sub-component for the styled inputs
function PaymentInput({ label, value, onChange, placeholder }: any) {
    return (
        <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 ml-4">
                {label}
            </label>
            <input
                type="number"
                value={value || ""}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                className="w-full bg-surface-container-lowest border-none rounded-[1.5rem] py-4 px-6 text-2xl font-headline font-black text-center focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}
