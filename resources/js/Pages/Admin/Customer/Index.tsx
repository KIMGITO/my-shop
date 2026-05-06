"use client"

import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { StatCard } from "@/Components/Admin/StatCard";
import { StatusBadge } from "@/Components/UI/StatusBadge";
import { Pagination } from "@/Components/UI/Pagination";
import { ActionButton } from "@/Components/UI/ActionButton";
import {
    HiOutlineUsers,
    HiOutlineCreditCard,
    HiOutlineStar,
    HiPlus,
    HiOutlinePhone,
    HiOutlineUserGroup,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineEye,
    HiOutlineMagnifyingGlass,
    HiOutlineArrowUpTray,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { IoMdDownload } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import { toast } from "sonner";
import { CustomerModal } from "./CustomerModal";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import { Button } from "@/Components/UI/Button";
import { FaRegAddressCard } from "react-icons/fa";

// Aligned with Laravel Customer Model
export interface Customer {
    id: number;
    user_id?: number | null;
    customer_number: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    notes?: string | null;
    balance: number;
    priority: number;
    is_active: boolean;
    last_transaction_at: string | null;
    next_transaction_at: string | null;
    customer_type: string | null;
    customer_group: string | null;
    loyalty_points: number;
    referral_code?: string | null;
    referred_by?: string | null;
    metadata?: any | null;
    user?: {
        name: string;
        email: string;
        phone: string;
    } | null;
}

export default function CustomersPage({ customers = [], errors }: { customers?: Customer[], errors?: any }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            toast.error("Failed to process customer data.");
        }
    }, [errors]);

    const getPriorityLabel = (priority: number) => {
        if (priority >= 10) return { label: "VIP", class: "bg-purple-100 text-purple-700" };
        if (priority >= 5) return { label: "High", class: "bg-orange-100 text-orange-700" };
        return { label: "Standard", class: "bg-slate-100 text-slate-600" };
    };

    const filteredCustomers = customers.filter((c) =>
        (c.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (c.phone || "").includes(searchQuery)
    );

    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsCustomerModalOpen(true);
    };

    return (
        <>
            <Head title="Admin | Customer Management" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8 space-y-6">
                    
                    {/* Admin Actions Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest p-4 rounded-3xl border border-outline-variant/10">
                        <div className="w-full md:w-1/3 relative">
                            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Filter Registry..."
                                className="w-full pl-12 pr-4 py-2.5 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <ActionButton icon={HiOutlineArrowUpTray} label="Import" variant="secondary"  />
                            <ActionButton icon={IoMdDownload} label="Export" variant="secondary"  />
                            
                        </div>
                    </div>

                    {/* Registry Table */}
                    <div className="bg-surface-container-lowest rounded-[2rem] shadow-sm border border-outline-variant/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low/50 text-on-surface-variant text-[11px] uppercase tracking-[0.15em] font-bold">
                                        <th className="px-6 py-4">Customer Details</th>
                                        <th className="px-4 py-4">Group/Type</th>
                                        <th className="px-4 py-4 text-right">Balance</th>
                                        <th className="px-4 py-4 text-center">Loyalty</th>
                                        <th className="px-4 py-4 text-center">Priority</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/5">
                                    {paginatedCustomers.map((customer) => {
                                        const priority = getPriorityLabel(customer.priority);
                                        return (
                                            <tr key={customer.id} className="hover:bg-primary/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                                                            {customer.name?.charAt(0) || "U"}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-on-surface leading-tight">
                                                                {customer.name || customer.user?.name || "Unnamed"}
                                                            </span>
                                                            <span className="text-xs text-on-surface-variant flex items-center gap-1">
                                                                <HiOutlinePhone className="w-3 h-3" /> {customer.phone || "No Phone"}
                                                            </span>
                                                            <span className="text-xs text-on-surface-variant flex items-center gap-1">
                                                                <FaRegAddressCard className="w-3 h-3" /> {customer.customer_number || "Undefined"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">{customer.customer_group || "General"}</span>
                                                        <span className="text-[10px] text-on-surface-variant uppercase">{customer.customer_type || "Retail"}</span>
                                                    </div>
                                                </td>
                                                <td className={cn(
                                                    "px-4 py-4 text-right font-mono font-bold text-sm",
                                                    customer.balance > 0 ? "text-error" : "text-success"
                                                )}>
                                                    {customer.balance > 0 ? `+${customer.balance}` : customer.balance}{' ksh'}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning-700 rounded-lg text-xs font-bold">
                                                        <HiOutlineStar className="w-3 h-3" />
                                                        {customer.loyalty_points}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", priority.class)}>
                                                        {priority.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleEdit(customer)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                                                            <HiOutlinePencilSquare className="w-5 h-5" />
                                                        </button>
                                                        <Button className=" p-1  hover:bg-secondary/30  rounded-lg transition-colors" variant="ghost" onClick={()=>{router.get(`/admin/customers/${customer.id}`)}}>
                                                            <HiOutlineEye className="w-5 h-5" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 border-t border-outline-variant/5">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={100}
                                itemsPerPage={10}
                                totalPages={Math.ceil(filteredCustomers.length / itemsPerPage)}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
                <FloatingActionButton disabled={isCustomerModalOpen} action={ () =>{ setSelectedCustomer(null); setIsCustomerModalOpen(true);}} />

                <CustomerModal
                    isOpen={isCustomerModalOpen}
                    onClose={() => setIsCustomerModalOpen(false)}
                    customer={selectedCustomer}
                />
            </AuthenticatedLayout>
        </>
    );
}

