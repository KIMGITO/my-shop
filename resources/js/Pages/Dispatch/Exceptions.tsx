import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { ExceptionRow } from "@/Components/Dispatch/ExceptionRow";
import { SearchBar } from "@/Components/UI/SearchBar";
import { FilterChip } from "@/Components/UI/FilterChip";
import { ActionButton } from "@/Components/UI/ActionButton";
import { Pagination } from "@/Components/UI/Pagination";
import { FaDownload } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";

const mockExceptions = [
    {
        id: "1",
        orderNumber: "KM-9402",
        customer: "Elena Rodriguez",
        address: "Oakwood Manor, Unit 4B",
        type: "not_home" as const,
        rider: {
            name: "Marcus Chen",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAizuNYSXdBXLIzJI575mPiyxVg5QnBOt807KN4THCSUr-pJmWpKg6z_73hDFghhlq0VaXkRlTLcdK2hm_PgB3xL4xj-danOffij3gPF6fIF7DCaia2p0xuumSWTzOh9TDex80Vb5ofEF-vzwT5QoaDVpB6ySMVR2xlwESXEhts-NN78Ud6pBI9e6OYUJ0qQlRu_3--o8-fUSgNlWNVlHA-lmCccYul-uSZh6NL3dQrfstHFir8P-ICIIYVTwTkxHPgX0nit-WHcNOF",
        },
        status: "pending" as const,
    },
    {
        id: "2",
        orderNumber: "KM-9388",
        customer: "James Sutherland",
        address: "22nd Bakery St.",
        type: "damaged" as const,
        rider: {
            name: "Sarah Jenkins",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkL07Eb9YyHmSuAyvgCHfj_B1E_I33zl1LL4nsiNIo5npCJzHjpximOsJmLcwCioC0X7gC__BGOsIpywM-s8VQnabXwOpGcjh0wYlT8lSA9_B5bZIfb73XZG71Wm0JpeWHbvnOHCirjHuvnOgLcOlt55Z73uif78gt8j4oFqp0NDI_LzeOW6FFKkXpX2dyXHiG8Lf7rd3l5jFNQ4fBPal1PqXDO3Vf9axNirWSl9gxBryxuskbUyxE3JQSK7rs6wmTFR3TDklU7BNP",
        },
        status: "returning" as const,
    },
    {
        id: "3",
        orderNumber: "KM-9375",
        customer: "Leila Aminu",
        address: "Green Park Drive, 12",
        type: "wrong_address" as const,
        rider: {
            name: "David Vane",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLZLPLs0T-6FzDsEqq_jMi2048vIlq4ZQJ1BjDNmn80w9HyiMpBBYVmrjOQkdIaW5_h9EchENBAhIAbGSDVsNPZisIANuVvKoi-KKm_l5Y80ta0v8hdbF0WFNi5GtWwpgKDPT-nDJTv1u5MNEyBWArwuO7IS6MPn34JbTrOLmjIPWzo0fOnsgW8DhUqffM8Isr8g6YaA4SvXVNhxlLZr_kvf1O21jnP3PvGNKeY1MQZI-dezL2PFlHmgMhzKaJsdUsALPkkFDVOnX",
        },
        status: "pending" as const,
    },
];

const filterTabs = ["All Exceptions", "Damaged", "Rescheduled"];

export default function ExceptionsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All Exceptions");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleAction = (id: string, action: string) => {
        console.log(`Action ${action} on exception ${id}`);
    };

    const stats = [
        { label: "Damaged Fresh Inventory", count: "08", type: "critical" },
        { label: "Wrong Address", count: "12" },
        { label: "Not At Home", count: "24" },
        { label: "Refused Order", count: "05" },
    ];

    return (
        <>
            <Head title="Delivery Exceptions" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                                Failed Deliveries
                            </h1>
                            <p className="text-sm text-on-surface-variant mt-1">
                                Active logistics exceptions requiring immediate
                                intervention or re-scheduling.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <ActionButton
                                icon={FaDownload}
                                label="Export Log"
                                variant="secondary"
                                size="sm"
                            />
                            <ActionButton
                                icon={IoIosRefresh}
                                label="Bulk Reschedule"
                                variant="primary"
                                size="sm"
                            />
                        </div>
                    </div>

                    {/* Urgent Alerts Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 bg-error-container/10 border-2 border-error/20 p-5 md:p-6 rounded-2xl relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="bg-error text-on-error px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                        warning
                                    </span>
                                    Immediate Action Required
                                </div>
                                <span className="text-error font-black text-4xl opacity-20">
                                    08
                                </span>
                            </div>
                            <div className="mt-3">
                                <h3 className="text-lg md:text-xl font-bold text-on-error-container">
                                    Damaged Fresh Inventory
                                </h3>
                                <p className="text-xs md:text-sm text-on-error-container/70 mt-1 max-w-md">
                                    Items reported as damaged in transit within
                                    the last hour.
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button className="bg-error text-on-error px-4 py-2 rounded-xl font-bold text-xs hover:bg-error-dim transition-colors">
                                    Process Returns
                                </button>
                                <button className="text-error font-bold text-xs px-3 py-2">
                                    View Details
                                </button>
                            </div>
                        </div>
                        <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl">
                            <h4 className="font-bold text-base mb-3">
                                Exception Triage
                            </h4>
                            <div className="space-y-3">
                                {stats.slice(1).map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center p-2 md:p-3 bg-surface-container rounded-xl"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-primary">
                                                location_off
                                            </span>
                                            <span className="font-bold text-xs md:text-sm">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <span className="font-black text-on-surface">
                                            {stat.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Exception Table */}
                    <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm border border-outline-variant/10">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex flex-wrap gap-2">
                                {filterTabs.map((tab) => (
                                    <FilterChip
                                        key={tab}
                                        label={tab}
                                        active={activeTab === tab}
                                        onClick={() => setActiveTab(tab)}
                                    />
                                ))}
                            </div>
                            <div className="w-full md:w-64">
                                <SearchBar
                                    placeholder="Search exceptions..."
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-3 min-w-[800px]">
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                                            Order ID
                                        </th>
                                        <th className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                                            Customer
                                        </th>
                                        <th className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                                            Exception Type
                                        </th>
                                        <th className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                                            Assigned Rider
                                        </th>
                                        <th className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                                            Status
                                        </th>
                                        <th className="px-4 pb-2 text-right text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockExceptions.map((exception) => (
                                        <ExceptionRow
                                            key={exception.id}
                                            exception={exception}
                                            onAction={handleAction}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 pt-4 border-t border-outline-variant/10">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={5}
                                totalItems={45}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
