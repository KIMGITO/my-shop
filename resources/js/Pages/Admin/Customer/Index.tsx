import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { StatCard } from "@/Components/Admin/StatCard";
import { StatusBadge } from "@/Components/UI/StatusBadge";
import { Pagination } from "@/Components/UI/Pagination";
import { ActionButton } from "@/Components/UI/ActionButton";
import {
    HiOutlineUsers,
    HiOutlineShoppingBag,
    HiOutlineCreditCard,
    HiOutlineStar,
    HiPlus,
    HiOutlinePhone,
    HiOutlineMail,
    HiOutlineUserGroup,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { FaFilter } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import { CustomerModal } from "./CustomerModal";

// Types (expand as needed)
interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    balance: number;
    loyalty_points: number;
    customer_type: "retail" | "wholesale" | "distributor";
    customer_group?: string;
    priority: "low" | "medium" | "high";
    is_active: boolean;
    last_transaction_at: string | null;
    next_transaction_at: string | null;
    user?: {
        name: string;
        email: string;
        phone: string;
        addresses?: Array<{ city: string; address_line1: string }>;
    };
    notes?: string;
}

// Mock data (replace with actual props)
const mockCustomers: Customer[] = [
    {
        id: "1",
        name: "Fresh Farms Dairy",
        phone: "+1 (555) 230-7890",
        email: "orders@freshfarms.com",
        balance: 1250.0,
        loyalty_points: 3450,
        customer_type: "wholesale",
        priority: "high",
        is_active: true,
        last_transaction_at: "2024-10-28",
        next_transaction_at: "2024-11-05",
        user: {
            name: "Fresh Farms Dairy",
            email: "orders@freshfarms.com",
            phone: "+1 (555) 230-7890",
            addresses: [{ city: "Chicago", address_line1: "123 Industrial Dr" }],
        },
    },
    {
        id: "2",
        name: "Green Grocers Market",
        phone: "+1 (555) 341-5678",
        email: "buying@greengrocers.com",
        balance: -245.5,
        loyalty_points: 1280,
        customer_type: "retail",
        priority: "medium",
        is_active: true,
        last_transaction_at: "2024-10-25",
        next_transaction_at: null,
    },
    {
        id: "3",
        name: "Maria's Corner Store",
        phone: "+1 (555) 892-3456",
        email: "maria@cornerstore.com",
        balance: 0,
        loyalty_points: 560,
        customer_type: "retail",
        priority: "low",
        is_active: false,
        last_transaction_at: "2024-09-15",
        next_transaction_at: null,
    },
    {
        id: "4",
        name: "Mega Food Distributors",
        phone: "+1 (555) 456-1234",
        email: "procurement@megafood.com",
        balance: 5420.75,
        loyalty_points: 8900,
        customer_type: "distributor",
        priority: "high",
        is_active: true,
        last_transaction_at: "2024-10-30",
        next_transaction_at: "2024-11-10",
    },
    {
        id: "5",
        name: "Downtown Deli",
        phone: "+1 (555) 678-9012",
        email: "owner@downtowndeli.com",
        balance: 89.99,
        loyalty_points: 210,
        customer_type: "retail",
        priority: "medium",
        is_active: true,
        last_transaction_at: "2024-10-22",
        next_transaction_at: null,
    },
];

const stats = [
    {
        title: "Total Customers",
        value: "243",
        icon: HiOutlineUsers,
        trend: "+8%",
    },
    {
        title: "Active Wholesale",
        value: "42",
        icon: HiOutlineUserGroup,
        color: "secondary" as const,
    },
    {
        title: "Outstanding Credit",
        value: "$12,450",
        icon: HiOutlineCreditCard,
        color: "error" as const,
    },
    {
        title: "Loyalty Members",
        value: "187",
        icon: HiOutlineStar,
        color: "tertiary" as const,
    },
];

