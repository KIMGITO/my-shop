import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { cn } from "@/Utils/helpers"; // Add this import

const transactions = [
    {
        id: "#KB-88291",
        category: "Premium A2 Milk",
        time: "Today, 10:42 AM",
        amount: "$142.50",
        growth: "+5.2%",
        status: "Completed",
    },
    {
        id: "#KB-88290",
        category: "Milk Confections",
        time: "Today, 10:15 AM",
        amount: "$28.90",
        growth: "-0.4%",
        status: "Completed",
    },
    {
        id: "#KB-88289",
        category: "Farm Fresh Cheese Plate",
        time: "Today, 09:58 AM",
        amount: "$65.00",
        growth: "+18.1%",
        status: "Completed",
    },
    {
        id: "#KB-88288",
        category: "Bulk Raw Milk (5L)",
        time: "Today, 09:12 AM",
        amount: "$82.00",
        growth: "+2.5%",
        status: "Refunded",
    },
];

export default function SalesReports() {
    const [activeTab, setActiveTab] = useState("Daily");

    return (
        <>
            <Head title="Sales Reports" />
            <AuthenticatedLayout>
                <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">
                                Sales Reports
                            </h2>
                            <p className="text-on-surface-variant mt-1">
                                Real-time overview of Kaykay's fiscal health
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-surface-container-highest px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    calendar_today
                                </span>
                                Last 30 Days
                            </button>
                            <button className="bg-gradient-to-br from-primary-fixed to-primary-fixed-dim text-on-primary-fixed px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                                <span className="material-symbols-outlined text-lg">
                                    download
                                </span>
                                Export PDF
                            </button>
                        </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-on-surface-variant text-sm font-semibold">
                                    Gross Revenue
                                </p>
                                <h4 className="text-5xl font-extrabold mt-2">
                                    KSh 1,240,500
                                </h4>
                                <div className="flex items-center gap-2 mt-4 text-tertiary">
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <span className="font-bold">
                                        +12.4% from last month
                                    </span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <span className="material-symbols-outlined text-9xl">
                                    monetization_on
                                </span>
                            </div>
                        </div>
                        <div className="bg-surface-container-highest p-6 rounded-xl">
                            <p className="text-on-surface-variant text-sm font-semibold">
                                Net Profit
                            </p>
                            <h4 className="text-3xl font-bold mt-1">
                                KSh 482,200
                            </h4>
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Margin</span>
                                    <span className="text-primary">38.8%</span>
                                </div>
                                <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-full"
                                        style={{ width: "38.8%" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-container-low p-6 rounded-xl">
                            <p className="text-on-surface-variant text-sm font-semibold">
                                Overhead Costs
                            </p>
                            <h4 className="text-3xl font-bold mt-1">
                                KSh 625,300
                            </h4>
                            <div className="flex items-center gap-2 mt-4 text-error-dim text-sm font-bold">
                                <span className="material-symbols-outlined text-lg">
                                    info
                                </span>
                                <span>Rent & Supply peak</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs and Table */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-surface-container-low px-8 pt-6">
                            <div className="flex gap-8 border-b border-outline-variant/30 pb-4">
                                {["Daily", "Monthly", "Year Comparison"].map(
                                    (tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={cn(
                                                "pb-4 text-sm font-bold transition-colors",
                                                activeTab === tab
                                                    ? "border-b-2 border-primary text-primary"
                                                    : "text-on-surface-variant"
                                            )}
                                        >
                                            {tab}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-label-md text-on-surface-variant uppercase tracking-widest font-bold">
                                            <th className="px-6 pb-2">
                                                Transaction ID
                                            </th>
                                            <th className="px-6 pb-2">
                                                Product Category
                                            </th>
                                            <th className="px-6 pb-2">
                                                Timestamp
                                            </th>
                                            <th className="px-6 pb-2 text-right">
                                                Amount
                                            </th>
                                            <th className="px-6 pb-2 text-right">
                                                Growth
                                            </th>
                                            <th className="px-6 pb-2 text-center">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {transactions.map((tx, idx) => (
                                            <tr
                                                key={idx}
                                                className="bg-surface hover:bg-surface-container-low transition-colors"
                                            >
                                                <td className="px-6 py-5 rounded-l-xl font-bold text-on-surface">
                                                    {tx.id}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-primary text-lg">
                                                                water_drop
                                                            </span>
                                                        </div>
                                                        <span>
                                                            {tx.category}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-on-surface-variant">
                                                    {tx.time}
                                                </td>
                                                <td className="px-6 py-5 text-right font-bold tabular-nums">
                                                    {tx.amount}
                                                </td>
                                                <td
                                                    className={cn(
                                                        "px-6 py-5 text-right font-bold tabular-nums",
                                                        tx.growth.startsWith(
                                                            "+"
                                                        )
                                                            ? "text-primary"
                                                            : "text-on-surface-variant"
                                                    )}
                                                >
                                                    {tx.growth}
                                                </td>
                                                <td className="px-6 py-5 rounded-r-xl text-center">
                                                    <span
                                                        className={cn(
                                                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter",
                                                            tx.status ===
                                                                "Completed"
                                                                ? "bg-primary-container/20 text-on-primary-container"
                                                                : "bg-error-container/20 text-error"
                                                        )}
                                                    >
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-surface-container-high p-8 rounded-xl">
                        <h5 className="text-xl font-bold text-on-surface">
                            Payment Methods
                        </h5>
                        <p className="text-sm text-on-surface-variant mb-6">
                            Distribution by channel
                        </p>
                        <div className="space-y-5">
                            {[
                                {
                                    method: "M-Pesa",
                                    percent: 65,
                                    icon: "smartphone",
                                    color: "primary",
                                },
                                {
                                    method: "Cash",
                                    percent: 22,
                                    icon: "payments",
                                    color: "secondary",
                                },
                                {
                                    method: "Credit/Debit",
                                    percent: 13,
                                    icon: "credit_card",
                                    color: "outline",
                                },
                            ].map((pm, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4"
                                >
                                    <div
                                        className={cn(
                                            "h-12 w-12 rounded-full flex items-center justify-center",
                                            `bg-${pm.color}-container`
                                        )}
                                    >
                                        <span className="material-symbols-outlined">
                                            {pm.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span>{pm.method}</span>
                                            <span>{pm.percent}%</span>
                                        </div>
                                        <div className="w-full bg-surface-container-low h-2 rounded-full mt-2">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full",
                                                    `bg-${pm.color}`
                                                )}
                                                style={{
                                                    width: `${pm.percent}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
