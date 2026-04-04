// import React, { useState } from "react";
// import { Head } from "@inertiajs/react";
// import { SearchBar } from "@/Components/UI/SearchBar";
// import { FilterChip } from "@/Components/UI/FilterChip";
// import { Pagination } from "@/Components/UI/Pagination";
// import { ActionButton } from "@/Components/UI/ActionButton";
// import { StatusBadge } from "@/Components/UI/StatusBadge";
// import { cn } from "@/Utils/helpers"; // Changed from "@/lib/utils" to "@/Utils/helpers"
// import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
// import { HiOutlineClock, HiOutlineFilter, HiUsers } from "react-icons/hi";
// import { HiArrowTrendingUp } from "react-icons/hi2";
// import { FaDownload } from "react-icons/fa";

import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { ActionButton } from "@/Components/UI/ActionButton";
import { FilterChip } from "@/Components/UI/FilterChip";
import { Pagination } from "@/Components/UI/Pagination";
import { SearchBar } from "@/Components/UI/SearchBar";
import { StatusBadge } from "@/Components/UI/StatusBadge";
import { cn } from "@/lib/utils";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { HiOutlineClock, HiUsers, HiOutlineFilter } from "react-icons/hi";
import { HiArrowTrendingUp } from "react-icons/hi2";

// Mock data - Fixed with consistent structure
const mockHistory = [
    {
        id: "1",
        date: "Oct 24, 2023",
        time: "14:42:10 PM",
        initiatedBy: { name: "Sarah K.", role: "Admin", initials: "SK" },
        action: "Restock",
        product: {
            name: "Full Cream (A2)",
            sku: "SKU-MK-01",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC63iSuCb6zED9WFxev5AWA1-7XNJrI6T0c4f5XVDZqF9qjI3o210EO8v8Y2OY6OamsGPhaQM-4BqrYfQgMAxUeYsCIZQEMA7lzLWGNqELFH1YUDJSl9TESZrgigu5BIxu3IjnAiaqyJE-9vtKdK0-1yf1BDae-3yYqab9KxK0TS4MF2VoHUHfYJ8NkVkipsgF7qoW_Mqra7luE1UYzchq4ZQKeoAgs6nhcLVSLwfhACetH3nzZzWkxYQEG9ZUjB_HYEm1JvEfipewc",
        },
        magnitude: "+450L",
        newBalance: "1,240L",
    },
    {
        id: "2",
        date: "Oct 24, 2023",
        time: "13:15:04 PM",
        initiatedBy: { name: "Mike J.", role: "Cashier", initials: "MJ" },
        action: "Sale",
        product: {
            name: "Barista Oat",
            sku: "SKU-MK-OAT",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDORv8rILhaW47YmYztFzz1bwYT2fXF6V1sLKHV3f-MXnlqFMWRFXYv8C9tWZKhUEiOKqLL0ZTzrwFoJP0iQnB3KEQM6yNWgymbIM9d-rhIe3_Z6QUGdjCj6duH-Kiqn14pzvZX5DixlBVVfVs0OBMa1M_Q7in8xrg_-dthTp2wXInkojmzdPhacGRYDScjlLoiTfU3Lo6TfzJAr04FzBWeNj-b6I8eYP_8o0JAwjCeylbzWYxyTEPy98Q1iXlyy6v2P_dweiuQVAxR",
        },
        magnitude: "-2.5L",
        newBalance: "84.0L",
    },
    {
        id: "3",
        date: "Oct 24, 2023",
        time: "11:02:55 AM",
        initiatedBy: { name: "Auto-System", role: "Terminal", initials: "SYS" },
        action: "Adjustment",
        product: {
            name: "Skimmed 0%",
            sku: "SKU-MK-03",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsv6ONDE0ufkgGDMfANoMgfTTVzA3qRvkgukgWR_WnwxMPhLabtSOpQmMIDipJ2mMNozjdX8VJIhCSa7GnFgRhqL-fMOvvvaS-k04E_fQAglmR59yzEU2_fuQpOqoVHDqgyHs8Q5kCqrwTSm9Fpb7b8QpdC5XYvK73GV41qi_nL-d2xR1jgKOLfRytPjNyS0P5FeHsggzulNTWmajnd8MstptCFrb7usw4NwlJN7nZGoqltzpzFzNCPm_I6AtQZkseUDwtDOGDIGr",
        },
        magnitude: "-12L",
        newBalance: "192L",
        note: "Spillage reported",
    },
    {
        id: "4",
        date: "Oct 24, 2023",
        time: "09:15:22 AM",
        initiatedBy: { name: "Sarah K.", role: "Admin", initials: "SK" },
        action: "Restock",
        product: {
            name: "Heavy Cream",
            sku: "SKU-MK-CRM",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCLV260OkONC0XHet709n02Qof3U04m7rcj4oKL4HsU2EbaEYQIeztkDx2n7w0MTKvvaYS1kmRkeVR5W9Psl54CTZsw3OpgQaSh-SMsB17bXU_UehSqZ6vlTUibwtywPpoceTve9TNzQXuYNtxXLUKhnUA9_wpZDuMX_uF8QIKRRttksD97lWI79pOccA_FNeyO3HWa1E11jBCMGtTrWdTdTkOlSCcuAZ-1rUdbuilzxxNpNEJD2Qp6v_-Di6pEvCpNlHh58t81eyn",
        },
        magnitude: "+50L",
        newBalance: "115L",
    },
];

