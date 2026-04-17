// resources/js/Pages/Admin/Suppliers.tsx
import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { SearchBar } from "@/Components/UI/SearchBar";
import { ActionButton } from "@/Components/UI/ActionButton";
import { HiOutlinePlusCircle, HiOutlinePhone } from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { GoMail } from "react-icons/go";
import SupplierCard, { Supplier } from "@/Components/Admin/SupplierCard";
import { SupplierFormModal } from "./SupplierFormModal";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import axios from  'axios';

// Mock data
interface SupplierPageProp {
    suppliers: Supplier[];
    modalOpen: boolean;
}

export default function SuppliersPage({
    suppliers,
    modalOpen,
}: SupplierPageProp) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddSupplier = () => {
        setSelectedSupplier(null);
        setIsModalOpen(true);
    };

    const handleEditSupplier = (supplier) => {
        setSelectedSupplier(supplier);
        setIsModalOpen(true);
    };

    const handleDeleteSupplier = (id: string | number) => {
        router.delete(route('admin.suppliers.destroy',id),{
            onStart: () => {
                // loading state
            },
            onSuccess: () => {
                console.log("Supplier deleted successfully");
            },
            onError: (errors) => {
                // Handle any server-side errors
                alert(
                    "Failed to delete supplier: " + Object.values(errors)[0]
                );
            },
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Suppliers - Admin" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
                                Supplier Partners
                            </h2>
                            <p className="text-on-surface-variant">
                                Manage your artisanal supply chain.
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mb-8 max-w-md">
                        <SearchBar
                            placeholder="Search suppliers..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>

                    {/* Suppliers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredSuppliers.map((supplier) => (
                            <SupplierCard
                                supplier={supplier}
                                onEdit={(supplier) => handleEditSupplier(supplier)}
                                onDelete = {(id) => handleDeleteSupplier(id)}
                            />
                        ))}
                    </div>

                    <SupplierFormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        initialData={selectedSupplier}
                    />

                    {filteredSuppliers.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">
                                local_shipping
                            </span>
                            <p className="text-on-surface-variant">
                                No suppliers found
                            </p>
                        </div>
                    )}
                </div>
                <FloatingActionButton
                    action={handleAddSupplier}
                    disabled={isModalOpen}
                />
            </AuthenticatedLayout>
        </>
    );
}
