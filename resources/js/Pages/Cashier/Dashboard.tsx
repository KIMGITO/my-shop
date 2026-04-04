import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    HiOutlineShoppingBag,
    HiOutlineDevicePhoneMobile,
    HiOutlineBanknotes,
} from "react-icons/hi2";
import PopularItemCard from "@/Components/Cashier/PolularItemCard";
import SalesChart from "@/Components/Cashier/SaleChart";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { StatCard } from "@/Components/Cashier/StatsCard";
import { HiCash } from "react-icons/hi";
import { useNavStore } from "@/Stores/useNavStore";
import { cashierNav } from "@/Data/Links/NavLinks";

export default function CashierDashboard() {
    const stats = [
        {
            label: "TOTAL SALES",
            value: "KSh 42,580",
            icon: HiCash,
            trend: { value: 12.4, direction: "up" as const },
        },
        { label: "TOTAL ORDERS", value: "156", icon: HiOutlineShoppingBag },
        {
            label: "M-PESA SALES",
            value: "KSh 31,940",
            icon: HiOutlineDevicePhoneMobile,
            iconColor: "text-tertiary",
        },
        {
            label: "CASH SALES",
            value: "KSh 10,640",
            icon: HiOutlineBanknotes,
            iconColor: "text-outline",
        },
    ];

    const setItems = useNavStore((state) => state.setItems);

    useEffect(() => {
        setItems(cashierNav);
    }, []);

    const chartData = [40, 65, 95, 75, 55, 85, 45];
    const chartLabels = [
        "8 AM",
        "10 AM",
        "12 PM",
        "2 PM",
        "4 PM",
        "6 PM",
        "8 PM",
    ];

    return (
        <>
            <Head title="Dashboard - Cashier" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8">
                    <header className="mb-8 md:mb-10">
                        <h1 className="text-3xl md:text-4xl font-play font-extrabold tracking-tight text-on-surface mb-2">
                            Daily Sales Summary
                        </h1>
                        <p className="text-on-surface-variant flex items-center gap-2 text-sm md:text-base">
                            <span className="material-symbols-outlined text-sm">
                                calendar_today
                            </span>
                            Today,{" "}
                            {new Date().toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="lg:col-span-2">
                            <SalesChart data={chartData} labels={chartLabels} />
                        </div>
                        <PopularItemCard
                            title="Artisan Milkshakes"
                            description="Our milkshake category drove KSh 14,200 in revenue today."
                            revenue="KSh 14,200"
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCbeBkKyhHRPv4zat36r3M-UMhlWc2ALBdjHmXsrKdaCB_k0AnqtoHGuj_BH0QvY-81VlYfddYIJr4dZi-2pUWoeved2U1hv89OXSBdsVPOq2k6uOksInEQIzmVceMeldC0-YTKx2cijlXMQFPMaOtwneIUoAWCRedqeFvpthyHQiqyV2VaNfPt75CtDD5SwAOqEivClnbZtiijW-PDfvyZq18dM5mPbLR9hwlqyVZAapUctHs0RNWHIfudCeQtV4JWVKPv__Bwe9B2"
                            linkTo="/cashier/catalog"
                            icon={HiOutlineShoppingBag}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
