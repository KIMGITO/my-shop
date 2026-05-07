import React, { useState, useMemo } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { SearchBar } from "@/Components/UI/SearchBar";
import { FilterChip } from "@/Components/UI/FilterChip";
import StaffCard from "@/Components/Admin/StaffCard";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { RolePermissionTable } from "@/Widgets/RolePermissionTable";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import { MdManageAccounts, MdClose } from "react-icons/md";
import Button from "@/Components/UI/Button";
import { Modal } from "@/Components/UI/Modal";
import { StaffFormWidget } from "@/Widgets/StaffFormWidget";

type RoleType = "Admin" | "Cashier" | "Rider" | "Manager";

export interface Staff {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    role: string;
    avatar: string;
    roleType: Lowercase<RoleType>;
    permissions: string[];
    twoFactor: boolean;
}

export default function StaffManagement({
    staffMembers,
    roleMatrix,
    roles,
}: {
    staffMembers: Staff[];
    roleMatrix: any[];
    roles: string[];
}) {
    // --- State ---
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

    // --- Form Handling (Inertia) ---
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            email: "",
            phone: "",
            roleType: "cashier" as Lowercase<RoleType>,
        });

    // --- Filtering Logic ---
    const filteredStaff = useMemo(() => {
        return staffMembers.filter((s) => {
            const matchesSearch = s.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesRole =
                activeFilter === "All" ||
                s.roleType.toLowerCase() === activeFilter.toLowerCase();
            return matchesSearch && matchesRole;
        });
    }, [staffMembers, searchQuery, activeFilter]);

    // --- Actions ---
    const handleOpenAddModal = () => {
        setEditingStaff(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (staff: Staff) => {
        setEditingStaff(staff);
        setData({
            name: staff.name,
            email: staff.email || "",
            phone: staff.phone || "",
            roleType: staff.roleType,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(editingStaff);
        if (editingStaff) {
            put(route("admin.staff.update", editingStaff.id), {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            post(route("admin.staff.store"), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: string) => {
        router.delete(route("admin.staff.destroy", id));
    };

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
                            <Button
                                variant="secondary"
                                onClick={handleOpenAddModal}
                            >
                                <span className="material-symbols-outlined mr-2">
                                    person_add
                                </span>
                                Add Staff
                            </Button>
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
                        {/* ... other stats ... */}
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {[
                                "All",
                                "Admin",
                                "Cashier",
                                "Rider",
                                "Manager",
                            ].map((role) => (
                                <FilterChip
                                    key={role}
                                    label={role === "All" ? "All Staff" : role}
                                    active={activeFilter === role}
                                    onClick={() => setActiveFilter(role)}
                                />
                            ))}
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
                            <div key={staff.id} className="group relative">
                                <StaffCard
                                    onDelete={(id) => handleDelete(id)}
                                    staff={staff}
                                    editMode={() => handleOpenEditModal(staff)}
                                />
                            </div>
                        ))}

                        {/* Onboard Talent Trigger */}
                        <div
                            onClick={handleOpenAddModal}
                            className="border-2 border-dashed border-outline-variant/40 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:bg-surface-container-low transition-all cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">
                                    add
                                </span>
                            </div>
                            <div>
                                <p className="font-bold text-lg">
                                    Onboard Staff
                                </p>
                                <p className="text-sm text-on-surface-variant">
                                    Add a new member to your team.
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
                            <Button variant="link">
                                Edit Default Roles
                                <MdManageAccounts className="ml-2 text-xl" />
                            </Button>
                        </div>
                        <RolePermissionTable
                            roles={roles}
                            roleMatrix={roleMatrix}
                        />
                    </div>
                </div>

                <Modal
                    size="md"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <div className="p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-black">
                                {editingStaff
                                    ? "Edit Specialist"
                                    : "Onboard New Artisan"}
                            </h2>
                        </div>

                        <StaffFormWidget
                            data={data}
                            setData={setData}
                            errors={errors}
                            roles={roles.map((r) => ({
                                id: r,
                                value: r.toLowerCase(),
                                label: r,
                            }))}
                            processing={processing}
                            onSave={handleSubmit}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </Modal>

                <FloatingActionButton
                    disabled={isModalOpen}
                    action={handleOpenAddModal}
                />
            </AuthenticatedLayout>
        </>
    );
}