export default function CustomersPage({ customers, isModalOpen = false }: { customers?: Customer[], isModalOpen?: boolean }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(isModalOpen);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const itemsPerPage = 5;

    // Use provided customers or mock data
    const customerData = customers || mockCustomers;

    // Helper for balance styling
    const getBalanceClass = (balance: number) => {
        if (balance > 0) return "text-success font-bold";
        if (balance < 0) return "text-error font-bold";
        return "text-on-surface-variant";
    };

    // Filter customers
    const filteredCustomers = customerData.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery) ||
            (customer.customer_type && customer.customer_type.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRowClick = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsCustomerModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCustomerModalOpen(false);
        setSelectedCustomer(null);
    };

    return (
        <>
            <Head title="Customer Management - Admin" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} {...stat} />
                        ))}
                    </div>

                    {/* Customer Table */}
                    <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/10">
                        <div className="px-6 md:px-8 py-6 border-b border-outline-variant/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-on-surface">
                                    Customer Registry
                                </h3>
                                <p className="text-on-surface-variant text-sm">
                                    Manage customer profiles, credit balances, and transaction history.
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
                                            Customer
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Contact
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Type
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">
                                            Balance
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">
                                            Loyalty Points
                                        </th>
                                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Last Transaction
                                        </th>
                                        <th className="px-4 md:px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/5">
                                    {paginatedCustomers.map((customer) => (
                                        <tr key={customer.id}
                                            onClick={() => handleRowClick(customer)}
                                            className="hover:bg-surface-container-low/30 transition-colors cursor-pointer group"
                                        >
                                            <td className="px-4 md:px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-primary">
                                                        {customer.name}
                                                    </span>
                                                    <span className="text-xs text-on-surface-variant">
                                                        ID: {customer.id}
                                                    </span>
                                                </div>
                                             </td>
                                            <td className="px-4 md:px-6 py-5">
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                                                        <HiOutlinePhone className="w-3.5 h-3.5" />
                                                        <span>{customer.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                                                        <HiOutlineMail className="w-3.5 h-3.5" />
                                                        <span className="truncate max-w-[150px]">{customer.email}</span>
                                                    </div>
                                                </div>
                                             </td>
                                            <td className="px-4 md:px-6 py-5">
                                                <StatusBadge 
                                                    status={customer.customer_type as any} 
                                                    customLabels={{
                                                        retail: "Retail",
                                                        wholesale: "Wholesale",
                                                        distributor: "Distributor"
                                                    }}
                                                />
                                             </td>
                                            <td className={cn("px-4 md:px-6 py-5 text-right tabular-nums", getBalanceClass(customer.balance))}>
                                                ${customer.balance.toFixed(2)}
                                             </td>
                                            <td className="px-4 md:px-6 py-5 text-right tabular-nums text-warning font-semibold">
                                                {customer.loyalty_points.toLocaleString()}
                                             </td>
                                            <td className="px-4 md:px-6 py-5 text-on-surface-variant text-sm">
                                                {customer.last_transaction_at 
                                                    ? new Date(customer.last_transaction_at).toLocaleDateString()
                                                    : "—"}
                                             </td>
                                            <td className="px-4 md:px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        customer.is_active ? "bg-success animate-pulse" : "bg-error"
                                                    )} />
                                                    <span className={customer.is_active ? "text-success" : "text-error"}>
                                                        {customer.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                             </td>
                                             </tr>
                                    ))};
                                    
                                </tbody>
                            </table>
                        </div>

                        <div className="px-4 md:px-8 py-4 bg-surface-container-low/20">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredCustomers.length / itemsPerPage)}
                                totalItems={filteredCustomers.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>

                    {/* Insight Cards for Managers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                        <div className="bg-surface-variant/30 p-6 md:p-8 rounded-3xl flex items-center gap-6 border border-outline-variant/10">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl premium-gradient flex items-center justify-center shadow-lg">
                                <HiOutlineShoppingBag className="text-white text-2xl md:text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-base md:text-lg font-bold">Top Customers by Volume</h4>
                                <p className="text-on-surface-variant text-xs md:text-sm mt-1">
                                    View highest purchasing customers and adjust wholesale pricing tiers.
                                </p>
                                <button className="mt-3 text-primary font-bold text-xs md:text-sm flex items-center gap-1 hover:underline">
                                    View Leaderboard
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-surface-container-high/40 p-6 md:p-8 rounded-3xl flex items-center gap-6 border border-outline-variant/10">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-secondary flex items-center justify-center shadow-lg">
                                <HiOutlineCreditCard className="text-white text-2xl md:text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-base md:text-lg font-bold">Credit & Payment Alerts</h4>
                                <p className="text-on-surface-variant text-xs md:text-sm mt-1">
                                    Monitor overdue balances and set credit limits for wholesale customers.
                                </p>
                                <button className="mt-3 text-secondary font-bold text-xs md:text-sm flex items-center gap-1 hover:underline">
                                    Manage Credits
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Modal (similar to StockIntakeModal) */}
                <CustomerModal
                    isOpen={isCustomerModalOpen}
                    onClose={handleCloseModal}
                    customer={selectedCustomer}
                />

                <FloatingActionButton
                    disabled={isCustomerModalOpen}
                    action={() => {
                        setSelectedCustomer(null);
                        setIsCustomerModalOpen(true);
                    }}
                    icon={<HiPlus />}
                />
            </AuthenticatedLayout>
        </>
    );
}

// Placeholder for CustomerModal component (to be implemented similar to StockIntakeModal)
const CustomerModal: React.FC<{ isOpen: boolean; onClose: () => void; customer: Customer | null }> = ({ isOpen, onClose, customer }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6">
                <h3 className="text-xl font-bold mb-4">{customer ? "Edit Customer" : "Add New Customer"}</h3>
                <p className="text-on-surface-variant mb-6">
                    {customer ? `Editing ${customer.name}` : "Fill in the customer details below."}
                </p>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-surface-variant">Cancel</button>
                    <button className="px-4 py-2 rounded-lg bg-primary text-white">Save</button>
                </div>
            </div>
        </div>
    );
};