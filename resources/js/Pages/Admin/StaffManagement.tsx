import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { SearchBar } from "@/Components/UI/SearchBar";
import { FilterChip } from "@/Components/UI/FilterChip";
import { cn } from "@/lib/utils";
import StaffCard from "@/Components/Admin/StaffCard";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { User } from "@/types";
import { RolePermissionTable } from "@/Widgets/RolePermissionTable";

type RoleType = "Admin" | "Cashier" | "Rider" | "Manager";
interface StaffMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    roleType: RoleType;
    permissions: string[];
    twoFactor: boolean;
}

const staffMembers: StaffMember[] = [
    {
        id: "1",
        name: "Sarah Miller",
        role: "General Manager",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA35zz4e_DnqZHaWAUu0ZFgMXrQoyS84nNcU-BzaT6ymNT3VAev6y70lVqR1REHbvIMShPgiACWbHsGpua-gv5_FLA_hGA0EPOOrOt_t4zckdTWFC42rl0dWfgxm135p-myYyQlewVw8VCB2IEd6xGuf_pE4LoBbM24Thr6-98hR8KMqB2Swk-AFlSi2_Z_Q7gXPfQvVi6a6jCjfu8b4Sx9ySPzH_Z1fgbUXE_k2sSpWJUCJFcHvYSlvBUQUvaFVDCjAKIYXLnuLLwC",
        roleType: "Admin",
        permissions: ["Full Access"],
        twoFactor: true,
    },
    {
        id: "2",
        name: "Marcus Chen",
        role: "Lead Barista",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSVpHYV4XHYveS0LBDhkQf0P2qMyncDkkxph2uquM6IeEKNb1EEveWw7R4TAL-RlfjjfA8h_fApY7Ld77Dwgaa8puoFZITDovrqKQcv_VqSKoZ09G7qzg0RSoEuQuJLqoog9Tna9VJp-srjEDa16hmUduR5kG9o19fWPBza8XXTTzIAUaJkWmGbAE-jP0XLaSukrw4ijc1sJ3lLL_2UFrotrHnKFn1iEPtHh4m5yRWU38ymB6Efb20VohgFvtO_14yU1CO4InKXsun",
        roleType: "Cashier",
        permissions: ["POS Access", "Inventory View"],
        twoFactor: false,
    },
    {
        id: "3",
        name: "Jackson Lee",
        role: "Senior Logistics",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJCw-Jlv2pd7Qujg4YHWZWISpFFk0Cd9a83AfoSaPycKoYHZL2r29oS3gRHuGoBoogGGdGUb7jNe3My91VffjHGI5ywEaWEcZ9FRe_nUYV53z41Bv8n5x0UXigBClXSGDaD8gm19DX7Q2GhCbBlIB0TKSGHES0epWnG3NjB0wHvVaF9I6to98wfEOtNlogz0vpsbDX4xf-DTXtY6ha9_BFmhJ314ndzo368qYaEA10ThbxQJE5WpHhESkXna5T-eIDsogBPov-VwgV",
        roleType: "Rider",
        permissions: ["Fleet App", "Daily Ledger"],
        twoFactor: false,
    },
];

const roleMatrix = [
    {
        feature: "Milk Inventory Edit",
        admin: true,
        cashier: false,
        rider: false,
    },
    { feature: "Sales Transaction", admin: true, cashier: true, rider: false },
    { feature: "Logistics Tracking", admin: true, cashier: false, rider: true },
    {
        feature: "Staff Payroll Access",
        admin: true,
        cashier: false,
        rider: false,
    },
];

export default function StaffManagement({
    staffMembers,
    roleMatrix,
    roles,
}: {
    staffMembers: User[];
        roleMatrix: any[];
    roles: string[],
    }) {
    
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredStaff = staffMembers.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Staff Management" />
            <AuthenticatedLayout active="staffing">
                <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <h2 className="text-4xl font-extrabold font-headline tracking-tighter">
                                System Users
                            </h2>
                            <p className="text-on-surface-variant mt-2">
                                Manage the artisans and specialists behind
                                Kaykay's Milk Bar.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-surface-container-highest px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">
                                    filter_list
                                </span>{" "}
                                Filter
                            </button>
                            <button className="editorial-gradient px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
                                <span className="material-symbols-outlined">
                                    person_add
                                </span>{" "}
                                Add New Staff
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface-container-low p-6 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-on-surface-variant text-sm font-semibold">
                                    Total Active
                                </p>
                                <h3 className="text-3xl font-black">
                                    {staffMembers.length}
                                </h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                                <span className="material-symbols-outlined">
                                    badge
                                </span>
                            </div>
                        </div>
                        <div className="bg-surface-container-low p-6 rounded-2xl flex items-center justify-between border-l-4 border-tertiary">
                            <div>
                                <p className="text-on-surface-variant text-sm font-semibold">
                                    On Shift
                                </p>
                                <h3 className="text-3xl font-black">{0}</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center">
                                <span className="material-symbols-outlined">
                                    schedule
                                </span>
                            </div>
                        </div>
                        <div className="bg-surface-container-low p-6 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-on-surface-variant text-sm font-semibold">
                                    Pending Access
                                </p>
                                <h3 className="text-3xl font-black">{0}</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                                <span className="material-symbols-outlined">
                                    pending_actions
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            <FilterChip
                                label="All Riders"
                                active={activeFilter === "All"}
                                onClick={() => setActiveFilter("All")}
                            />
                            <FilterChip
                                label="Admin"
                                active={activeFilter === "Admin"}
                                onClick={() => setActiveFilter("Admin")}
                            />
                            <FilterChip
                                label="Cashier"
                                active={activeFilter === "Cashier"}
                                onClick={() => setActiveFilter("Cashier")}
                            />
                            <FilterChip
                                label="Rider"
                                active={activeFilter === "Rider"}
                                onClick={() => setActiveFilter("Rider")}
                            />
                        </div>
                        <div className="w-full md:w-80">
                            <SearchBar
                                placeholder="Search staff..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
                    </div>

                    {/* Staff Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredStaff.map((staff) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}
                        <div className="border-2 border-dashed border-outline-variant/40 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:bg-surface-container-low transition-all cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">
                                    add
                                </span>
                            </div>
                            <div>
                                <p className="font-bold text-lg">
                                    Onboard Talent
                                </p>
                                <p className="text-sm text-on-surface-variant">
                                    Send an invitation link to a new staff
                                    member's email.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Role Permission Matrix */}
                    <div className="space-y-6 pt-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold font-headline">
                                Role Permission Matrix
                            </h3>
                            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                                Edit Default Roles{" "}
                                <span className="material-symbols-outlined text-sm">
                                    open_in_new
                                </span>
                            </button>
                        </div>
                        <RolePermissionTable
                            roles={roles}
                            roleMatrix={roleMatrix}
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
