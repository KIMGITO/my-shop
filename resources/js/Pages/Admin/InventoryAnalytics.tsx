import React from "react";
import { Head } from "@inertiajs/react";
import { KPICard } from "@/Components/Admin/KPICard";
import {
    HiOutlineBeaker,
    HiOutlineChartBar,
} from "react-icons/hi2";
import { CategoryPerformanceRow } from "@/Components/Admin/CategoryPerformanceRow";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { cn } from "@/lib/utils";

const categories = [
    {
        name: "Artisanal Milks",
        description: "Whole, A2, & Goat milk variants",
        revenue: "$42,800",
        percentage: "42% OF TOTAL REVENUE",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaK9bwdsi9T-08gqZs1pd7TM71dcGhi835cvvzyZ35mUQU0boQgbPl2C28Qa59RSIXNwbaTZBVAKk-IYbNZ8F914FGhOZIEYjDNIsdqaRGjtlU9Rfp5JdRVR1SW1UYWzbYKtZ684ScWqLURhC8DPigTOdZ5X_yQjf9iOj_5v9sxQ004qR8bnqt7ycp-sUvpZxbuzTF7ED-V34s9Dk5Iv7iyZ_nRW5W4KZZhjSgtC8GkWIuGhtVFwbsAUUlkzSAXZn7CXmvPoUm8U0F",
    },
    {
        name: "Gourmet Bakery",
        description: "Croissants, Sourdough, Pastries",
        revenue: "$28,150",
        percentage: "29% OF TOTAL REVENUE",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqO3IrRMuGB4mApUkJVvrGauIlJQ22UsLutg4_xvCHROUYBkh0qsSzzG_895sAAwD7hhWNf3No15JwT74wC5MHkubXOXFC4stlse-l9CGU7ZJVTu1kQvssNYgbrTdV_G920_XkKj0RBkeTXhVDs9XR3DpN17Yzcms6CyYoLj-5PhGm02q31M0d0D1lEy5kwG42VpqxUqYgfTu9uHKgxnbXa48b0_ZvgLLLczqLbe__M3YGt4FgPhjFCgzyaH8PBTplrKxELlcp5xPa",
    },
];

const batchData = [
    {
        id: "#M-2024-001",
        name: "Jersey Gold Whole Milk",
        status: "ACTIVE",
        stock: "1,240L",
        price: "$4.50",
        expiry: "12 OCT 2024",
    },
    {
        id: "#M-2024-002",
        name: "Organic Almond Blend",
        status: "ACTIVE",
        stock: "850L",
        price: "$6.25",
        expiry: "15 OCT 2024",
    },
    {
        id: "#B-2024-405",
        name: "Butter Croissant (Large)",
        status: "Low Stock",
        stock: "45 units",
        price: "$3.75",
        expiry: "08 OCT 2024",
    },
];

export default function InventoryAnalytics() {
    return (
        <>
            <Head title="Inventory Analytics" />
            <AuthenticatedLayout >
                <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <span className="text-tertiary font-bold font-label tracking-widest uppercase text-xs">
                            Performance Deep Dive
                        </span>
                        <h2 className="text-4xl font-extrabold font-headline text-on-background tracking-tighter mt-2">
                            Inventory Analytics
                        </h2>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-on-surface-variant font-bold text-sm uppercase">
                                    Total Fluid Revenue
                                </p>
                                <h3 className="text-5xl font-black font-headline text-primary mt-2">
                                    $142,850.40
                                </h3>
                                <div className="flex items-center gap-2 mt-4 text-green-700 font-bold">
                                    <span className="material-symbols-outlined text-sm">
                                        trending_up
                                    </span>
                                    <span>12.4% vs last month</span>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10">
                                <span className="material-symbols-outlined text-[200px] text-primary">
                                    analytics
                                </span>
                            </div>
                        </div>
                        <div className="bg-primary-container/20 p-8 rounded-3xl border border-primary/10">
                            <p className="text-on-surface-variant font-bold text-sm uppercase">
                                Avg. Net Margin
                            </p>
                            <h3 className="text-4xl font-black font-headline mt-2">
                                24.8%
                            </h3>
                            <p className="text-on-surface-variant text-sm mt-4">
                                Optimization recommended for premium almond
                                variants.
                            </p>
                        </div>
                        <div className="bg-surface-container-highest p-8 rounded-3xl">
                            <p className="text-on-surface-variant font-bold text-sm uppercase">
                                Peak Selling Hour
                            </p>
                            <h3 className="text-4xl font-black font-headline mt-2">
                                08:15 AM
                            </h3>
                            <p className="text-on-surface-variant text-sm mt-4">
                                Morning commutes drive 65% of daily volume.
                            </p>
                        </div>
                    </div>

                    {/* Category Performance */}
                    <div className="bg-surface-container-highest/30 p-8 rounded-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-headline font-extrabold tracking-tight">
                                Top Performing Categories
                            </h3>
                            <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                VIEW ALL{" "}
                                <span className="material-symbols-outlined text-xs">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {categories.map((cat, idx) => (
                                <CategoryPerformanceRow key={idx} {...cat} />
                            ))}
                        </div>
                    </div>

                    {/* Batch Ledger Table */}
                    <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                            <div>
                                <h3 className="text-2xl font-headline font-extrabold">
                                    Batch Inventory Ledger
                                </h3>
                                <p className="text-on-surface-variant text-sm">
                                    Showing the last 24 hours of artisanal milk
                                    production
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                        filter_alt
                                    </span>{" "}
                                    FILTER
                                </button>
                                <button className="editorial-gradient px-6 py-2 rounded-lg text-sm font-bold text-on-primary-container shadow-md hover:opacity-90 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                        download
                                    </span>{" "}
                                    EXPORT
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                                        <th className="pb-6 pl-4">Batch ID</th>
                                        <th className="pb-6">Product Family</th>
                                        <th className="pb-6">Status</th>
                                        <th className="pb-6 text-right">
                                            In Stock
                                        </th>
                                        <th className="pb-6 text-right">
                                            Unit Price
                                        </th>
                                        <th className="pb-6 text-right pr-4">
                                            Expiry Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/10">
                                    {batchData.map((batch, idx) => (
                                        <tr
                                            key={idx}
                                            className="group hover:bg-surface-container-low/50 transition-colors"
                                        >
                                            <td className="py-5 pl-4 font-headline font-bold text-sm">
                                                {batch.id}
                                            </td>
                                            <td className="py-5">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            batch.status ===
                                                                "Low Stock"
                                                                ? "bg-error"
                                                                : "bg-primary"
                                                        )}
                                                    ></span>
                                                    <span className="text-sm font-semibold">
                                                        {batch.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-5">
                                                <span
                                                    className={cn(
                                                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                                        batch.status ===
                                                            "ACTIVE"
                                                            ? "bg-primary-container/20 text-on-primary-container"
                                                            : "bg-error-container/20 text-error"
                                                    )}
                                                >
                                                    {batch.status}
                                                </span>
                                            </td>
                                            <td className="py-5 text-right font-mono text-sm">
                                                {batch.stock}
                                            </td>
                                            <td className="py-5 text-right font-semibold text-sm">
                                                {batch.price}
                                            </td>
                                            <td className="py-5 text-right text-xs font-bold text-on-surface-variant pr-4">
                                                {batch.expiry}
                                            </td>
                                        </tr>
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
