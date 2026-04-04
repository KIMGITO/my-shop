import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { SettingsSection } from "@/Components/Admin/SettingsSection";
import { cn } from "@/lib/utils";

export default function SystemSettings() {
    const [billingCycle, setBillingCycle] = useState("Weekly (Mondays)");
    const [gracePeriod, setGracePeriod] = useState(3);
    const [lateFees, setLateFees] = useState(true);

    const weekHours = [
        { day: "MON", open: "06:00", close: "18:00", isOpen: true },
        { day: "TUE", open: "06:00", close: "18:00", isOpen: true },
        { day: "WED", open: "06:00", close: "18:00", isOpen: true },
        { day: "THU", open: "06:00", close: "18:00", isOpen: true },
        { day: "FRI", open: "06:00", close: "18:00", isOpen: true },
        { day: "SAT", open: "06:00", close: "18:00", isOpen: true },
        { day: "SUN", open: "", close: "", isOpen: false },
    ];

    return (
        <>
            <Head title="System Settings" />
            <AuthenticatedLayout>
                <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full space-y-12">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-xl bg-surface-container-highest p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 z-10">
                            <span className="inline-block px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full mb-4">
                                Configuration Hub
                            </span>
                            <h3 className="text-4xl lg:text-5xl font-black text-on-surface leading-tight">
                                Fine-tune your{" "}
                                <span className="text-primary-dim">
                                    Milk Bar
                                </span>{" "}
                                operations.
                            </h3>
                            <p className="mt-4 text-on-surface-variant max-w-md text-lg">
                                Adjust billing frequency, delivery logistics,
                                and service windows from one central interface.
                            </p>
                        </div>
                        <div className="relative w-64 h-64 flex-shrink-0">
                            <div className="absolute inset-0 bg-primary-container rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <img
                                alt="Milk bottles"
                                className="w-full h-full object-cover rounded-2xl rotate-3 shadow-2xl"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRqLLBlKFS7JilLYiLw9tr3LpMrXpLyjuIWq0P8BLlaIXy0VJW4yC0VAhqY8jfwOiVjWVQzEuSl5IXPRaJ1e6cB4jCrFcOjMbxIdSqrJjKVo7BACxSHVA_5hLSikfkVWWTzJk61mracD67EnRPkE4laUYGdglReXH22K3y2LdiQVnsfAFp0HqhM7TVpr1FrZvHJRKYKRpTIJeLkyzhk_7TuNiaiue_0llVh3qx4n7K7gFLxfgSppIq7XAMrdddbZ08aGqm8Cya3zHd"
                            />
                        </div>
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Sidebar Navigation */}
                        <nav className="lg:col-span-3 space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-60 px-4">
                                Sections
                            </p>
                            <div className="space-y-1">
                                {[
                                    "Billing Cycle",
                                    "Delivery Rules",
                                    "Store Hours",
                                    "System Alerts",
                                ].map((section) => (
                                    <a
                                        key={section}
                                        href={`#${section
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`}
                                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors font-semibold rounded-xl"
                                    >
                                        <span className="material-symbols-outlined">
                                            {section === "Billing Cycle"
                                                ? "account_balance_wallet"
                                                : section === "Delivery Rules"
                                                ? "local_shipping"
                                                : section === "Store Hours"
                                                ? "schedule"
                                                : "notifications_active"}
                                        </span>
                                        <span>{section}</span>
                                    </a>
                                ))}
                            </div>
                        </nav>

                        {/* Form Content */}
                        <div className="lg:col-span-9 space-y-8">
                            {/* Billing Section */}
                            <SettingsSection
                                title="Billing Configuration"
                                description="Manage how and when customers are charged."
                                icon="payments"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-on-surface-variant ml-1">
                                            Default Billing Cycle
                                        </label>
                                        <select
                                            value={billingCycle}
                                            onChange={(e) =>
                                                setBillingCycle(e.target.value)
                                            }
                                            className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary"
                                        >
                                            <option>Weekly (Mondays)</option>
                                            <option>Bi-Weekly</option>
                                            <option>
                                                Monthly (1st of Month)
                                            </option>
                                            <option>
                                                Immediate (Per Delivery)
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-on-surface-variant ml-1">
                                            Grace Period (Days)
                                        </label>
                                        <input
                                            type="number"
                                            value={gracePeriod}
                                            onChange={(e) =>
                                                setGracePeriod(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
                                        <div className="flex-1">
                                            <p className="font-bold text-on-surface">
                                                Automatic Late Fees
                                            </p>
                                            <p className="text-xs text-on-surface-variant">
                                                Apply $5.00 fee after grace
                                                period expires.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setLateFees(!lateFees)
                                            }
                                            className={cn(
                                                "relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors",
                                                lateFees
                                                    ? "bg-primary"
                                                    : "bg-surface-container-highest"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "absolute top-1 bg-white w-4 h-4 rounded-full transition-transform",
                                                    lateFees
                                                        ? "right-1"
                                                        : "left-1"
                                                )}
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                            </SettingsSection>

                            {/* Store Hours Section */}
                            <SettingsSection
                                title="Operational Hours"
                                description="Set the time windows for milk prep and delivery."
                                icon="store"
                            >
                                <div className="space-y-4">
                                    {weekHours.map((day, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-xl",
                                                day.isOpen
                                                    ? "bg-surface-container-low border-l-4 border-primary"
                                                    : "bg-surface-container-low opacity-60"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className={cn(
                                                        "font-black w-12",
                                                        day.isOpen
                                                            ? "text-primary"
                                                            : "text-on-surface-variant"
                                                    )}
                                                >
                                                    {day.day}
                                                </span>
                                                {day.isOpen ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="time"
                                                            defaultValue={
                                                                day.open
                                                            }
                                                            className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold"
                                                        />
                                                        <span className="text-on-surface-variant">
                                                            —
                                                        </span>
                                                        <input
                                                            type="time"
                                                            defaultValue={
                                                                day.close
                                                            }
                                                            className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold"
                                                        />
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-bold">
                                                        Facility Closed for
                                                        Maintenance
                                                    </span>
                                                )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-xs font-bold px-2 py-1 rounded",
                                                    day.isOpen
                                                        ? "bg-primary-container/20 text-primary"
                                                        : "bg-surface-container-high text-on-surface-variant"
                                                )}
                                            >
                                                {day.isOpen ? "OPEN" : "CLOSED"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SettingsSection>

                            {/* Save Actions */}
                            <div className="flex justify-end items-center gap-4 pt-4 pb-20">
                                <button className="px-8 py-4 text-on-surface-variant font-bold hover:bg-surface-container-high rounded-xl transition-all">
                                    Discard Changes
                                </button>
                                <button className="editorial-gradient px-12 py-4 text-on-primary-container font-black text-lg rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center gap-3">
                                    <span className="material-symbols-outlined">
                                        save
                                    </span>{" "}
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
