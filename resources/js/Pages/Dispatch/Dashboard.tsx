import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { StatCard } from "@/Components/Admin/StatCard";

import { ActivityFeedItem } from "@/Components/Dispatch/ActivityFeedItem";
import { SearchBar } from "@/Components/UI/SearchBar";
import {
    HiArrowTrendingUp,
    HiOutlineTruck,
    HiOutlineUserGroup,
    HiOutlineClock,
} from "react-icons/hi2";
import { PriorityAlert } from "@/Components/Dispatch/PriorityCard";
import { cn } from "@/lib/utils";

const mockAlerts = [
    {
        id: "1",
        type: "critical" as const,
        title: "Delayed Order #8821",
        description: "Traffic bottleneck on West 4th St. 15m delay expected.",
        actionText: "View Details",
    },
    {
        id: "2",
        type: "warning" as const,
        title: "Unassigned Batch",
        description:
            "4 orders ready for pickup at North Depot. No rider nearby.",
        actionText: "Assign Now",
    },
    {
        id: "3",
        type: "info" as const,
        title: "High Demand Area",
        description: "Downtown demand is +40% above typical peak volumes.",
        actionText: "Adjust Fleet",
    },
];

const mockActivities = [
    {
        id: "1",
        orderNumber: "DK-9281",
        rider: "Marcus R.",
        status: "in_progress" as const,
        progress: 75,
        eta: "08 MIN",
        distance: "2.4 miles away from target",
    },
    {
        id: "2",
        orderNumber: "DK-9290",
        rider: "Leo Kim",
        status: "in_progress" as const,
        progress: 35,
        eta: "14 MIN",
        distance: "Out for delivery",
    },
];

const mockRiders = [
    {
        name: "Jordan D.",
        order: "#ORD-492",
        status: "In Transit",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAekgCwBiMf-loR5xdH-pYhPZO0cb3H5WJ9HwRnvZ10alh24kOLlHbty6QlrRRnwKfB8RK6KQ65yWI5B5BgZ9zCExptFSPs_w4HTqQJylPuMWT2o9CQKdPnKwRzscAgNUYr8ycPuhiKz9bGAQjikWbLWkqmET3rm1FF-gA5g-HeXr30ZIxcB6x6oWEcMYMPZsBZ_tG8UhQvZgljCDY7JekcgbzEQwhGnq872VKKCwKu8cqWpXkJ-9jAn16BfezgPWeJQO4QrR53Fdlk",
    },
    {
        name: "Sarah K.",
        order: "#ORD-501",
        status: "Pickup at Depot",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwtO5tRY9LPnHp6H-ymJbzQYuVs0HDB33gAGxnn61ZfaKWPwxk9Wp7OtxIY95BStOgyw6Bg1SzHMScG3QSeX13fzcaeJJDsnxTvmeOTBsVRas31K82usPvWO9DAyf1MdEhcK1GSy3D8_4xBFRS70MYdEX1XUp9Wb6mLgI-TnPzJ1JXMNYg4IUWPNjohwcIPjZgQpeXYjBb5sc46t5CpjTVWALHbZQYNLDs2T7srAgDYu99FD9oZAXOn6RdMbELiQiTu43mpzEOe3kh",
    },
    {
        name: "Marcus T.",
        order: "#ORD-488",
        status: "Completing Order",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxjkkvnLGYNO1wnd7rRjhwn3poLhYvvYoMLDDtG4Ja6g3IYNCp36k8DzLxg-Scy7H5GFeLbU0wLLVs0wwVjB0JFQzigsQUHZG8EGSZSEjUfHIfVLFakeMiZ_Gw3zai42suEapB-yPcpgfuPqG7Ppg05N_FfWo-H56n1M9jBIrLzGTaYbh92CPVprQpeVW5fV5h2MVFe-qTB0W4ZP3PzrNK7ySx1Pi1XBPzLgzM6iDIVDplCgboYnoZP4djS9ceS_fhW-GwF0AAfEm4",
    },
];

export default function DispatchDashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    const stats = [
        {
            title: "Live Fulfillment",
            value: "128",
            icon: HiArrowTrendingUp,
            trend: "+12%",
            color: "primary" as const,
        },
        {
            title: "Avg. Delivery Time",
            value: "22.4m",
            icon: HiOutlineClock,
            color: "primary" as const,
        },
        {
            title: "Active Riders",
            value: "14/18",
            icon: HiOutlineUserGroup,
            color: "secondary" as const,
        },
    ];

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
    const maxValue = Math.max(...chartData);

    return (
        <>
            <Head title="Dispatch Dashboard" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                                Dispatch Dashboard
                            </h1>
                            <p className="text-sm text-on-surface-variant mt-1">
                                Real-time logistics monitoring for artisanal
                                dairy distribution
                            </p>
                        </div>
                        <div className="w-full md:w-80">
                            <SearchBar
                                placeholder="Search orders or riders..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} {...stat} />
                        ))}
                    </div>

                    {/* Priority Alerts */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg md:text-xl font-bold text-on-surface">
                                Priority Alerts
                            </h2>
                            <span className="text-error font-bold text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">
                                    error
                                </span>
                                3 Critical Issues
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {mockAlerts.map((alert) => (
                                <PriorityAlert key={alert.id} alert={alert} />
                            ))}
                        </div>
                    </div>

                    {/* Performance & Riders */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Performance Chart */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg md:text-xl font-bold text-on-surface">
                                    Today's Performance
                                </h2>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 rounded-full bg-surface-container-lowest text-xs font-bold border border-outline-variant">
                                        Hourly
                                    </button>
                                    <button className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold shadow-sm">
                                        Real-time
                                    </button>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest p-4 md:p-6 rounded-2xl shadow-sm">
                                <div className="flex items-end justify-between h-40 gap-2 md:gap-4 px-2 md:px-4">
                                    {chartData.map((value, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 flex flex-col items-center gap-2"
                                        >
                                            <div
                                                className={cn(
                                                    "w-full rounded-t-lg transition-all",
                                                    i === 2
                                                        ? "bg-primary"
                                                        : "bg-surface-container-high group-hover:bg-primary"
                                                )}
                                                style={{
                                                    height: `${
                                                        (value / maxValue) * 100
                                                    }%`,
                                                    minHeight: "20px",
                                                }}
                                            />
                                            <span className="text-[10px] font-bold text-on-surface-variant">
                                                {chartLabels[i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Active Riders */}
                        <div className="space-y-4">
                            <h2 className="text-lg md:text-xl font-bold text-on-surface">
                                Active Riders
                            </h2>
                            <div className="space-y-3">
                                {mockRiders.map((rider, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between shadow-sm hover:translate-x-1 transition-transform"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-surface-container border-2 border-primary-container overflow-hidden">
                                                <img
                                                    src={rider.avatar}
                                                    alt={rider.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-sm">
                                                    {rider.name}
                                                </h5>
                                                <p className="text-[10px] text-primary font-bold">
                                                    {rider.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold">
                                                {rider.order}
                                            </p>
                                            <div className="flex items-center gap-1 justify-end">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                                <span className="text-[10px] opacity-60">
                                                    Live
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 text-xs font-bold text-primary uppercase tracking-widest bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl">
                                View All 18 Riders
                            </button>
                        </div>
                    </div>

                    {/* Live Updates Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg md:text-xl font-bold text-on-surface">
                                Live Updates
                            </h2>
                            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold uppercase tracking-widest">
                                Real-time
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockActivities.map((activity) => (
                                <ActivityFeedItem
                                    key={activity.id}
                                    activity={activity}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
