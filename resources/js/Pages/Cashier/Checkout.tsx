// resources/js/Pages/Cashier/Checkout.tsx
import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlineArrowLeft } from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { usePOSCartStore } from "@/Stores/usePOSCartStore";
import { QuantitySelector } from "@/Components/UI/QuantitySelector";
import Button from "@/Components/UI/Button";
import PaymentTerminal from "@/Components/UI/PaymentTerminal";

// 1. Mock Data for testing
const MOCK_CUSTOMERS = [
    { id: 1, value: 1, label: "Martin Mukundi (Interlocking Blocks)" },
    { id: 2, value: 2, label: "Silvia Nyakio" },
    { id: 3, value: 3, label: "Daniel Simiyu" },
];

export default function CashierCheckout() {
    const {
        cart,
        orderNumber,
        updateQuantity,
        removeItem,
        clearCart,
        getTotal,
    } = usePOSCartStore();

    // 2. Add missing state for customer selection
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const total = getTotal(0.08); // 8% Tax

    const formatMoney = (amount: number) =>
        `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const handleCompleteSale = async (paymentData: any) => {
        setIsProcessing(true);

        // Find the customer name from our list for the backend
        const customer = MOCK_CUSTOMERS.find((c) => c.value === selectedId);

        const transactionData = {
            orderNumber,
            items: cart.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
            total,
            payment_details: {
                cashReceived: paymentData.cashAmount,
                mpesaReceived: paymentData.mpesaAmount,
                creditGiven: paymentData.creditAmount,
                changeGiven: paymentData.changeGiven,
            },
            customer_id: paymentData.selectedCustomerId,
            status: paymentData.credit > 0 ? "partial_credit" : "paid",
        };

        console.log(transactionData);

        // router.post("/cashier/transaction", transactionData, {
        //     onSuccess: () => {
        //         clearCart();
        //     },
        //     onFinish: () => setIsProcessing(false),
        // });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Checkout" />

            <div className="min-h-screen bg-surface-container-lowest p-4 md:p-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Cart & Summary */}
                    <div className="lg:col-span-5 space-y-6">
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

                        <div className="bg-surface-container-low rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden">
                            <div className="p-6 border-b border-outline-variant/5">
                                <span className="text-xs font-bold uppercase tracking-widest text-on-secondary">
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
                                                <p className="text-sm text-on-secondary font-medium">
                                                    {formatMoney(item.price)}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-end ">
                                                <QuantitySelector
                                                    size="sm"
                                                    quantity={item.quantity}
                                                    onUpdate={(v) =>
                                                        updateQuantity(
                                                            item.id,
                                                            Number(v)
                                                        )
                                                    }
                                                />
                                                <Button
                                                    variant="ghost"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-error/60 hover:text-error transition-colors"
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
                        className="lg:col-span-7"
                    >
                        {/* 3. Wired up props correctly */}
                        <PaymentTerminal
                            total={total}
                            customers={MOCK_CUSTOMERS}
                            selectedCustomerId={selectedId}
                            onCustomerChange={(id: number | string) =>
                                setSelectedId(id)
                            }
                            onComplete={handleCompleteSale}
                            isProcessing={isProcessing}
                            allowedPaymentMethods={["mpesa", "cash"]}
                        />
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
