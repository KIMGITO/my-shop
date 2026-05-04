"use client"

import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { 
    HiOutlinePhone, 
    HiOutlineEnvelope, 
    HiOutlineMapPin, 
    HiOutlineCalendarDays,
    HiOutlineArrowLeft,
    HiOutlinePencilSquare,
    HiOutlineCurrencyDollar,
    HiOutlineStar,
    HiOutlineShieldCheck,
    HiOutlineClock
} from "react-icons/hi2";
import { cn } from "@/lib/utils";
import Button from "@/Components/UI/Button";

interface Customer {
    id: number;
    name: string | null;
    phone: string | null;
    email: string | null;
    balance: number;
    priority: number;
    is_active: boolean;
    customer_group: string | null;
    customer_type: string | null;
    loyalty_points: number;
    notes?: string | null;
    last_transaction_at?: string;
    next_transaction_at?: string;
    created_at: string;
}

export default function CustomerShowPage({ customer }: { customer: Customer }) {
    const isIndebted = customer.balance > 0;

    return (
        <AuthenticatedLayout>
            <Head title={`Customer | ${customer.name}`} />
            
            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
                
                {/* 1. Header Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('customers.index')}
                            className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-500 hover:text-primary transition-colors shadow-sm"
                        >
                            <HiOutlineArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 leading-none">
                                {customer.name || "Unnamed Customer"}
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                                    ID: #{customer.id.toString().padStart(4, '0')}
                                </span>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider",
                                    customer.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                )}>
                                    {customer.is_active ? "Active Member" : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none">
                            <HiOutlinePencilSquare className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                        <Button variant="primary" className="flex-1 md:flex-none shadow-xl shadow-primary/20">
                            New Transaction
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* LEFT COLUMN: Profile & Financials */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Financial Card */}
                        <div className={cn(
                            "p-6 rounded-[2.5rem] shadow-sm border flex flex-col items-center text-center",
                            isIndebted ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"
                        )}>
                            <div className={cn(
                                "w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-inner",
                                isIndebted ? "bg-red-600 text-white" : "bg-emerald-600 text-white"
                            )}>
                                <HiOutlineCurrencyDollar className="w-8 h-8" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                                {isIndebted ? "Total Outstanding Debt" : "Current Credit Balance"}
                            </span>
                            <h2 className={cn(
                                "text-4xl font-black mt-2",
                                isIndebted ? "text-red-700" : "text-emerald-700"
                            )}>
                                {isIndebted ? "+" : ""}{customer.balance.toLocaleString()}
                            </h2>
                            <div className="mt-6 w-full pt-6 border-t border-black/5 flex justify-between">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Loyalty</p>
                                    <p className="font-black text-slate-700 flex items-center gap-1">
                                        <HiOutlineStar className="text-amber-500" /> {customer.loyalty_points}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Priority</p>
                                    <p className="font-black text-slate-700 flex items-center gap-1 justify-end">
                                        <HiOutlineShieldCheck className="text-primary" /> {customer.priority}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details Card */}
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Communication</h3>
                            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                                    <HiOutlinePhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Phone Number</p>
                                    <p className="font-bold text-slate-800">{customer.phone || "Not Provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                                    <HiOutlineEnvelope className="w-5 h-5" />
                                </div>
                                <div className="truncate">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Email Address</p>
                                    <p className="font-bold text-slate-800 truncate">{customer.email || "No Email"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Activity & Information */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Timeline / Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                                    <HiOutlineClock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Last Transaction</p>
                                    <p className="font-bold text-slate-800">{customer.last_transaction_at || 'Never'}</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-warning/10 rounded-2xl text-warning-700">
                                    <HiOutlineCalendarDays className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Next Scheduled</p>
                                    <p className="font-bold text-slate-800">{customer.next_transaction_at || 'None'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Information Tabs */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="flex border-b border-slate-50">
                                <button className="px-8 py-5 text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary bg-primary/[0.02]">
                                    Profile Info
                                </button>
                                <button className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                                    Transactions
                                </button>
                            </div>
                            
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Customer Group</label>
                                        <p className="text-base font-bold text-slate-800">{customer.customer_group || "Regular Retail"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Classification</label>
                                        <p className="text-base font-bold text-slate-800 uppercase tracking-tighter text-primary">
                                            {customer.customer_type || "Direct Consumer"}
                                        </p>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Manager's Internal Notes</label>
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                                            {customer.notes || "No administrative notes recorded for this customer profile."}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <HiOutlineCalendarDays className="w-5 h-5 text-slate-400" />
                                        <span className="text-xs font-medium text-slate-400">
                                            Registry Date: {new Date(customer.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Link href="#" className="text-xs font-black text-primary uppercase hover:underline">
                                        View Full Audit Log
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}