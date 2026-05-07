import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import PaymentTerminal from "@/Components/UI/PaymentTerminal";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiOutlineUser, HiOutlineArrowLeft } from "react-icons/hi2";

// Mock interface for your customer data
interface CustomerDebt {
    id: number;
    name: string;
    phone: string;
    outstandingBalance: number;
}

interface TransactionHistory{
    method: string,
    date:string,
    amount: number
}

export default function CreditPaymentPage({ customerId }: { customerId: number}) {
    const [customer, setCustomer] = useState<CustomerDebt | null>(null);
    const [history, setHistory] = useState<TransactionHistory [] | null >(null);
    const [loading, setLoading] = useState(true);

    const onBack = () => {
        window.history.back();
    }

    useEffect(() => {
        // Replace with your actual API call
        const fetchCustomerDebt = async () => {
            const response = await axios.get(`/api/v1/customers/${customerId}/debt`);
            setCustomer(response.data.data);
            setHistory(response.data.history)

            setLoading(false);
        };
        fetchCustomerDebt();
    }, []);

    const handlePaymentComplete = (paymentData: any) => {
        

        router.post(route('payments.credits', customer.id),{
            customerId: customer?.id,
            ...paymentData
        } );

    };

    if (loading) return <div className="p-10 text-center">Loading Account Details...</div>;
    if (!customer) return <div className="p-10 text-center">Customer not found.</div>;

    return (
         <>
            <Head title="Admin | Customer Management" />
            <AuthenticatedLayout>
            <div className="p-6  ">
                <div className="flex flex-col md:flex-row h-screen bg-surface overflow-hidden">
    {/* Sidebar Section: Context & History */}
    <div className="w-full md:w-80 lg:w-100 bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant/10 flex flex-col shrink-0">
        
        {/* Customer Profile Header */}
        <div className="p-6 flex items-center gap-4 bg-primary/5">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <HiOutlineUser size={24} />
            </div>
            <div className="min-w-0">
                <h2 className="text-lg font-black text-on-surface truncate">{customer.name}</h2>
                <p className="text-sm text-on-surface-variant flex flex-wrap items-center">
                    Outstanding: 
                    <span className="font-bold text-error ml-1">KES {customer.outstandingBalance.toLocaleString()}</span>
                </p>
            </div>
        </div>

        {/* Last 6 Payments History */}
        <div className="flex-1 p-6 overflow-y-auto hidden md:block">
            <h3 className="text-[10px] font-black uppercase text-on-surface-variant mb-4 tracking-widest">Recent Payments</h3>
            <div className="space-y-3">
                {/* Map your history here */}
                {history !== null ? history.map((transaction, index) => (
                    <div key={`${index}`} className="flex justify-between items-center p-3 rounded-2xl bg-surface-container-highest/50 border border-outline-variant/5">
                        <div>
                            <p className="text-xs font-bold text-on-surface capitalize">{transaction.method} Payment</p>
                            <p className="text-[10px] text-on-surface-variant">{transaction.date}</p>
                        </div>
                        <p className="text-sm font-black text-success">+ {transaction.amount}</p>
                    </div>
                )) : <></>}
            </div>
        </div>
    </div>

    {/* The Payment Terminal Section */}
    <div className="flex-1 overflow-hidden bg-surface-container-lowest">
        <PaymentTerminal 
            total={customer.outstandingBalance}
            canCompleteTransaction
            customer={customer}
            onBack={onBack}
            onComplete={handlePaymentComplete}
            allowedPaymentMethods={["mpesa", "cash", "split"]} 
        />
    </div>
</div>
            </div>
            </AuthenticatedLayout>
        </>
    );
}