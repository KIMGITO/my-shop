// resources/js/Pages/POS/PaymentTerminal.tsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineUser,
    HiOutlineCreditCard,
    HiOutlineBanknotes,
    HiOutlineDevicePhoneMobile,
    HiOutlineArrowsRightLeft,
    HiOutlineArrowLeft,
} from "react-icons/hi2";
import { cn } from "@/Utils/helpers";
import Button from "@/Components/UI/Button";
import { Select } from "@/Components/UI/Select";

type PaymentMethod = "mpesa" | "cash" | "credit" | "split";

interface PaymentTerminalProps {
    total: number;
    customer?: {
        id:number,
        name:string,
    };
    selectedCustomerId?: number | string | null;
    onBack?: () => void;
    onComplete: (data: any) => void;
    onCustomerChange?: (id:any) => void;
    isProcessing?: boolean;
    allowedPaymentMethods?: PaymentMethod[]; 
}

export default function PaymentTerminal({
    total,
    customer,
    onBack,
    onComplete,
    allowedPaymentMethods = ["mpesa", "cash", "credit", "split"], // Default all methods
}: PaymentTerminalProps) {
    // Determine the first allowed method as default
    const defaultMethod = allowedPaymentMethods[0] || "mpesa";
    const [activeTab, setActiveTab] = useState<PaymentMethod>(defaultMethod);

    const selectedCustomerId = customer?.id;

    // Payment Amounts
    const [cashAmount, setCashAmount] = useState<number>(0);
    const [mpesaAmount, setMpesaAmount] = useState<number>(0);
    const [creditAmount, setCreditAmount] = useState<number>(0);
    const [changeGiven, setChangeGiven] = useState<number>(0);

    // Check if a payment method is allowed
    const isMethodAllowed = (method: PaymentMethod): boolean => {
        return allowedPaymentMethods.includes(method);
    };

    // Get visible tabs based on allowed methods
    const visibleTabs = useMemo(() => {
        const tabs: { method: PaymentMethod; label: string; Icon: any }[] = [];

        if (isMethodAllowed("mpesa")) {
            tabs.push({
                method: "mpesa",
                label: "M-Pesa",
                Icon: HiOutlineDevicePhoneMobile,
            });
        }
        if (isMethodAllowed("cash")) {
            tabs.push({
                method: "cash",
                label: "Cash",
                Icon: HiOutlineBanknotes,
            });
        }
        if (isMethodAllowed("split")) {
            tabs.push({
                method: "split",
                label: "Split",
                Icon: HiOutlineArrowsRightLeft,
            });
        }
        if (isMethodAllowed("credit")) {
            tabs.push({
                method: "credit",
                label: "Credit",
                Icon: HiOutlineCreditCard,
            });
        }

        return tabs;
    }, [allowedPaymentMethods]);

    // Update active tab if current tab becomes not allowed
    useEffect(() => {
        if (!isMethodAllowed(activeTab) && visibleTabs.length > 0) {
            setActiveTab(visibleTabs[0].method);
        }
    }, [allowedPaymentMethods, activeTab, visibleTabs]);

    // 1. Tab Initialization Logic
    useEffect(() => {
        if (!isMethodAllowed(activeTab)) return;

        if (activeTab === "mpesa") {
            setMpesaAmount(total);
            setCashAmount(0);
            setCreditAmount(0);
        } else if (activeTab === "cash") {
            setMpesaAmount(0);
            setCreditAmount(0);
            setCashAmount(0);
        } else if (activeTab === "credit") {
            setMpesaAmount(0);
            setCashAmount(0);
            setCreditAmount(total);
        } else if (activeTab === "split") {
            setMpesaAmount(0);
            setCashAmount(0);
            setCreditAmount(0);
        }
    }, [activeTab, total]);

    useEffect(() => {
        if (activeTab === "split") {
            const isOnlyCash =
                cashAmount >= total && mpesaAmount === 0 && creditAmount === 0;
            const isOnlyMpesa =
                mpesaAmount >= total && cashAmount === 0 && creditAmount === 0;
            const isOnlyCredit =
                creditAmount >= total && cashAmount === 0 && mpesaAmount === 0;

            if (isOnlyCash && isMethodAllowed("cash")) setActiveTab("cash");
            if (isOnlyMpesa && isMethodAllowed("mpesa")) setActiveTab("mpesa");
            if (isOnlyCredit && isMethodAllowed("credit"))
                setActiveTab("credit");
        }
    }, [cashAmount, mpesaAmount, creditAmount, total]);

    const handleSplitChange = (
        type: "cash" | "mpesa" | "credit",
        val: number
    ) => {
        if (type === "cash") setCashAmount(val);

        if (type === "mpesa") {
            if (activeTab === "split") {
                const maxAllowed = Math.max(0, total - cashAmount);
                setMpesaAmount(Math.min(val, maxAllowed));
            } else {
                setMpesaAmount(val);
            }
        }

        if (type === "credit") setCreditAmount(val);
    };

    const paidTotal = cashAmount + mpesaAmount + creditAmount;
    const remaining = Math.max(0, total - paidTotal);
   
    
    useEffect(() => {
        const changeToGive =
            paidTotal > total && cashAmount > paidTotal - total
                ? Math.floor((paidTotal - total) / 5) * 5
                : 0;
        setChangeGiven(changeToGive);
    }, [paidTotal, cashAmount]);

    const canComplete =
        total != 0 &&
        paidTotal >= total &&
        (creditAmount > 0 ? !!selectedCustomerId : true);

    // Don't render if no payment methods are allowed
    if (visibleTabs.length === 0) {
        return (
            <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center">
                <div className="text-center">
                    <p className="text-error">No payment methods available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-container-lowest flex flex-col overflow-x-hidden">
            {/* Header Area - Responsive */}
            <div className="px-4 sm:px-6 py-4 sm:p-6 flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low sticky top-0 z-10">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="p-2 sm:p-3 rounded-full hover:bg-surface-container-highest transition-colors shrink-0"
                    >
                        <HiOutlineArrowLeft className="text-xl sm:text-2xl text-on-surface" />
                    </button>
                )}
                <div className="text-center px-2 flex-1">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant whitespace-nowrap">
                        Checkout Total
                    </p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-primary break-all">
                        KES {total.toLocaleString()}
                    </h1>
                </div>
                <div
                    className={cn(
                        "w-8 sm:w-12 shrink-0",
                        !onBack && "invisible"
                    )}
                />
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
                <div className="flex flex-col gap-6 md:gap-8">
                    {/* Left Column */}
                    <div className="flex-1 min-w-0 space-y-6 md:space-y-8">
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-3 md:mb-4 ml-2">
                               {customer?.name}
                            </h3>
                            {/* <Select
                                label="Select Customer"
                                value={selectedCustomerId || ""}
                                onChange={setSelectedCustomerId}
                                options={customers}
                                placeholder="Search for customer..."
                                Icon={HiOutlineUser}
                                size="lg"
                            /> */}
                        </section>

                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-3 md:mb-4 ml-2">
                                2. Payment Method
                            </h3>
                            <div
                                className={cn(
                                    "grid gap-2 sm:gap-3",
                                    visibleTabs.length === 1 && "grid-cols-1",
                                    visibleTabs.length === 2 && "grid-cols-2",
                                    visibleTabs.length === 3 && "grid-cols-3",
                                    visibleTabs.length === 4 &&
                                        "grid-cols-2 sm:grid-cols-4"
                                )}
                            >
                                {visibleTabs.map((tab) => (
                                    <TabButton
                                        key={tab.method}
                                        active={activeTab === tab.method}
                                        onClick={() => setActiveTab(tab.method)}
                                        label={tab.label}
                                        Icon={tab.Icon}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="bg-surface-container-low rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 border border-outline-variant/10 shadow-sm overflow-x-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="min-w-[200px]"
                                >
                                    {activeTab === "split" ? (
                                        <div className="space-y-4 md:space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                                {isMethodAllowed("cash") && (
                                                    <PaymentInput
                                                        label="Cash Received"
                                                        value={cashAmount}
                                                        onChange={(v: number) =>
                                                            handleSplitChange(
                                                                "cash",
                                                                v
                                                            )
                                                        }
                                                        disabled={total <= 0}
                                                    />
                                                )}
                                                {isMethodAllowed("mpesa") && (
                                                    <PaymentInput
                                                        label="M-Pesa Amount"
                                                        value={mpesaAmount}
                                                        onChange={(v: number) =>
                                                            handleSplitChange(
                                                                "mpesa",
                                                                v
                                                            )
                                                        }
                                                        disabled={
                                                            cashAmount >= total
                                                        }
                                                    />
                                                )}
                                            </div>
                                            {isMethodAllowed("credit") && (
                                                <PaymentInput
                                                    label="Credit Balance"
                                                    value={creditAmount}
                                                    onChange={(v: number) =>
                                                        handleSplitChange(
                                                            "credit",
                                                            v
                                                        )
                                                    }
                                                    disabled={
                                                        !selectedCustomerId
                                                    }
                                                    error={
                                                        !selectedCustomerId
                                                            ? "Select Customer for credit"
                                                            : ""
                                                    }
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <PaymentInput
                                            label={`${activeTab.toUpperCase()} Amount`}
                                            value={
                                                activeTab === "cash"
                                                    ? cashAmount
                                                    : activeTab === "mpesa"
                                                    ? mpesaAmount
                                                    : creditAmount
                                            }
                                            onChange={(v: number) => {
                                                handleSplitChange(
                                                    activeTab as any,
                                                    v
                                                );
                                            }}
                                            size="xl"
                                            disabled={total <= 0}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </section>
                    </div>

                    {/* Right Column - Sticky Summary */}
                    <div className="flex-shrink-0">
                        <div className="bg-surface-container-high rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-4 shadow-xl border border-primary/5 sticky top-20 lg:top-24">
                            <h3 className="text-center font-black uppercase tracking-widest text-xs mb-4 md:mb-8">
                                Summary
                            </h3>

                            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                                <SummaryItem label="Total Bill" value={total} />
                                <div className="h-px bg-outline-variant/20 my-2 md:my-4" />
                                {cashAmount > 0 && (
                                    <SummaryItem
                                        label="Cash Paid"
                                        value={cashAmount}
                                        highlight
                                    />
                                )}
                                {mpesaAmount > 0 && (
                                    <SummaryItem
                                        label="M-Pesa Paid"
                                        value={mpesaAmount}
                                        highlight
                                    />
                                )}
                                {creditAmount > 0 && (
                                    <SummaryItem
                                        label="Credited"
                                        value={creditAmount}
                                        highlight
                                    />
                                )}
                            </div>

                            {changeGiven > 0 && (
                                <div className="bg-secondary/10 rounded-2xl p-3 md:p-4 mb-6 md:mb-8 text-center border border-secondary/20">
                                    <p className="text-[10px] font-black uppercase">
                                        Change Due
                                    </p>
                                    <p className="text-2xl md:text-3xl font-black text-on-secondary break-all">
                                        KES {changeGiven.toFixed(2)}
                                    </p>
                                </div>
                            )}

                            {remaining > 0 && (
                                <div className="bg-error/5 rounded-2xl p-3 md:p-4 mb-6 md:mb-8 text-center border border-error/10">
                                    <p className="text-[10px] font-black uppercase text-error">
                                        Unpaid Balance
                                    </p>
                                    <p className="text-xl md:text-2xl font-black text-error break-all">
                                        KES {remaining.toFixed(2)}
                                    </p>
                                </div>
                            )}

                            <Button
                                className="w-full py-6 md:py-8 lg:py-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] text-xl md:text-2xl font-black shadow-2xl shadow-primary/20"
                                disabled={!canComplete}
                                onClick={() =>
                                    onComplete({
                                        cashAmount,
                                        mpesaAmount,
                                        creditAmount,
                                        changeGiven,
                                        selectedCustomerId,
                                    })
                                }
                            >
                                {canComplete
                                    ? "Finish Transaction"
                                    : `Pay KES ${remaining.toFixed(2)}`}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Sub-components (TabButton, PaymentInput, SummaryItem remain the same)
function TabButton({ active, onClick, label, Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all gap-1 sm:gap-2 min-w-0",
                active
                    ? "bg-primary border-primary text-on-primary shadow-lg shadow-primary/30"
                    : "bg-transparent border-outline-variant/30 text-on-surface-variant hover:border-primary/50"
            )}
        >
            <Icon className="text-xl sm:text-2xl shrink-0" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-tighter whitespace-nowrap">
                {label}
            </span>
        </button>
    );
}

function PaymentInput({
    label,
    value,
    onChange,
    disabled,
    error,
    size = "lg",
}: any) {
    return (
        <div
            className={cn(
                "space-y-2 w-full",
                disabled && "opacity-30 grayscale pointer-events-none"
            )}
        >
            <label className="text-[10px] font-black uppercase text-primary ml-2 sm:ml-3 md:ml-4 tracking-widest">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    type="number"
                    value={value || ""}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    onFocus={(e) => e.target.select()}
                    className={cn(
                        "w-full bg-surface-container-lowest border-none rounded-[1.5rem] sm:rounded-[2rem] font-black text-center text-on-surface focus:ring-4 focus:ring-primary/10 transition-all",
                        size === "xl"
                            ? "py-6 sm:py-8 md:py-10 text-3xl sm:text-4xl md:text-5xl"
                            : "py-4 sm:py-5 md:py-6 text-xl sm:text-2xl"
                    )}
                    placeholder="0.00"
                />
            </div>
            {error && (
                <div className="text-center text-error text-xs mt-1">
                    {error}
                </div>
            )}
        </div>
    );
}

function SummaryItem({ label, value, highlight }: any) {
    return (
        <div className="flex justify-between items-center gap-2 sm:gap-4">
            <span className="text-[10px] font-black uppercase text-on-surface-variant whitespace-nowrap">
                {label}
            </span>
            <span
                className={cn(
                    "text-base sm:text-lg font-black text-right break-all",
                    highlight ? "text-primary" : "text-on-surface"
                )}
            >
                KES{" "}
                {value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        </div>
    );
}
