import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { CashierTransaction } from "@/types";
import TransactionRow from "@/Components/Common/TransactionRow";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";

const mockTransactions: CashierTransaction[] = [
    {
        id: "1",
        orderNumber: "#TXN-9402",
        time: "14:22 PM",
        items: 3,
        amount: 24.5,
        status: "Success",
        paymentMethod: "cash",
    },
    {
        id: "2",
        orderNumber: "#TXN-9398",
        time: "13:58 PM",
        items: 1,
        amount: 8.0,
        status: "Refunded",
        paymentMethod: "mpesa",
    },
    {
        id: "3",
        orderNumber: "#TXN-9395",
        time: "13:45 PM",
        items: 5,
        amount: 52.75,
        status: "Success",
        paymentMethod: "cash",
    },
    {
        id: "4",
        orderNumber: "#TXN-9390",
        time: "13:12 PM",
        items: 2,
        amount: 12.0,
        status: "Success",
        paymentMethod: "mpesa",
    },
];

export default function CashierTransactions() {
    const [transactions] = useState<CashierTransaction[]>(mockTransactions);

    const handlePrint = (id: string) => {
        console.log("Print receipt for:", id);
    };

    const handleRefund = (id: string) => {
        console.log("Process refund for:", id);
    };

    return (
        <>
            <Head title="Transactions - Cashier" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8">
                    <header className="mb-8 md:mb-10">
                        <h1 className="text-3xl md:text-4xl font-play font-extrabold tracking-tight text-on-surface mb-2">
                            Sales Ledger
                        </h1>
                        <p className="text-on-surface-variant font-play">
                            Reviewing artisan transactions for{" "}
                            <span className="text-primary font-bold">
                                {new Date().toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </p>
                    </header>

                    <div className="bg-surface-container-highest/30 rounded-2xl overflow-hidden">
                        <div className="p-4 md:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/10">
                            <div className="flex gap-3">
                                <span className="px-3 md:px-4 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold uppercase tracking-wider">
                                    All Sales
                                </span>
                            </div>
                            <div className="text-on-surface-variant text-xs md:text-sm font-medium">
                                Showing 1-4 of 142 entries
                            </div>
                        </div>

                        <div className="overflow-x-auto scrollbar-hidden ">
                            <table className="w-full text-left   ">
                                <thead className="">
                                    <tr className="text-on-surface-variant items-center ">
                                        <th className="pb-4 px-4 font-label text-xs font-bold uppercase tracking-widest">
                                            Transaction ID
                                        </th>
                                        <th className="pb-4 px-4 font-label text-xs font-bold uppercase tracking-widest">
                                            Time
                                        </th>
                                        <th className="pb-4 px-4 font-label text-xs font-bold uppercase tracking-widest">
                                            Items
                                        </th>
                                        <th className="pb-4 px-4 font-label text-xs font-bold uppercase tracking-widest text-right">
                                            Amount
                                        </th>
                                        <th className="pb-4 px-4 font-label text-xs font-bold uppercase tracking-widest">
                                            Status
                                        </th>
                                        <th className="pb-4 px-4 font-label text-xs font-bold uppercase tracking-widest text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <TransactionRow
                                            key={transaction.id}
                                            transaction={transaction}
                                            onPrint={handlePrint}
                                            onRefund={handleRefund}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
