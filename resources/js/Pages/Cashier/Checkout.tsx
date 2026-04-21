// resources/js/Pages/Cashier/Checkout.tsx
import React, { useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineDevicePhoneMobile,
    HiOutlineCheckCircle,
    HiOutlineTrash,
    HiOutlineArrowLeft,
} from "react-icons/hi2";
import { HiOutlineCash } from "react-icons/hi";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { usePOSCartStore } from "@/Stores/usePOSCartStore";
import { QuantitySelector } from "@/Components/UI/QuantitySelector";
import Button from "@/Components/UI/Button";
import { cn } from "@/Utils/helpers";

export default function CashierCheckout() {
    const {
        cart,
        orderNumber,
        updateQuantity,
        removeItem,
        clearCart,
        getTotal,
    } = usePOSCartStore();

    const [paymentMethod, setPaymentMethod] = useState<"cash" | "mpesa">(
        "cash"
    );
    const [receivedAmount, setReceivedAmount] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const total = getTotal(0.08); // 8% Tax

    // Logic: M-Pesa must be exact. Cash can have balance.
    const amountProvided = receivedAmount || 0;
    const isExactMpesa = paymentMethod === "mpesa" && amountProvided === total;
    const isSufficientCash =
        paymentMethod === "cash" && amountProvided >= total;
    const canComplete = isExactMpesa || isSufficientCash;

    // Nearest 5 Rounding for Cash Balance
    const rawChange = amountProvided - total;
    const changeToGive =
        paymentMethod === "cash" && rawChange > 0
            ? Math.floor(rawChange / 5) * 5
            : 0;

    useEffect(() => {
        inputRef.current?.focus();
    }, [paymentMethod]);

    const formatMoney = (amount: number) =>
        `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const handleComplete = () => {
        if (!canComplete || isProcessing) return;
        setIsProcessing(true);

        router.post(
            "/cashier/transaction",
            {
                items: cart,
                total,
                paymentMethod,
                received: amountProvided,
                change: changeToGive,
            },
            {
                onSuccess: () => {
                    clearCart();
                    router.visit("/pos");
                },
                onFinish: () => setIsProcessing(false),
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Checkout" />

            <div className="min-h-screen bg-surface-container-lowest p-4 md:p-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Cart & Summary */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-2"
                        >
                            <Button
                                variant="ghost"
                                onClick={() => router.visit("/pos")}
                                className="rounded-full h-12 w-12 p-0 bg-surface-container-high"
                            >
                                <HiOutlineArrowLeft className="text-xl" />
                            </Button>
                            <h1 className="text-3xl font-headline font-black tracking-tight">
                                Review Order
                            </h1>
                        </motion.div>

                        <div className="bg-primary rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden">
                            <div className="p-6 border-b border-outline-variant/5 bg-surface-container-low/30">
                                <span className="text-xs font-bold uppercase tracking-widest ">
                                    Ticket {orderNumber}
                                </span>
                            </div>
                            <div className="divide-y divide-outline-variant/5 max-h-[50vh] overflow-y-auto">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            key={item.id}
                                            className="p-6 flex items-center justify-between"
                                        >
                                            <div className="flex-1">
                                                <p className="font-bold text-lg">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-secondary font-medium">
                                                    {formatMoney(item.price)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <QuantitySelector
                                                    size="lg"
                                                    quantity={item.quantity}
                                                    onUpdate={(v) =>
                                                        updateQuantity(
                                                            item.id,
                                                            Number(v)
                                                        )
                                                    }
                                                />
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-error p-2 transition-colors"
                                                >
                                                    <HiOutlineTrash className="text-2xl" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Terminal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-5"
                    >
                        <PaymentTerminal
                            total={total}
                            customerSelected={!!customerName} // Boolean: true if a name exists
                            allowCredit={true} // You can toggle this based on permissions
                            isProcessing={isProcessing}
                            onComplete={(paymentData) => {
                                // handleCompleteSale now receives the specific breakdown:
                                // paymentData.cash, paymentData.mpesa, paymentData.credit, paymentData.change
                                handleCompleteSale(paymentData);
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
