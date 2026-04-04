import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { OrderCard } from "@/Components/Dispatch/OrderCard";
import { SearchBar } from "@/Components/UI/SearchBar";
import { cn } from "@/lib/utils";

const mockOrders = [
    {
        id: "1",
        orderNumber: "KMB-8921",
        title: "Premium Dairy Bundle",
        amount: 42.50,
        items: 3,
        distance: "2.4 km",
        timeAgo: "14m ago",
        priority: "normal" as const,
        itemsIcons: ["🥛", "🥐"],
    },
    {
        id: "2",
        orderNumber: "KMB-8924",
        title: "Golden Hour Breakfast Kit",
        amount: 28.00,
        items: 5,
        distance: "0.8 km",
        timeAgo: "5m ago",
        priority: "high" as const,
        itemsIcons: ["🍯"],
    },
];

const mockRiders = [
    {
        id: "1",
        name: "Marco Polo",
        status: "idle",
        distance: "0.2 km",
        loads: "0/3",
        rating: 4.9,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Gkgvcvp-w0gpbNDZQtVcuYKQldsElipCSYOqqsG2agarDhkq2Gx_2ZbtIwsvHFRf8SP314zEh1hOm8niowAIZPm-49OdGfj7Pv-LLTGY4b_cCrK2S0YB1QTnIbSp10jLQfd1SvUYs8bAihA0GOZgARY5c_hVFkqda2UvPrxSlSuXwEKIUn40WCJr2DWMtN4DrkA8oOrhht3mCzhKWlyJ1RkbHWd--Q-WJyxnUsjaj5EH9kZv8hdKYwKgquMmb8wM3uySxhTrWQmR",
    },
    {
        id: "2",
        name: "Sarah Jenkins",
        status: "busy",
        distance: "1.5 km",
        loads: "1/3",
        rating: 5.0,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcBRK2A8WEcUfKGCzV6rS6qDwD6udXdjEt-utbxGDJqutbZzxKD2yDaVSfVYklswzw8-fCgXTX0GCnQ3USZpawOCr1VNpopo1B59yTl1hmlKYu0KEF44boNb9kjLWgNhYw-O6LDVa6_-WRODon-vL_Y7tJ-pkCx4LQX1DYUoINuHPX6dJgPACuAL4JFR__kij_KxiCKdo8-7YtHwXF2qitvwTsNd9eEaPV8REaTW2G_4zNKa4ZqPZDto0cR9iN5JtawtiGonnW_fdQ",
    },
    {
        id: "3",
        name: "David Chen",
        status: "full",
        distance: "4.2 km",
        loads: "3/3",
        rating: 4.7,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmUc-3HX9zLeCfjPJii2A76SoKr3DZSO-S87aOmaYqrDGUUbggwc3XSWr-BOZqYQ__8zoPfwh-dwUPl4ewa2r0wB-jLdfYFX8Mcn_1NDnzhYxMJNjARO5PUPnBPEL_OZIhJQ9FNVXR1rWDPvYj3gcyi1hzJRS364Cd82HbfzQ0JmVPlOZ54lx9qtDjejFacU3vQJ8xnrEmNMOMHUK2lbvFyyvhxsUkUgZ_SaIiQ3fbnxkRkPbPoHlpVKZxA4pb6WCq4hK1mHdRt_35",
    },
];

export default function AssignRiderPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRiders = mockRiders.filter(rider =>
        rider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Assign Rider" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Assign Rider</h1>
                            <p className="text-sm text-on-surface-variant mt-1">Drag an order to a rider to assign delivery</p>
                        </div>
                        <div className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            12 New Orders
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {/* Pending Orders */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-on-surface">Pending Orders</h2>
                            <div className="space-y-4">
                                {mockOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                                <div className="bg-surface-container-low/40 p-5 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 opacity-60">
                                    <span className="material-symbols-outlined text-3xl">more_horiz</span>
                                    <p className="text-xs font-medium">9 more pending orders</p>
                                </div>
                            </div>
                        </div>

                        {/* Available Riders */}
                        <div className="bg-surface-container-highest/50 p-4 md:p-6 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-on-surface">Active Riders</h2>
                                <SearchBar
                                    placeholder="Search riders..."
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    className="w-48"
                                />
                            </div>
                            <div className="space-y-3">
                                {filteredRiders.map((rider) => {
                                    const statusConfig = {
                                        idle: { label: "Idle", color: "bg-green-100 text-green-700" },
                                        busy: { label: "1 Order", color: "bg-orange-100 text-orange-700" },
                                        full: { label: "Full", color: "bg-error-container text-on-error-container" },
                                    };
                                    const config = statusConfig[rider.status as keyof typeof statusConfig];

                                    return (
                                        <div key={rider.id} className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer group">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl bg-secondary-container overflow-hidden">
                                                    <img src={rider.avatar} alt={rider.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className={cn(
                                                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                                                    rider.status === "idle" ? "bg-green-500" : rider.status === "busy" ? "bg-orange-400" : "bg-error"
                                                )}></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-on-surface">{rider.name}</h4>
                                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold", config.color)}>
                                                        {config.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                                                        <span className="material-symbols-outlined text-[12px]">distance</span>
                                                        {rider.distance}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                                                        <span className="material-symbols-outlined text-[12px]">inventory_2</span>
                                                        {rider.loads} loads
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                                                rider.status !== "full"
                                                    ? "bg-primary-fixed-dim text-white group-hover:bg-primary transition-colors"
                                                    : "bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed"
                                            )}>
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="w-full mt-6 bg-primary-container text-on-primary-container py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-95 transition-all">
                                <span className="material-symbols-outlined">bolt</span>
                                Auto-Assign All
                            </button>
                            <div className="mt-4 bg-tertiary-container/30 p-4 rounded-xl border border-tertiary-container/50">
                                <h5 className="text-tertiary font-bold flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-lg">lightbulb</span>
                                    Efficiency Tip
                                </h5>
                                <p className="text-xs text-on-tertiary-container leading-relaxed">
                                    Orders #KMB-8921 and #KMB-8924 are heading to the same block. Assigning them to <span className="font-bold">Marco Polo</span> could save 12 mins.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}