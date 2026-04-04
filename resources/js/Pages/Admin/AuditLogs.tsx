import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { AuditLogRow } from "@/Components/Admin/AuditLogRow";
import { SearchBar } from "@/Components/UI/SearchBar";
import { Pagination } from "@/Components/UI/Pagination";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";

const auditLogs = [
    { date: "Oct 19, 2023", time: "08:42:12 AM", user: { name: "Kaykay (Admin)", email: "owner@kaykays.com", initials: "K" }, event: "Price Update", details: "Changed 'Organic Oat Milk' from $5.50 to $6.25", ip: "192.168.1.104", status: "success" as const },
    { date: "Oct 19, 2023", time: "07:15:00 AM", user: { name: "Sara Miller", email: "manager_01@kaykays.com", initials: "S" }, event: "Session Login", details: "Standard dashboard authentication", ip: "203.0.113.42", status: "success" as const },
    { date: "Oct 18, 2023", time: "11:59:45 PM", user: { name: "System Process", email: "automated_task_cron", initials: "SYS" }, event: "Inventory Sync", details: "Reconciled Batch #8842 with cold storage sensors", ip: "Localhost:8080", status: "success" as const },
    { date: "Oct 18, 2023", time: "04:22:11 PM", user: { name: "Joe Barista", email: "staff_joe@kaykays.com", initials: "J" }, event: "Failed Login", details: "Invalid password attempt (3/3 attempts)", ip: "45.22.192.11", status: "error" as const },
];

export default function AuditLogs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredLogs = auditLogs.filter(log =>
        log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Audit Logs" />
            <AuthenticatedLayout >
                <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-surface-container-highest rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-extrabold text-on-background leading-tight mb-2">System Integrity Monitor</h2>
                                <p className="text-on-surface-variant max-w-md">Real-time surveillance of all dairy operations. Track every batch, sale, and administrative adjustment.</p>
                            </div>
                            <div className="mt-8 flex gap-4 relative z-10">
                                <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined">file_download</span> Export Full History
                                </button>
                                <button className="bg-surface-container-lowest text-on-surface px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined">filter_list</span> Advanced Filters
                                </button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/5">
                                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Live Traffic</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-4xl font-black text-on-background">1,284</span>
                                    <span className="text-sm text-tertiary ml-2 font-bold">+12% vs ytd</span>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/5">
                                <p className="text-xs font-bold text-error tracking-widest uppercase mb-4">Security Alerts</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-4xl font-black text-on-background">0</span>
                                    <span className="material-symbols-outlined text-tertiary text-4xl">verified_user</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-4 bg-surface-container-low p-4 rounded-xl">
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">Date Range</label>
                            <div className="flex items-center bg-surface-container-lowest px-3 py-2 rounded-lg gap-2">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                <span className="text-sm font-medium">Oct 12 - Oct 19, 2023</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">Activity Type</label>
                            <div className="flex items-center bg-surface-container-lowest px-3 py-2 rounded-lg gap-2">
                                <span className="material-symbols-outlined text-sm">category</span>
                                <select className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full p-0">
                                    <option>All Activities</option>
                                    <option>Inventory Update</option>
                                    <option>Price Change</option>
                                    <option>Staff Login</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">User Access</label>
                            <div className="flex items-center bg-surface-container-lowest px-3 py-2 rounded-lg gap-2">
                                <span className="material-symbols-outlined text-sm">person</span>
                                <select className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full p-0">
                                    <option>All Staff</option>
                                    <option>Kaykay (Admin)</option>
                                    <option>Manager Sara</option>
                                    <option>Barista Joe</option>
                                </select>
                            </div>
                        </div>
                        <button className="self-end mb-1 bg-surface-container-highest p-2 rounded-lg text-on-surface hover:opacity-80">
                            <span className="material-symbols-outlined">refresh</span>
                        </button>
                    </div>

                    {/* Audit Table */}
                    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left min-w-[1000px]">
                                <thead>
                                    <tr className="bg-surface-container-low">
                                        <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Timestamp</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Identity</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Event Category</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Details</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Origin IP</th>
                                        <th className="px-6 py-4 text-right pr-8 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container">
                                    {filteredLogs.map((log, idx) => (
                                        <AuditLogRow key={idx} {...log} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/10">
                            <span className="text-xs font-medium text-on-surface-variant">Showing 1 to {filteredLogs.length} of 2,451 logs</span>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors disabled:opacity-30" disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-bold text-xs">1</button>
                                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-highest text-xs font-bold transition-colors">2</button>
                                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-highest text-xs font-bold transition-colors">3</button>
                                <span className="text-xs">...</span>
                                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-highest text-xs font-bold transition-colors">245</button>
                                <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}