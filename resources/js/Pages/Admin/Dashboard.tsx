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
import { FaUsersLine } from "react-icons/fa6";
import FinancialChart from "./FinantialChart";

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

export default function AdminDashboard({ revenue, orders, products, customers }) {
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
                            value={revenue['income']}
                            icon={HiOutlineCash}
                            trend={{ value: revenue['percentage'], direction: "up" }}
                        />
                        <KPICard
                            title="Orders This Month"
                            value={orders['count']}
                            icon={HiOutlineShoppingBag}
                            subtitle={`Peak hour: ${orders['peakHour']}`}
                        />
                        <KPICard
                            title="Stock Alerts"
                            value={products['count']}
                            icon={HiOutlineExclamationTriangle}
                            color="error"
                            subtitle={products['message']}
                        />
                        <KPICard
                            title="Customers"
                            value={customers['count']}
                            icon={FaUsersLine}
                            trend={{ value: customers['percentage'], direction: "up" }}
                        />
                    </div>

                    {/* Main Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sales Chart */}
                        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-lg">
                           <FinancialChart/>
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
