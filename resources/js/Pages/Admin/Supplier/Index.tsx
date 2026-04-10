// resources/js/Pages/Admin/Suppliers.tsx
import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { SearchBar } from "@/Components/UI/SearchBar";
import { ActionButton } from "@/Components/UI/ActionButton";
import { HiOutlinePlusCircle, HiOutlinePhone } from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { GoMail } from "react-icons/go";
import SupplierCard, { Supplier } from "@/Components/Admin/SupplierCard";
import { SupplierFormModal } from "./SupplierFormModal";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";

// Mock data
const suppliers = [
    {
        id: "1",
        name: "Golden Valley Organics",
        contact: "Sarah Jenkins",
        type: "Dairy",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg1D1zFS-3jZFhHLV8L-Yx-UJNe2f8uofPXAxGlbu19gCBL4AMxb0KAhL5LL2kixXMy2j3IkA4v4VVsMyPp2GW4TgSFCeKaYHvXF8xMK5Ivwomag8GZNT1mtlBXdf9QSNwwXCfldnluVc_vMpghKxBN_i_cLHvpbPoK63KFKM6lWcq7elkbjVTmF-4ivbtxFPrW1TyQuHj6w72UX235IVkFiwllzcKyriFd4pf9rPXGScnaBu4FkZKXWhhKimGY210PWU2_qjndzf0",
        email: "sarah@goldenvalley.com",
        phone: "+1 (555) 123-4567",
    },
    {
        id: "2",
        name: "Heritage Flour Co.",
        contact: "Marko Vujic",
        type: "Bakery",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY2fob6J90-I5s-Xj8lBWMcXOZ_jGFS-iof5diw4NdLArg8CvHJXtWaYCvM__c2KQH582XypRnHbe6xqAgfsxtuaCWFlclckVa4_LZPWesEGmrUe7UWDM7jN2l_QHmdUkY0t5uoCZoj0XyRAgqXFXTYhK_lgIWrVSVYXy0AT-2Nv3hJYLw4BFmY-TkMso5crLSc9H8JDtgEW3cm_0rHV7GkVFEQ7VviRIA9S4w-LqkCLDZO1Ms_uhoZhf7iv5cKPURXJXyGULw0dbp",
        email: "marko@heritageflour.com",
        phone: "+1 (555) 234-5678",
    },
];

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
