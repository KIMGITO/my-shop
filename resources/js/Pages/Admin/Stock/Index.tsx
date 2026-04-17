import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { StatCard } from "@/Components/Admin/StatCard";
import { StatusBadge } from "@/Components/UI/StatusBadge";
import { Pagination } from "@/Components/UI/Pagination";
import { ActionButton } from "@/Components/UI/ActionButton";
import {
    HiOutlineQrCode,
    HiOutlineDocumentText,
    HiOutlineCube,
    HiPlus,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { FaFilter } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import { StockIntakeModal } from "./StockIntakeModal";

// Mock data
const mockBatches = [
    {
        id: "1",
        batchNumber: "#BCH-90210",
        product: {
            name: "Organic Whole Milk",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCI8k37Uy3xFtS7NwTUp_IKKnKBCxheew2oBevqEny7Y4xZsulcrFrUpC6-RC4fq3cuqkfgwvCZdbq4pf69CRRDWJqXLlxlqFbz0uwGfJ2E51zb91s99j0iAMBebTJodshCrLkkNMLbl3ZTbycpVuR8zFUhFD04KbzkFwLZd5Jg1f31HZhqRhnTKzLwpVNtyV3MzzZ55SWZIe6aOYStNjnIRwWYi5uqLYWd_p5xu5P4cr5DcfeeEL19ACM8A7lLYjlVFrpVd-cUdvE",
        },
        receiveDate: "Oct 24, 2023",
        expiryDate: "Nov 05, 2023",
        initialQty: "1,200 L",
        remainingQty: "840 L",
        status: "active" as const,
    },
    {
        id: "2",
        batchNumber: "#BCH-88432",
        product: {
            name: "Artisan Heavy Cream",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbaq7AGp4vp-3vMNPZOxAvXXzCnkLjP6OKPu3tgtscJDlLsMAfKDw_4Y6Pd002_lZCxH1Z6vXZeepzkUmdg5FQrSvcsXOoXwu9UbYph2C_O8o43VGRpn576RF9DR9cWDd5BGj_-C6UlKrrtCLR4KbIJA4SC9HHlodJvuusV4UEk4EISGcYAQ0poRTgBtnDdW8esLSEdDvfpwmpRFlI9J46eb922Ur4g2YCqheoaXpB6hi-IU2ZIogS2YNTCkZzW_tVU7W5W8jWLiCq",
        },
        receiveDate: "Oct 20, 2023",
        expiryDate: "Oct 27, 2023",
        initialQty: "500 L",
        remainingQty: "120 L",
        status: "expiring_soon" as const,
    },
    {
        id: "3",
        batchNumber: "#BCH-77129",
        product: {
            name: "Vanilla Oat Milk",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcTPtzLxBl7Pr-3P53knjaRQnV9WGMQn_rBYgfu-9rngrVNM0IBvUYIW0VsEX7of4RgBtXZfTQ2SK_NMTfh7b_hE7G-rCfs1C082HKgbdVGJ8Jj5dSmbqp9cHPQkgKjxw6fhbemht36H6qkhxw-PHMNufbrZ-s-K7ZIyKsJ42hKviPgr1ll9Oqy20XvqShHB9uOSyOMur1iXjpowtBshHfhOHg9bpTg9MzmVE-pS72Evvt4_wamgxg8nH77jHE1OsxC5vTe3WP3-iO",
        },
        receiveDate: "Oct 15, 2023",
        expiryDate: "Nov 02, 2023",
        initialQty: "2,000 L",
        remainingQty: "0 L",
        status: "depleted" as const,
    },
    {
        id: "4",
        batchNumber: "#BCH-66102",
        product: {
            name: "Low-Fat 2% Milk",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA48JuehePHzgOJosYXOtZtN3EmWEtUajabFRkSJnI8w0GlwFwv6_PKVBbFhamjp-WdW-Uti2kr6ilEZQuAIXESu93AIFGpgOcZQK0WwKrBrWdxKqnQ33H6TrS_De3UzoDsNilF3DITxelPuq-GVNZbF0nQCLl-2-V1mS7I3tl3IYsNA6y1KzaK71JIsq0X4pFW-gd4JGwye8KNLVz39eM6rNRKT1XtSo8obuPyc-jn_KC2Wjnz21j-asQ3GYlwZhV-gJRblRJiJzed",
        },
        receiveDate: "Oct 01, 2023",
        expiryDate: "Oct 12, 2023",
        initialQty: "1,000 L",
        remainingQty: "45 L",
        status: "expired" as const,
    },
    {
        id: "5",
        batchNumber: "#BCH-90455",
        product: {
            name: "Fresh Cheese Curds",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnzsIw0EbP_vj00_bAgYNwML-CdmZOrYtqaHO7jqXh55t_abWmBv7Tku9EF3eibcyiBLm8ncj6OjUSdYqmiwKCK4zJOq_Zajy8gIZLAJr8cqGXuq-8rX2ZJsYgd9VJ8t9WjAXeSK7_KvjWqq5yeg1OG1JOAdew4qQTUlHollMDLuxWokbXJtguH8NlobOZJE9IkyJnp09VkIDb7Eud-TzEm7Gv39CH8gn5dH_4IS2jACFwSzO88fvQHHRPlaevlgGYqsFy2jNGawGQ",
        },
        receiveDate: "Oct 22, 2023",
        expiryDate: "Oct 30, 2023",
        initialQty: "250 kg",
        remainingQty: "190 kg",
        status: "expiring_soon" as const,
    },
];

const stats = [
    {
        title: "Total Active Batches",
        value: "124",
        icon: HiOutlineCube,
        trend: "+12%",
    },
    {
        title: "Nearing Expiry",
        value: "8",
        icon: HiOutlineCube,
        color: "error" as const,
    },
    {
        title: "Daily Thruput",
        value: "4.2k",
        icon: HiOutlineCube,
        color: "secondary" as const,
    },
    {
        title: "Quality Score",
        value: "98.4%",
        icon: HiOutlineCube,
        color: "tertiary" as const,
    },
];

export default function BatchesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
    const itemsPerPage = 5;

    const filteredBatches = mockBatches.filter(
        (batch) =>
            batch.batchNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            batch.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedBatches = filteredBatches.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Head title="Batch Management - Admin" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} {...stat} />
                        ))}
                    </div>

                    {/* Batch Table */}
                    <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/10">
                        <div className="px-6 md:px-8 py-6 border-b border-outline-variant/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-on-surface">
                                    Milk Ledger
                                </h3>
                                <p className="text-on-surface-variant text-sm">
                                    Real-time batch tracking and inventory
                                    lifecycle.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <ActionButton
                                    icon={FaFilter}
                                    label="Filter"
                                    variant="secondary"
                                    size="sm"
                                />
                                <ActionButton
                                    icon={IoMdDownload}
                                    label="Export CSV"
                                    variant="secondary"
                                    size="sm"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto scrollbar-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low/50">
                                        <th className="px-4 md:px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Batch #
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Product
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Receive Date
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Expiry Date
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">
                                            Initial Qty
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">
                                            Remaining Qty
                                        </th>
                                        <th className="px-4 md:px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/5">
                                    {paginatedBatches.map((batch) => (
                                        <tr
                                            key={batch.id}
                                            className="hover:bg-surface-container-low/30 transition-colors group"
                                        >
                                            <td className="px-4 md:px-8 py-5 font-bold text-primary">
                                                {batch.batchNumber}
                                            </td>
                                            <td className="px-4 md:px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-surface-container overflow-hidden">
                                                        <img
                                                            src={
                                                                batch.product
                                                                    .image
                                                            }
                                                            alt={
                                                                batch.product
                                                                    .name
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-medium">
                                                        {batch.product.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-5 text-on-surface-variant">
                                                {batch.receiveDate}
                                            </td>
                                            <td
                                                className={cn(
                                                    "px-4 md:px-6 py-5",
                                                    batch.status ===
                                                        "expiring_soon" &&
                                                        "text-error-dim font-bold",
                                                    batch.status ===
                                                        "expired" &&
                                                        "text-error font-bold"
                                                )}
                                            >
                                                {batch.expiryDate}
                                            </td>
                                            <td className="px-4 md:px-6 py-5 text-right tabular-nums">
                                                {batch.initialQty}
                                            </td>
                                            <td
                                                className={cn(
                                                    "px-4 md:px-6 py-5 text-right tabular-nums font-bold",
                                                    batch.status ===
                                                        "expiring_soon" &&
                                                        "text-error",
                                                    batch.status ===
                                                        "expired" &&
                                                        "text-error"
                                                )}
                                            >
                                                {batch.remainingQty}
                                            </td>
                                            <td className="px-4 md:px-8 py-5">
                                                <StatusBadge
                                                    status={batch.status}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-4 md:px-8 py-4 bg-surface-container-low/20">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(
                                    filteredBatches.length / itemsPerPage
                                )}
                                totalItems={filteredBatches.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>

                    {/* Bottom Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                        <div className="bg-surface-variant/30 p-6 md:p-8 rounded-3xl flex items-center gap-6 border border-outline-variant/10">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl premium-gradient flex items-center justify-center shadow-lg">
                                <HiOutlineQrCode className="text-white text-2xl md:text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-base md:text-lg font-bold">
                                    Mobile Traceability
                                </h4>
                                <p className="text-on-surface-variant text-xs md:text-sm mt-1">
                                    Scan physical batch tags to update
                                    quantities instantly from the factory floor.
                                </p>
                                <button className="mt-3 text-primary font-bold text-xs md:text-sm flex items-center gap-1 hover:underline">
                                    Open Scanner
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-surface-container-high/40 p-6 md:p-8 rounded-3xl flex items-center gap-6 border border-outline-variant/10">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-secondary flex items-center justify-center shadow-lg">
                                <HiOutlineDocumentText className="text-white text-2xl md:text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-base md:text-lg font-bold">
                                    Compliance Reports
                                </h4>
                                <p className="text-on-surface-variant text-xs md:text-sm mt-1">
                                    Generate automated traceability logs for
                                    health inspections and quality audits.
                                </p>
                                <button className="mt-3 text-secondary font-bold text-xs md:text-sm flex items-center gap-1 hover:underline">
                                    View Logs
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for Stock Intake */}
                <StockIntakeModal
                    isOpen={isIntakeModalOpen}
                    onClose={() => setIsIntakeModalOpen(false)}
                />

                <FloatingActionButton
                    disabled={isIntakeModalOpen}
                    action={() => setIsIntakeModalOpen(true)}
                    icon={<HiPlus />}
                />
            </AuthenticatedLayout>
        </>
    );
}
