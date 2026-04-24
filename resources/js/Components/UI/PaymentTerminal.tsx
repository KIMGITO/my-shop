import React, { useState, useMemo, useEffect, useRef } from "react";
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
import Input from "./Input";

type PaymentMethod = "mpesa" | "cash" | "split" | "credit";

interface PaymentTerminalProps {
    total: number;
    customer?: { id: number; name: string; phone?: string };
    onBack?: () => void;
    onComplete: (data: any) => void;
    allowedPaymentMethods?: PaymentMethod[];
}

const roundToWholeNumber = (num: number) => Math.ceil(num);
const roundToNearest5 = (num: number) => Math.ceil(num / 5) * 5;

export default function PaymentTerminal({
    total,
    customer,
    onBack,
    onComplete,
    allowedPaymentMethods = ["mpesa", "cash", "credit", "split"],
}: PaymentTerminalProps) {
    const roundedTotal = useMemo(() => roundToWholeNumber(total), [total]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const completeButtonRef = useRef<HTMLDivElement>(null);
    
    const [activeTab, setActiveTab] = useState<PaymentMethod>(allowedPaymentMethods[0] || "mpesa");
    const [cashAmount, setCashAmount] = useState<number>(0);
    const [mpesaAmount, setMpesaAmount] = useState<number>(0);
    const [creditAmount, setCreditAmount] = useState<number>(0);
    const [rawCashInput, setRawCashInput] = useState<number>(0);
    
    const [showStkOption, setShowStkOption] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(customer?.phone || "");

    const paidTotal = cashAmount + mpesaAmount + creditAmount;
    const currentBalance = Math.max(0, roundedTotal - paidTotal);
    const changeGiven = paidTotal > roundedTotal ? paidTotal - roundedTotal : 0;
    
    const canComplete = paidTotal >= roundedTotal && roundedTotal > 0 && (customer!== null && creditAmount <= 0 ) ;

    // 1. AUTO-SCROLL LOGIC: Scroll to bottom when balance is 0
    useEffect(() => {
        if (currentBalance === 0 && canComplete) {
            completeButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [currentBalance, canComplete]);

    useEffect(()=>{
        if(activeTab == 'split'){
            if(currentBalance == 0 && cashAmount >= roundedTotal){
                setActiveTab('cash');
            }
            if(currentBalance == 0 && mpesaAmount >= roundedTotal){
                setActiveTab('mpesa');
            }

        }
    },[cashAmount,mpesaAmount])

    // 2. TAB RESET LOGIC
    useEffect(() => {
        setCashAmount(0);
        setRawCashInput(0);
        setMpesaAmount(0);
        setCreditAmount(0);

        if (activeTab === "mpesa") setMpesaAmount(roundedTotal);
        if (activeTab === "credit") setCreditAmount(roundedTotal);
        if (activeTab === "cash") {
            setRawCashInput(roundedTotal);
            setCashAmount(roundToNearest5(roundedTotal));
        }
    }, [activeTab, roundedTotal]);

    const visibleTabs = useMemo(() => {
        const icons = { mpesa: HiOutlineDevicePhoneMobile, cash: HiOutlineBanknotes, split: HiOutlineArrowsRightLeft, credit: HiOutlineCreditCard };
        const labels = { mpesa: "M-Pesa", cash: "Cash", split: "Split", credit: "Credit" };
        return allowedPaymentMethods.map(m => ({ method: m, label: labels[m], Icon: icons[m as keyof typeof icons] }));
    }, [allowedPaymentMethods]);

    return (
        <div className="h-full bg-surface-container-lowest flex flex-col border-l border-outline-variant/10 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/10 shrink-0">
                {onBack && (
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container-highest">
                        <HiOutlineArrowLeft className="text-xl text-on-surface" />
                    </button>
                )}
                <div className="text-right w-full">
                    <p className="text-[10px] font-black uppercase text-on-surface-variant leading-none mb-1">Payable Total</p>
                    <h1 className="text-2xl font-black text-primary">KES {roundedTotal.toLocaleString()}</h1>
                </div>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                <section className={`grid grid-cols-${allowedPaymentMethods.length} gap-2`}>
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab.method}
                            onClick={() => setActiveTab(tab.method as any)}
                            className={cn(
                                "flex items-center justify-center gap-3 p-3 rounded-2xl border-2 transition-all",
                                activeTab === tab.method ? "bg-primary border-primary text-on-primary shadow-md" : "bg-surface-container-low border-outline-variant/20 text-on-surface-variant"
                            )}
                        >
                            <tab.Icon className="text-lg shrink-0" />
                            <span className="text-[11px] font-bold uppercase">{tab.label}</span>
                        </button>
                    ))}
                </section>

                <section className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            {activeTab === "split" ? (
                                <div className="space-y-3">
                                    {/* M-Pesa First in Split to allow STK focus */}
                                    <PaymentInput 
                                        label="1. M-Pesa Amount" 
                                        value={mpesaAmount} 
                                        onChange={setMpesaAmount}
                                        maximum={roundedTotal} 
                                    />
                                    {/* Cash is capped by whatever M-Pesa didn't pay */}
                                    <PaymentInput 
                                        label="2. Cash Received" 
                                        value={rawCashInput} 
                                        onChange={(v) => {
                                            setRawCashInput(v);
                                            setCashAmount(roundToNearest5(v));
                                        }}
                                        maximum={Math.max(0, 100000)} 
                                        disabled={mpesaAmount >= roundedTotal} // Block if M-Pesa paid it all
                                    />
                                    {allowedPaymentMethods.includes("credit") && (
                                        <PaymentInput 
                                            label="3. Credit Balance" 
                                            value={creditAmount} 
                                            onChange={setCreditAmount}
                                            maximum={Math.max(0, roundedTotal - mpesaAmount - (cashAmount > 0 ? Math.min(cashAmount, roundedTotal) : 0))}
                                        />
                                    )}
                                </div>
                            ) : (
                                <PaymentInput
                                    label={`${activeTab.toUpperCase()} Amount`}
                                    value={activeTab === "cash" ? rawCashInput : activeTab === "mpesa" ? mpesaAmount : creditAmount}
                                    maximum={activeTab === "cash" ? 100000 : roundedTotal}
                                    onChange={(v) => {
                                        if (activeTab === "cash") {
                                            setRawCashInput(v);
                                            setCashAmount(roundToNearest5(v));
                                        } else if (activeTab === "mpesa") setMpesaAmount(v);
                                        else setCreditAmount(v);
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* M-Pesa STK Push */}
                    {(activeTab === "mpesa" || (activeTab === "split" && mpesaAmount > 0)) && (
                        <div className="pt-2">
                            <button 
                                onClick={() => setShowStkOption(!showStkOption)} 
                                className={cn(
                                    "w-full py-2 px-4 rounded-xl border flex items-center justify-between transition-all",
                                    showStkOption ? "bg-primary text-on-primary border-primary" : "bg-surface-container text-on-surface-variant"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <HiOutlineDevicePhoneMobile className="text-lg" />
                                    <span className="text-xs font-bold uppercase">STK Push</span>
                                </div>
                                <span className="material-symbols-outlined text-sm">{showStkOption ? 'expand_less' : 'expand_more'}</span>
                            </button>
                            {showStkOption && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-3 p-4 bg-surface-container-high rounded-2xl border space-y-3">
                                    <Input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                        placeholder="0712345678"
                                        className="w-full border-none border-primary py-3 px-4 text-lg font-black"
                                    />
                                    <Button variant="outline" size="md" fullWidth disabled={phoneNumber.length < 10 || mpesaAmount <= 0}>
                                        Send KES {mpesaAmount}
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </section>
                {/* Scroll Target */}
                <div ref={completeButtonRef} className="h-2" />
            </div>

            {/* Footer Summary */}
            <div className="p-4 bg-surface-container border-t border-outline-variant/20 space-y-4 shrink-0">
                <div className="space-y-1">
                    {changeGiven > 0 && (
                        <div className="flex justify-between items-center text-secondary font-black">
                            <span className="text-[10px] uppercase">Change</span>
                            <span className="text-lg">KES {changeGiven.toLocaleString()}</span>
                        </div>
                    )}
                    {currentBalance > 0 && (
                        <div className="flex justify-between items-center text-error font-black">
                            <span className="text-[10px] uppercase">Balance</span>
                            <span className="text-lg">KES {currentBalance.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <Button
                    className={cn(
                        "w-full py-4 rounded-2xl text-xl font-black shadow-lg transition-all",
                        canComplete ? "bg-primary text-on-primary" : "bg-primary opacity-20 text-on-primary 0 cursor-not-allowed"
                    )}
                    disabled={!canComplete}
                    onClick={() => onComplete({ cashAmount, mpesaAmount, creditAmount, changeGiven, phoneNumber })}
                >
                    {currentBalance > 0 ? `Pay KES ${currentBalance.toLocaleString()}` : "Complete Sale"}
                </Button>
            </div>
        </div>
    );
}

function PaymentInput({ label, value, onChange, maximum = 100000, disabled = false }: any) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const val = e.target.value;
        if (val === "") { onChange(0); return; }

        if (/^\d+$/.test(val)) {
            const num = parseInt(val, 10);
            if (num > maximum) {
                onChange(maximum);
            } else {
                onChange(num);
            }
        }
    };

    return (
        <div className={cn("space-y-1 w-full transition-opacity", disabled && "opacity-50 pointer-events-none")}>
            <div className="flex justify-between px-2">
                <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-tighter">{label}</label>
                <span className="text-[8px] text-on-surface-variant/40 font-bold">MAX: {maximum.toLocaleString()}</span>
            </div>
            <input
                type="text"
                inputMode="numeric"
                value={value === 0 ? "" : value}
                onChange={handleTextChange}
                onFocus={(e) => e.target.select()}
                readOnly={disabled}
                className="w-full bg-surface-container-low border-none rounded-2xl py-4 text-center text-xl font-black text-on-surface focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="0"
            />
        </div>
    );
}   