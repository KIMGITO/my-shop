// resources/js/Pages/Cashier/Checkout.tsx

import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import PaymentTerminal from "@/Components/UI/PaymentTerminal";
import { usePOSCartStore } from "@/Stores/usePOSCartStore";

interface Props {
    order: any; // The order passed from your controller
    customers: any[];
    taxRate: number;
}

export default function CashierCheckout({ order, customers, taxRate }: Props) {

    console.log(order);

    const { clearCart } = usePOSCartStore();
    const [isProcessing, setIsProcessing] = useState(false);

    // We use the order's calculated total from the backend
    const total = parseFloat(order.total_amount);

    const handleCompletePayment = (paymentData: any) => {
        setIsProcessing(true);

        // Submit the payment to a separate 'process' or 'complete' route
        router.post(route('orders.complete', order.id), {
            payment_method: paymentData.method,
            amounts: {
                cash: paymentData.cashAmount,
                mpesa: paymentData.mpesaAmount,
                credit: paymentData.creditAmount,
            },
            phone: paymentData.phoneNumber, // For STK Push
        }, {
            onSuccess: () => {
                clearCart(); // Success! Wipe the local temporary cart
            },
            onFinish: () => setIsProcessing(false)
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Payment - ${order.order_number}`} />

            <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Order Summary (Source of Truth) */}
                <div className="lg:col-span-5">
                    <h1 className="text-3xl font-black mb-6">Confirm Payment</h1>
                    <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <span className="font-bold text-primary">{order.order_number}</span>
                            <span className="text-xs uppercase font-black opacity hover:cursor-pointer border p-0.5 px-1 border-primary/20 rounded underline text-primary" onClick={()=>{router.visit(route('pos.index'))}}>Review Cart</span>
                        </div>

                        <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto">
                            {order.items.map((item: any, index:any) => (
                                <div key={`${item.id}-${index}`} className="flex justify-between">
                                    <div>
                                        <p className="font-bold capitalize">{index+1} {item.batch.product.name}</p>
                                        <p className="text-xs opacity-60">{item.quantity} x KES {item.price}</p>
                                    </div>
                                    <p className="font-bold">KES {item.quantity * item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-dashed space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Tax ({taxRate * 100}%)</span>
                                <span>KES {order.tax_amount}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black text-primary">
                                <span>Total</span>
                                <span>KES {total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: The Terminal */}
                <div className="lg:col-span-7">
                    <PaymentTerminal
                        total={total}
                        customer={order.customer}
                        customers={customers}
                        allowedPaymentMethods={['mpesa','cash']}
                        onComplete={handleCompletePayment}
                        isProcessing={isProcessing}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}