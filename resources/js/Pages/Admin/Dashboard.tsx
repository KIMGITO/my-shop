import React from "react";
import { Head } from "@inertiajs/react";
import { KPICard } from "@/Components/Admin/KPICard";
import { AlertCard } from "@/Components/Admin/AlertCard";
import {
    HiOutlineShoppingBag,
    HiOutlineExclamationTriangle,
    HiOutlineTruck,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HiOutlineCash } from "react-icons/hi";

const alerts = [
    {
        type: "critical" as const,
        title: "Whole Milk Low Stock",
        message: "Branch: Nairobi West. Remaining: 12L",
        time: "12 mins ago",
        actionText: "Reorder",
    },
    {
        type: "warning" as const,
        title: "Delivery Delayed",
        message: "Route #402 stuck in traffic. ETA +45m.",
        time: "28 mins ago",
        actionText: "View",
    },
    {
        type: "info" as const,
        title: "Temperature Warning",
        message: "Fridge C-4: 5.2°C (Target < 4°C)",
        time: "45 mins ago",
        actionText: "Check",
    },
];

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <AuthenticatedLayout active="dashboard">
                <div className="p-6 lg:p-10 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">
                                Operations Overview
                            </h2>
                            <p className="text-on-surface-variant font-medium mt-2">
                                Welcome back, Kaykay. Here is your morning
                                update from the bar.
                            </p>
                        </div>
                        <button className="px-6 py-3 editorial-gradient text-on-primary-fixed font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            Generate Ledger
                        </button>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <KPICard
                            title="Total Revenue"
                            value="KSh 1,240,500"
                            icon={HiOutlineCash}
                            trend={{ value: 12.5, direction: "up" }}
                        />
                        <KPICard
                            title="Orders Today"
                            value="156"
                            icon={HiOutlineShoppingBag}
                            subtitle="Peak hour: 8:00 AM"
                        />
                        <KPICard
                            title="Stock Alerts"
                            value="4 Items"
                            icon={HiOutlineExclamationTriangle}
                            color="error"
                            subtitle="Immediate restock required"
                        />
                        <KPICard
                            title="On-Time Delivery"
                            value="98.2%"
                            icon={HiOutlineTruck}
                            trend={{ value: 2, direction: "up" }}
                        />
                    </div>

                    {/* Main Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sales Chart */}
                        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold font-headline">
                                        Revenue Velocity
                                    </h3>
                                    <p className="text-sm text-stone-500">
                                        Weekly intake performance across all
                                        branches
                                    </p>
                                </div>
                                <div className="flex bg-surface-container-low p-1 rounded-lg gap-1">
                                    <button className="px-4 py-1.5 text-xs font-bold bg-white rounded shadow-sm text-primary">
                                        7 Days
                                    </button>
                                    <button className="px-4 py-1.5 text-xs font-bold text-stone-500">
                                        30 Days
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-h-[300px] flex items-end justify-between px-2 gap-4">
                                {[40, 60, 50, 85, 70, 95, 45].map(
                                    (height, i) => (
                                        <div
                                            key={i}
                                            className="w-full bg-surface-container-low rounded-t-lg relative group h-[40%]"
                                        >
                                            <div
                                                className="absolute inset-x-0 bottom-0 editorial-gradient rounded-t-lg"
                                                style={{ height: `${height}%` }}
                                            ></div>
                                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-stone-400">
                                                {
                                                    [
                                                        "MON",
                                                        "TUE",
                                                        "WED",
                                                        "THU",
                                                        "FRI",
                                                        "SAT",
                                                        "SUN",
                                                    ][i]
                                                }
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Alerts Column */}
                        <div className="bg-surface-container-high p-6 rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold font-headline">
                                    System Alerts
                                </h3>
                                <span className="bg-error text-white text-[10px] px-2 py-1 rounded-full font-black">
                                    4 CRITICAL
                                </span>
                            </div>
                            <div className="space-y-4">
                                {alerts.map((alert, idx) => (
                                    <AlertCard key={idx} {...alert} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
