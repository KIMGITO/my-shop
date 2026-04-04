import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { RiderCard } from "@/Components/Dispatch/RiderCard";
import { SearchBar } from "@/Components/UI/SearchBar";
import { FilterChip } from "@/Components/UI/FilterChip";
import { ActionButton } from "@/Components/UI/ActionButton";
import { HiOutlinePlus } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const mockRiders = [
    {
        id: "1",
        name: "Marcus Thorne",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzLT6IbgU5iYrkzhDa7chr-cOGDdthQF8rFj2w6XmiV5VQQ7r-fasaFiTSiJ_ZLwzjGRXHFkrdnhZtlNtCrhykdD20VE6lpwZNBVjrZTsDWqbnoYEq66AVD-ZqjNWXD0UC_LbvGacQfLkjAQyMqpLBbuGVvRpCSc6Mj5Bg2oCJ1-WB323qj6ZiHyxWP_KRNW2Gaub1nJULwJaP-yDhp1x8PMtKaY4fnYlpg_l9Em_aUkE3OOtdLNq3QIy38cUmeljf8z_avzmiPl1t",
        status: "online" as const,
        rating: 4.9,
        trips: 1240,
        joinDate: "Oct '22",
        vehicle: "electric",
        riderId: "KK-402",
    },
    {
        id: "2",
        name: "Elena Rodriguez",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNcIMR5lTdDtZRMky71d3L7WfDbDcGYPRRYR0S4e97dhjtlWz8Mndtdf-x2clYm75gSdhyp4WiMbDY42QxqGM_F0bpUyRIX7eIKMKe7XVpLqxHlLvRuMNGgBsJ_uWuSHvGD1XlGZkC0dthB2o-UhGIrM1nGElyrg5jDsH_qItdC7k0z6f4Tue4rVjGdfSiPZbGZz4aTO70A0yskqV6IUGGaWtdiidYDFdxx3t9SRIKt0SK4ef3xFRQrQRWTMLA9cp0WsA7NcowGqSr",
        status: "on_break" as const,
        rating: 5.0,
        trips: 892,
        joinDate: "Jan '23",
        vehicle: "bike",
        riderId: "KK-115",
    },
    {
        id: "3",
        name: "Jameson Wu",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8FYRk_c2QTYz3ii0ZxdpTKiDjsPvcHITGCMnkKo0y4DnWr5pupUcaGK0EXVjviVacRIY7IvSKMLp57wONJiekHuCrYSgiHbUOwddI_WRxAKnF3zmp7PdcgGxM0KLrgrq9yBRoNt3YffhbDgAhvIi2lzwyKr2upGMPpwjWtM8dWuV2n_TuO6tn1dfkjtu6YHveTueP-IUtF1ITZ_QbfG-ye8Xwqj2IDP8qtnutxnCuhjiKVbxqp3LU8aAHXmOwAk4-_KUx9DHgtmni",
        status: "offline" as const,
        rating: 4.7,
        trips: 2410,
        joinDate: "Jun '21",
        vehicle: "electric",
        riderId: "KK-290",
    },
    {
        id: "4",
        name: "Devon Lane",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2G-ZguiNBqxig2WHPS1PcWIfWDcv7GzE0Pp-i75ep-VOodnKQURTBuJ9ljktMxZbuz8mq_GjbqVm8CRrfmuiuZSP0B-o_JmESP7uhx8Q0Z_rmYKdjcLrC09JcaVAm5nyuLpLIvtk19hbvrTV-jyiIPjXJ7-DEccNmOKtYK2_3sp5Wb6wCeNrZlNnJSkq5fijE8KPNnWNrNiQhAwULMSxI5oAbjXSsEN6G_aaZuheIs9u-ufOGWtXm-wXsQC7dYOLrwpPKnfFD-lvY",
        status: "online" as const,
        rating: 4.8,
        trips: 542,
        joinDate: "Feb '24",
        vehicle: "motorcycle",
        riderId: "KK-332",
    },
];

const filters = [
    "All Riders",
    "Online",
    "On Break",
    "Offline",
    "Electric Bike",
];

export default function RidersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All Riders");

    const getStatusFromFilter = (filter: string) => {
        if (filter === "Online") return "online";
        if (filter === "On Break") return "on_break";
        if (filter === "Offline") return "offline";
        return null;
    };

    const filteredRiders = mockRiders.filter((rider) => {
        const matchesSearch = rider.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesFilter =
            activeFilter === "All Riders" ||
            (activeFilter === "Electric Bike" &&
                rider.vehicle === "electric") ||
            getStatusFromFilter(activeFilter) === rider.status;
        return matchesSearch && matchesFilter;
    });

    const stats = [
        { label: "Active Now", value: "24" },
        { label: "On Break", value: "08" },
        { label: "Pending Tasks", value: "12" },
        { label: "Avg Rating", value: "4.9" },
    ];

    return (
        <>
            <Head title="Rider Management" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                                Rider Directory
                            </h1>
                            <p className="text-sm text-on-surface-variant mt-1">
                                Manage your artisanal delivery fleet. Track
                                real-time status and optimize logistics.
                            </p>
                        </div>
                        <ActionButton
                            icon={HiOutlinePlus}
                            label="Add New Rider"
                            variant="primary"
                        />
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "p-4 md:p-6 rounded-xl flex flex-col justify-between h-24 md:h-32",
                                    idx === 0
                                        ? "bg-surface-container-highest"
                                        : idx === 1
                                        ? "bg-surface-container"
                                        : idx === 2
                                        ? "bg-tertiary-container"
                                        : "bg-surface-dim"
                                )}
                            >
                                <span className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant">
                                    {stat.label}
                                </span>
                                <span className="text-2xl md:text-3xl font-black font-headline">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Filters and Search */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <FilterChip
                                    key={filter}
                                    label={filter}
                                    active={activeFilter === filter}
                                    onClick={() => setActiveFilter(filter)}
                                />
                            ))}
                        </div>
                        <div className="w-full md:w-80">
                            <SearchBar
                                placeholder="Search riders by name or ID..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
                    </div>

                    {/* Rider Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredRiders.map((rider) => (
                            <RiderCard key={rider.id} rider={rider} />
                        ))}
                        <div className="border-4 border-dashed border-surface-container-high rounded-xl flex flex-col items-center justify-center p-10 hover:border-primary-fixed transition-colors cursor-pointer group h-full min-h-[280px]">
                            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container text-3xl">
                                    person_add
                                </span>
                            </div>
                            <p className="font-bold text-on-surface">
                                Onboard New Rider
                            </p>
                            <p className="text-xs text-on-surface-variant mt-1 text-center">
                                Register profile and assign equipment
                            </p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