const stats = [
    {
        label: "Daily Throughput",
        value: "+1,240 Liters",
        icon: HiArrowTrendingUp,
        color: "primary",
    },
    {
        label: "Adjustments",
        value: "14 Today",
        icon: HiOutlineClock,
        color: "error",
    },
    {
        label: "Active Cashiers",
        value: "6 Shifts",
        icon: HiUsers,
        color: "secondary",
    },
];

const filters = ["All Activities", "Restock", "Sale", "Adjustment"];

export default function StockHistoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All Activities");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredHistory = mockHistory.filter((item) => {
        const matchesSearch =
            item.product?.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.initiatedBy.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesFilter =
            activeFilter === "All Activities" || item.action === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const paginatedHistory = filteredHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusForAction = (action: string) => {
        switch (action) {
            case "Restock":
                return "active";
            case "Sale":
                return "fulfilled";
            case "Adjustment":
                return "expiring_soon";
            default:
                return "active";
        }
    };

    return (
        <>
            <Head title="Stock History - Admin" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div className="space-y-2">
                            <p className="text-primary font-bold tracking-widest text-xs uppercase">
                                Audit Log
                            </p>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-headline font-extrabold text-on-surface tracking-tight">
                                The Milk Ledger
                            </h3>
                            <p className="text-on-surface-variant max-w-md text-sm">
                                Comprehensive chronological record of every
                                inventory movement, adjustment, and sale across
                                all Kaykay's locations.
                            </p>
                        </div>
                        <div className="flex gap-2 md:gap-3">
                            <ActionButton
                                icon={HiOutlineFilter}
                                label="Filters"
                                variant="secondary"
                                size="sm"
                            />
                            <ActionButton
                                icon={FaDownload}
                                label="Export CSV"
                                variant="primary"
                                size="sm"
                            />
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                        <div className="md:col-span-8 bg-surface-container-lowest p-4 md:p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border-l-4 border-primary">
                            {stats.map((stat, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 md:p-3 bg-primary-container/20 rounded-full">
                                            <stat.icon className="text-primary text-xl md:text-2xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm font-label text-on-surface-variant">
                                                {stat.label}
                                            </p>
                                            <p className="text-base md:text-xl font-bold text-on-surface">
                                                {stat.value}
                                            </p>
                                        </div>
                                    </div>
                                    {idx < stats.length - 1 && (
                                        <div className="h-8 md:h-12 w-px bg-outline-variant/30 hidden md:block"></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="md:col-span-4 relative group rounded-2xl overflow-hidden min-h-[100px] md:min-h-[120px]">
                            <img
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzFab_uLllWyK51eR7gVBzQMefeiLaxyU7T231__8KVsDkz36Gjdr16qIOIqLtSA6dgI68sj8_HsJ-KckUZB6fL6lY73au52aOV5x50-rW2-SyR_WfeCS3vu03-3fBWIWsoLQqOA5RkAPnjaDxFOtdh2vYzVf9KzjZ3HyKDOwGZJxRWQUakyUP0JKp6JlmfXf4E7KneqaswCCtZs3mEFoceC3j8Noa4XJTgC0prHVHGauEYPDkVENZjqMZPA-ZVmzxB7hPZCOXS1DF"
                                alt="Fresh milk pouring"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent flex items-end p-3 md:p-4">
                                <p className="text-white font-bold text-[10px] md:text-xs">
                                    System Status: All systems operational. Last
                                    sync 2m ago.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="w-full md:w-80 lg:w-96">
                            <SearchBar
                                placeholder="Search product or user..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
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
                    </div>

                    {/* Audit Table */}
                    <div className="bg-surface-container-lowest rounded-2xl md:rounded-3xl overflow-hidden border border-outline-variant/10">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-surface-container-low text-on-surface-variant font-label text-xs uppercase tracking-[0.15em]">
                                        <th className="px-4 md:px-6 py-3 md:py-4">
                                            Date / Time
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4">
                                            Initiated By
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4">
                                            Action
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4">
                                            Product SKU
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-right">
                                            Magnitude
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-right">
                                            New Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container-low">
                                    {paginatedHistory.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-surface-container-low/30 transition-colors"
                                        >
                                            <td className="px-4 md:px-6 py-4 md:py-5">
                                                <p className="font-bold text-on-surface text-sm">
                                                    {item.date}
                                                </p>
                                                <p className="text-xs text-on-surface-variant">
                                                    {item.time}
                                                </p>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 md:py-5">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">
                                                        {
                                                            item.initiatedBy
                                                                .initials
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-xs md:text-sm font-bold text-on-surface">
                                                            {
                                                                item.initiatedBy
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-[8px] md:text-[10px] text-on-surface-variant uppercase font-bold">
                                                            {
                                                                item.initiatedBy
                                                                    .role
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 md:py-5">
                                                <StatusBadge
                                                    status={getStatusForAction(
                                                        item.action
                                                    )}
                                                    showDot={false}
                                                />
                                            </td>
                                            <td className="px-4 md:px-6 py-4 md:py-5">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-surface p-1 flex-shrink-0">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .image
                                                            }
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            className="w-full h-full object-cover rounded-md"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs md:text-sm font-bold text-on-surface truncate">
                                                            {item.product.name}
                                                        </p>
                                                        <p className="text-[10px] md:text-xs text-on-surface-variant">
                                                            {item.product.sku}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                                <span
                                                    className={cn(
                                                        "font-bold text-sm md:text-lg",
                                                        item.magnitude.startsWith(
                                                            "+"
                                                        )
                                                            ? "text-primary"
                                                            : "text-error"
                                                    )}
                                                >
                                                    {item.magnitude}
                                                </span>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                                                <p className="font-bold text-on-surface text-sm md:text-base">
                                                    {item.newBalance}
                                                </p>
                                                {item.note && (
                                                    <span
                                                        className="material-symbols-outlined text-sm text-error"
                                                        title={item.note}
                                                    >
                                                        warning
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredHistory.length > itemsPerPage && (
                            <div className="px-4 md:px-6 py-4 bg-surface-container-low/20">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(
                                        filteredHistory.length / itemsPerPage
                                    )}
                                    totalItems={filteredHistory.length}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
                        <div className="bg-surface-container-high/40 p-4 md:p-6 rounded-2xl border-l-2 border-outline-variant">
                            <p className="text-[10px] md:text-xs uppercase font-bold mb-2 tracking-widest opacity-60">
                                Manager's Note
                            </p>
                            <p className="text-xs md:text-sm leading-relaxed text-on-surface-variant">
                                "Stock adjustments exceeding 10L require a
                                mandatory digital signature and secondary
                                verification. All spillages must be logged
                                within 15 minutes of occurrence."
                            </p>
                        </div>
                        <div className="bg-tertiary-container/10 p-4 md:p-6 rounded-2xl flex items-start gap-3 md:gap-4">
                            <span className="material-symbols-outlined text-tertiary text-2xl md:text-3xl">
                                inventory
                            </span>
                            <div>
                                <h4 className="font-bold text-on-surface text-sm md:text-base">
                                    Inventory Health
                                </h4>
                                <p className="text-xs md:text-sm text-on-surface-variant mb-3 md:mb-4">
                                    Stock discrepancies have decreased by 12%
                                    since implementing the automated dairy
                                    sensor system.
                                </p>
                                <a
                                    href="#"
                                    className="text-primary font-bold text-xs md:text-sm underline underline-offset-4 hover:text-primary-dim transition-colors"
                                >
                                    View Integrity Report →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
