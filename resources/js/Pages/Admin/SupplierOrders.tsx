import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { StatCard } from "@/Components/Admin/StatCard";
import { StatusBadge } from "@/Components/UI/StatusBadge";
import { SearchBar } from "@/Components/UI/SearchBar";
import { Pagination } from "@/Components/UI/Pagination";
import { ActionButton } from "@/Components/UI/ActionButton";

import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import {
    HiOutlineCheckCircle,
    HiOutlinePlusCircle,
    HiOutlineDownload,
    HiOutlineFilter,
    HiUpload,
} from "react-icons/hi";
import { RiDraftLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { FaBox } from "react-icons/fa6";
import {
    MdLocalFlorist,
    MdOutlineAgriculture,
    MdOutlinePendingActions,
} from "react-icons/md";
import { IoIceCreamOutline } from "react-icons/io5";

// Mock data
const mockOrders = [
    {
        id: "1",
        poNumber: "PO-2024-089",
        supplier: {
            name: "Golden Valley Dairy",
            type: "Fresh Whole Milk & Cream",
            icon: MdOutlineAgriculture,
        },
        date: "Oct 24, 2023",
        totalAmount: 1240.5,
        status: "partial" as const,
    },
    {
        id: "2",
        poNumber: "PO-2024-090",
        supplier: {
            name: "Artisan Vanilla Co.",
            type: "Madagascar Bean Extracts",
            icon: IoIceCreamOutline,
        },
        date: "Oct 25, 2023",
        totalAmount: 450.0,
        status: "draft" as const,
    },
    {
        id: "3",
        poNumber: "PO-2024-085",
        supplier: {
            name: "Sweet Roots Organic",
            type: "Cane Sugar & Natural Syrups",
            icon: MdLocalFlorist,
        },
        date: "Oct 20, 2023",
        totalAmount: 890.0,
        status: "sent" as const,
    },
    {
        id: "4",
        poNumber: "PO-2024-080",
        supplier: {
            name: "Eco-Pack Solutions",
            type: "Biodegradable Cups & Straws",
            icon: FaBox,
        },
        date: "Oct 15, 2023",
        totalAmount: 2100.25,
        status: "fulfilled" as const,
    },
];

const stats = [
    {
        title: "Drafts",
        value: "08",
        icon: RiDraftLine,
        color: "primary" as const,
    },
    {
        title: "Sent",
        value: "14",
        icon: IoIosSend,
        color: "secondary" as const,
    },
    {
        title: "Partial",
        value: "03",
        icon: MdOutlinePendingActions,
        color: "tertiary" as const,
    },
    {
        title: "Fulfilled",
        value: "82",
        icon: HiOutlineCheckCircle,
        color: "primary" as const,
    },
];

const featuredSupplier = {
    name: "Golden Valley Dairy Collective",
    description:
        "Our primary source for organic A2 milk. Known for their regenerative farming practices and the highest butterfat content in the region.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsWwO5yMUNM5xeIYUl4YaXWVFlK3wNx-wwijrHpHx4IHUv-9Va6MKDfvNGMbjVPizfGJ4GaAWygDk_WVbKnP2LZQYa0NorHsPGVg6VyUpvlt-9-4lFAGjBF9ecznndDAIPeQtpuVSMZunx-iLwNblGGoQ_9yopIK0OAqd-azC_2egz5YTQDYVUSSdHFZx5uKXelG8ucC5rY54jLab0xjiJ3wUbtel6xYJD5sTz1j4kA5VIP9tEs0xwQcTnkiMyeZA_nkKkYfBBo4i3",
};

export default function SupplierOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredOrders = mockOrders.filter(
        (order) =>
            order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.supplier.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Head title="Supplier Orders - Admin" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
                                Supplier Orders
                            </h2>
                            <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
                                Manage your artisanal supply chain. From
                                farm-fresh dairy to premium flavorings, track
                                every batch through its journey to the Bar.
                            </p>
                        </div>
                        <ActionButton
                            icon={HiOutlinePlusCircle}
                            label="Create New PO"
                            variant="primary"
                            size="lg"
                        />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} {...stat} />
                        ))}
                    </div>

                    {/* Purchase Orders Table */}
                    <div className="bg-surface-container-highest/30 rounded-3xl p-1 overflow-hidden">
                        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden">
                            <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low/50">
                                <h3 className="text-lg md:text-xl font-headline font-bold">
                                    Active Purchase Orders
                                </h3>
                                <div className="flex gap-2">
                                    <ActionButton
                                        icon={HiOutlineFilter}
                                        label="Filter"
                                        variant="secondary"
                                        size="sm"
                                    />
                                    <ActionButton
                                        icon={HiUpload}
                                        label="Export"
                                        variant="secondary"
                                        size="sm"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container-low/30">
                                            <th className="px-4 md:px-6 py-4 text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">
                                                PO#
                                            </th>
                                            <th className="px-4 md:px-6 py-4 text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">
                                                Supplier
                                            </th>
                                            <th className="px-4 md:px-6 py-4 text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">
                                                Date
                                            </th>
                                            <th className="px-4 md:px-6 py-4 text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest text-right">
                                                Total Amount
                                            </th>
                                            <th className="px-4 md:px-6 py-4 text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest text-center">
                                                Status
                                            </th>
                                            <th className="px-4 md:px-6 py-4 text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-container">
                                        {paginatedOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="hover:bg-surface-container-low/50 transition-colors group"
                                            >
                                                <td className="px-4 md:px-6 py-5 font-bold text-primary">
                                                    {order.poNumber}
                                                </td>
                                                <td className="px-4 md:px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                                                            <order.supplier.icon className="text-primary text-xl" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-on-surface">
                                                                {
                                                                    order
                                                                        .supplier
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-on-surface-variant">
                                                                {
                                                                    order
                                                                        .supplier
                                                                        .type
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-6 py-5 text-on-surface-variant font-medium">
                                                    {order.date}
                                                </td>
                                                <td className="px-4 md:px-6 py-5 text-right font-bold tabular-nums">
                                                    $
                                                    {order.totalAmount.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="px-4 md:px-6 py-5 text-center">
                                                    <StatusBadge
                                                        status={order.status}
                                                    />
                                                </td>
                                                <td className="px-4 md:px-6 py-5 text-right">
                                                    <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-surface-variant rounded-full transition-all">
                                                        <span className="material-symbols-outlined">
                                                            more_vert
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 md:p-6 bg-surface-container-low/30 border-t border-surface-container">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(
                                        filteredOrders.length / itemsPerPage
                                    )}
                                    totalItems={filteredOrders.length}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Supplier Card */}
                    <div className="relative rounded-3xl overflow-hidden min-h-[350px] md:min-h-[400px] flex flex-col md:flex-row shadow-2xl">
                        <div className="md:w-1/2 relative">
                            <img
                                src={featuredSupplier.image}
                                alt="Supplier farm"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/10 md:to-transparent"></div>
                        </div>
                        <div className="md:w-1/2 bg-surface-container-lowest p-6 md:p-12 md:p-16 flex flex-col justify-center">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                                Preferred Partner
                            </span>
                            <h3 className="text-2xl md:text-4xl font-headline font-black text-on-surface mb-4 md:mb-6 leading-tight">
                                {featuredSupplier.name}
                            </h3>
                            <p className="text-sm md:text-lg text-on-surface-variant mb-6 md:mb-8 leading-relaxed">
                                {featuredSupplier.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <ActionButton
                                    icon={MdOutlineAgriculture}
                                    label="View Supplier Profile"
                                    variant="secondary"
                                />
                                <ActionButton
                                    icon={HiOutlinePlusCircle}
                                    label="Quick Order Milk"
                                    variant="outline"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
