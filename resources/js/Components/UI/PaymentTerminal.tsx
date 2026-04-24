// resources/js/Pages/POS/PaymentTerminal.tsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineCreditCard,
    HiOutlineBanknotes,
    HiOutlineDevicePhoneMobile,
    HiOutlineArrowsRightLeft,
    HiOutlineArrowLeft,
    HiOutlinePhone,
    HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { cn } from "@/Utils/helpers";
import Button from "@/Components/UI/Button";

type PaymentMethod = "mpesa" | "cash" | "credit" | "split";

interface PaymentTerminalProps {
    total: number;
    customer?: { id: number; name: string; phone?: string };
    onBack?: () => void;
    onComplete: (data: any) => void;
    allowedPaymentMethods?: PaymentMethod[];
}

// Helper function to round to whole number
const roundToWholeNumber = (amount: number): number => {
    return Math.ceil(amount);
};

// Helper function to round cash to nearest 5
const roundToNearest5 = (amount: number): number => {
    return Math.ceil(amount / 5) * 5;
};

export default function PaymentTerminal({
    total,
    customer,
    onBack,
    onComplete,
    allowedPaymentMethods = ["mpesa", "cash", "credit", "split"],
}: PaymentTerminalProps) {
    // FIRST: Round the incoming total to a whole number
    const roundedTotal = useMemo(() => roundToWholeNumber(total), [total]);
    
    const [activeTab, setActiveTab] = useState<PaymentMethod>(allowedPaymentMethods[0] || "mpesa");
    const [cashAmount, setCashAmount] = useState<number>(0);
    const [mpesaAmount, setMpesaAmount] = useState<number>(0);
    const [creditAmount, setCreditAmount] = useState<number>(0);
    
    // Track original cash input before rounding
    const [rawCashInput, setRawCashInput] = useState<number>(0);
    
    // STK Push States
    const [showStkOption, setShowStkOption] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(customer?.phone || "");

    // 1. Logic for visible tabs
    const visibleTabs = useMemo(() => {
        const icons = { mpesa: HiOutlineDevicePhoneMobile, cash: HiOutlineBanknotes, split: HiOutlineArrowsRightLeft, credit: HiOutlineCreditCard };
        const labels = { mpesa: "M-Pesa", cash: "Cash", split: "Split", credit: "Credit" };
        return allowedPaymentMethods.map(m => ({ method: m, label: labels[m], Icon: icons[m] }));
    }, [allowedPaymentMethods]);

    // Handle Tab Changes & Auto-fills using the rounded total
    useEffect(() => {
        if (activeTab === "mpesa") {
            setMpesaAmount(roundedTotal);
            setCashAmount(0);
            setRawCashInput(0);
            setCreditAmount(0);
        } else if (activeTab === "cash") {
            const roundedCashTotal = roundToNearest5(roundedTotal);
            setCashAmount(roundedCashTotal);
            setRawCashInput(roundedTotal);
            setMpesaAmount(0);
            setCreditAmount(0);
        } else if (activeTab === "credit") {
            setCreditAmount(roundedTotal);
            setMpesaAmount(0);
            setCashAmount(0);
            setRawCashInput(0);
        }
    }, [activeTab, roundedTotal]);

    // Calculate paid total using whole numbers (no decimals)
    const paidTotal = React.useMemo(() => {
        const cash = typeof cashAmount === 'number' ? cashAmount : 0;
        const mpesa = typeof mpesaAmount === 'number' ? mpesaAmount : 0;
        const credit = typeof creditAmount === 'number' ? creditAmount : 0;
        return cash + mpesa + credit;
    }, [cashAmount, mpesaAmount, creditAmount]);

    // Calculate remaining and change based on rounded total
    const remaining = Math.max(0, roundedTotal - paidTotal);
    const changeGiven = paidTotal > roundedTotal ? paidTotal - roundedTotal : 0;

    const canComplete = paidTotal >= roundedTotal && roundedTotal > 0 && (activeTab === "credit" ? !!customer?.id : true);

    // Handle cash amount change with rounding
    const handleCashChange = (value: number) => {
        setRawCashInput(value);
        const roundedValue = roundToNearest5(value);
        setCashAmount(roundedValue);
    };

    // Handle M-Pesa change (whole numbers only, no decimals)
    const handleMpesaChange = (value: number) => {
        setMpesaAmount(value);
    };

    // Handle credit change (whole numbers only)
    const handleCreditChange = (value: number) => {
        setCreditAmount(value);
    };

    // Handle completion with proper data
    const handleComplete = () => {
        onComplete({ 
            originalTotal: total,
            roundedTotal: roundedTotal,
            cashAmount: cashAmount,
            mpesaAmount: mpesaAmount, 
            creditAmount: creditAmount, 
            changeGiven: changeGiven,
            totalPaid: paidTotal,
            phoneNumber,
            // Include rounding info for reporting
            totalRounded: roundedTotal !== total,
            cashRounded: cashAmount !== rawCashInput,
            originalCashInput: rawCashInput,
            roundingOverpayment: cashAmount - rawCashInput
        });
    };

    return (
        <div className="h-full bg-surface-container-lowest flex flex-col border-l border-outline-variant/10 shadow-xl">
            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/10">
                {onBack && (
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container-highest">
                        <HiOutlineArrowLeft className="text-xl text-on-surface" />
                    </button>
                )}
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-on-surface-variant leading-none mb-1">Total Payable</p>
                    <h1 className="text-xl font-black text-primary leading-none">
                        KES {roundedTotal.toLocaleString()}
                    </h1>
                    {roundedTotal !== total && (
                        <p className="text-[8px] text-on-surface-variant/60 mt-1">
                            (Rounded from {total.toLocaleString()})
                        </p>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Payment Tabs */}
                <section className="grid grid-cols-2 gap-2">
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab.method}
                            onClick={() => setActiveTab(tab.method as any)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all",
                                activeTab === tab.method 
                                    ? "bg-primary border-primary text-on-primary shadow-md" 
                                    : "bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:border-primary/40"
                            )}
                        >
                            <tab.Icon className="text-lg shrink-0" />
                            <span className="text-[11px] font-bold uppercase tracking-tight">{tab.label}</span>
                        </button>
                    ))}
                </section>

                {/* Amount Inputs Area */}
                <section className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                            {activeTab === "split" ? (
                                <div className="space-y-3">
                                    <PaymentInput 
                                        label="Cash (rounded to nearest 5)" 
                                        value={rawCashInput} 
                                        onChange={handleCashChange}
                                        maximum={roundedTotal}
                                        remaining={roundedTotal - (mpesaAmount + creditAmount)}
                                        rounding="nearest5"
                                        actualValue={cashAmount}
                                    />
                                    <PaymentInput 
                                        label="M-Pesa" 
                                        value={mpesaAmount} 
                                        onChange={handleMpesaChange}
                                        maximum={roundedTotal - cashAmount}
                                        remaining={roundedTotal - cashAmount}
                                    />
                                    {allowedPaymentMethods.includes("credit") && (
                                        <PaymentInput 
                                            label="Credit" 
                                            value={creditAmount} 
                                            onChange={handleCreditChange}
                                            maximum={roundedTotal - (cashAmount + mpesaAmount)}
                                            remaining={roundedTotal - (cashAmount + mpesaAmount)}
                                        />
                                    )}
                                </div>
                            ) : activeTab === "cash" ? (
                                <PaymentInput
                                    label="CASH AMOUNT (Rounded to nearest 5)"
                                    value={rawCashInput}
                                    onChange={handleCashChange}
                                    maximum={100000}
                                    rounding="nearest5"
                                    actualValue={cashAmount}
                                />
                            ) : activeTab === "mpesa" ? (
                                <PaymentInput
                                    label="M-PESA AMOUNT"
                                    value={mpesaAmount}
                                    onChange={handleMpesaChange}
                                    maximum={roundedTotal}
                                />
                            ) : (
                                <PaymentInput
                                    label="CREDIT AMOUNT"
                                    value={creditAmount}
                                    onChange={handleCreditChange}
                                    maximum={roundedTotal}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Total rounding warning */}
                    {/* {roundedTotal !== total && (
                        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                            <p className="text-blue-700 dark:text-blue-400 text-xs font-bold">
                                🔄 Total rounded to nearest KES: {roundedTotal.toLocaleString()}
                            </p>
                        </div>
                    )} */}

                    {/* Cash rounding warning */}
                    {/* {(activeTab === "cash" || (activeTab === "split" && rawCashInput > 0)) && 
                     cashAmount !== rawCashInput && rawCashInput > 0 && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                            <p className="text-amber-700 dark:text-amber-400 text-xs font-bold">
                                💰 Cash amount rounded up from KES {rawCashInput} to KES {cashAmount} (nearest 5)
                                {cashAmount > rawCashInput && ` • Extra KES ${cashAmount - rawCashInput} will be given as change`}
                            </p>
                        </div>
                    )} */}

                    {/* M-Pesa STK Push Section */}
                    {(activeTab === "mpesa" || (activeTab === "split" && mpesaAmount > 0)) && (
                        <div className="pt-2">
                            <button 
                                onClick={() => setShowStkOption(!showStkOption)}
                                className={cn(
                                    "w-full py-2 px-4 rounded-xl border flex items-center justify-between transition-all",
                                    showStkOption ? "bg-primary/10 border-primary text-primary" : "bg-surface-container border-outline-variant/30 text-on-surface-variant"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <HiOutlineDevicePhoneMobile className="text-lg" />
                                    <span className="text-xs font-bold uppercase">Use STK Push</span>
                                </div>
                                <span className="material-symbols-outlined text-sm">{showStkOption ? 'expand_less' : 'expand_more'}</span>
                            </button>

                            <AnimatePresence>
                                {showStkOption && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="mt-3 p-4 bg-surface-container-high rounded-2xl border border-outline-variant/20 space-y-3">
                                            <div className="relative">
                                                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                                    placeholder="0712345678"
                                                    className="w-full bg-surface-container-lowest border-none rounded-xl py-3 pl-12 text-lg font-black focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>
                                            <Button 
                                                variant="secondary" 
                                                className="w-full py-3 flex items-center justify-center gap-2"
                                                disabled={phoneNumber.length < 10 || mpesaAmount <= 0}
                                                onClick={() => {
                                                    console.log("STK Push to:", phoneNumber, "Amount:", mpesaAmount);
                                                }}
                                            >
                                                <HiOutlinePaperAirplane className="rotate-[-45deg]" />
                                                Send STK Push
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </section>
            </div>

            {/* Footer Summary & Action */}
            <div className="p-4 bg-surface-container border-t border-outline-variant/20 space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant">Total Paid</span>
                        <span className="text-sm font-black">KES {paidTotal.toLocaleString()}</span>
                    </div>
                    
                    {/* Show breakdown when cash is rounded */}
                    {cashAmount !== rawCashInput && rawCashInput > 0 && (
                        <div className="flex justify-between items-center text-xs text-on-surface-variant">
                            <span>Cash collected (rounded)</span>
                            <span>KES {cashAmount.toLocaleString()}</span>
                        </div>
                    )}
                    
                    {changeGiven > 0 && (
                        <div className="flex justify-between items-center text-secondary font-black">
                            <span className="text-[10px] uppercase">Change Due</span>
                            <span>KES {changeGiven.toLocaleString()}</span>
                        </div>
                    )}
                    {remaining > 0 && (
                        <div className="flex justify-between items-center text-error font-black">
                            <span className="text-[10px] uppercase">Remaining Balance</span>
                            <span>KES {remaining.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <Button
                    className="w-full py-4 rounded-2xl text-lg font-black shadow-lg"
                    disabled={!canComplete}
                    onClick={handleComplete}
                >
                    {remaining > 0 ? `Pay Remaining KES ${remaining.toLocaleString()}` : "Complete Sale"}
                </Button>
            </div>
        </div>
    );
}

// Input Helper with whole number support
function PaymentInput({ 
    label, 
    value, 
    onChange, 
    maximum = 100000,
    remaining,
    rounding,
    actualValue
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    maximum?: number;
    remaining?: number;
    rounding?: "nearest5";
    actualValue?: number;
}) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        
        // Handle empty string
        if (val === "") {
            onChange(0);
            return;
        }

        // Allow only whole numbers (no decimals)
        if (/^\d+$/.test(val)) {
            let numericValue = parseInt(val, 10);
            
            // Handle NaN
            if (isNaN(numericValue)) {
                onChange(0);
                return;
            }

            // Apply maximum constraint
            const effectiveMax = remaining !== undefined ? Math.min(maximum, remaining) : maximum;
            if (numericValue > effectiveMax) {
                onChange(effectiveMax);
                return;
            }

            onChange(numericValue);
        }
    };

    // Format display value
    const displayValue = value === 0 ? "" : value.toString();
    const effectiveMax = remaining !== undefined ? Math.min(maximum, remaining) : maximum;

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-tight">
                    {label}
                </label>
                <span className="text-[8px] text-on-surface-variant/40 font-bold uppercase">
                    Max: {effectiveMax.toLocaleString()}
                </span>
            </div>
            <div className="relative">
                <input
                    type="text" 
                    inputMode="numeric"
                    value={displayValue}
                    onChange={handleTextChange}
                    onFocus={(e) => e.target.select()}
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 text-center text-xl font-black text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/30"
                    placeholder="0"
                />
            </div>
        </div>
    );
}