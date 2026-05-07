"use client"

import React from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { 
    HiOutlinePhone, HiOutlineEnvelope, HiOutlineCalendarDays, 
    HiOutlineArrowLeft, HiOutlinePencilSquare, HiOutlineCurrencyDollar, 
    HiOutlineStar, HiOutlineClock 
} from "react-icons/hi2";
import { cn } from "@/lib/utils";
import Button from "@/Components/UI/Button";
import { ContactPill } from "./Components/ContactPill";
import { InfoCard } from "./Components/InfoCard";
import { StatHighlight } from "./Components/StatHighlight";

export default function CustomerShowPage({ customer }: { customer: any }) {
    const isIndebted = customer.balance > 0;

    return (
        <AuthenticatedLayout>
            <Head title={`Customer Registry | ${customer.name}`} />
            
            <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto">
                
                {/* 1. Header Navigation */}
                <InfoCard className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 rounded-[2rem]">
                    <div className="flex items-center gap-5">
                        <button onClick={() => window.history.back()} className="p-3 bg-surface-container-high rounded-2xl text-on-surface-variant hover:text-primary transition-all active:scale-90">
                            <HiOutlineArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-on-surface uppercase tracking-tight leading-none">{customer.name}</h1>
                                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", customer.is_active ? "bg-success/10 text-success border-success/20" : "bg-outline-variant/20 text-on-surface-variant")}>
                                    {customer.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-1 opacity-60">Customer ID:{customer.customer_number || 'Undefined'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 rounded-2xl"><HiOutlinePencilSquare className="w-4 h-4 mr-2" /> Edit</Button>
                        <Button variant="primary" className="flex-1 rounded-2xl shadow-lg shadow-primary/20">Create Invoice</Button>
                    </div>
                </InfoCard>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEFT PANEL */}
                    <div className="lg:col-span-4 space-y-6">
                        <InfoCard className="p-8 rounded-[2.5rem] text-center relative overflow-hidden">
                            <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10", isIndebted ? "bg-error" : "bg-success")} />
                            <div className={cn("w-20 h-20 rounded-[2rem] mx-auto flex items-center justify-center mb-6 shadow-xl", isIndebted ? "bg-error text-white shadow-error/20" : "bg-success text-white shadow-success/20")}>
                                <HiOutlineCurrencyDollar className="w-10 h-10" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">{isIndebted ? "Outstanding Debt" : "Account Credit"}</span>
                            <h2 className={cn("text-4xl font-black mt-2 font-mono tracking-tighter", isIndebted ? "text-error" : "text-success")}>
                                {"Ksh "}{customer.balance.toLocaleString()}
                            </h2>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-surface-container-high rounded-3xl">
                                    <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Loyalty</p>
                                    <p className="text-lg font-black text-on-surface flex items-center justify-center gap-1"><HiOutlineStar className="text-warning" /> {customer.loyalty_points}</p>
                                </div>
                                <div className="p-4 bg-surface-container-high text-center rounded-3xl truncate">
                                    <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Priority</p>
                                    <p className="text-lg font-black text-on-surface">{customer.priority < 5 ? 'Std':customer.priority <10? 'High' : 'Vip'}</p>
                                </div>
                            </div>
                           {
                            isIndebted &&  <div  className="mt-8 grid grid-cols-1 gap-4">
                                <Button variant="danger" className="p-2 brightness-120  truncate" onClick={()=>{router.get(`/payments/${customer.id}`)}}>
                                    <p className="text-lg font-black">Register Payment</p>
                                </Button>
                            </div>
                           }

                        </InfoCard>

                        <InfoCard className="p-6 rounded-[2.5rem] space-y-4">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant px-2">Contacts</h3>
                            <ContactPill icon={HiOutlinePhone} label="Phone" value={customer.phone || "N/A"} />
                            <ContactPill icon={HiOutlineEnvelope} label="Email" value={customer.email || "N/A"} />
                        </InfoCard>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StatHighlight icon={HiOutlineClock} label="Last Activity" value={customer.last_transaction_at || 'No History'} colorClass="bg-secondary/10 text-secondary" />
                            <StatHighlight icon={HiOutlineCalendarDays} label="Next Scheduled" value={customer.next_transaction_at || 'UNSPECIFIED'} colorClass="bg-warning/10 text-warning" />
                        </div>

                        <InfoCard className="rounded-[2.5rem] overflow-hidden">
                            <div className="flex border-b border-outline-variant/10 bg-surface-container-low/50">
                                <div className="px-10 py-6 text-xs font-black uppercase tracking-[0.2em] text-primary border-b-4 border-primary">Registry Intelligence</div>
                            </div>
                            <div className="p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Assigned Group</label>
                                        <p className="text-xl font-black text-on-surface tracking-tight">{customer.customer_group || "General"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Classification</label>
                                        <p className="text-xl font-black text-primary uppercase tracking-tighter">{customer.customer_type || "Retail"}</p>
                                    </div>
                                    <div className="col-span-full space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Administrative Notes</label>
                                        <div className="p-4 bg-surface-container-high rounded-2xl text-on-surface-variant text-sm font-medium leading-relaxed border border-outline-variant/5 italic">
                                            {customer.notes || "No internal notes available."}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </InfoCard>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


