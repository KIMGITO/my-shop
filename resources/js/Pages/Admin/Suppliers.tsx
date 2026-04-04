// resources/js/Pages/Admin/Suppliers.tsx
import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { SearchBar } from "@/Components/UI/SearchBar";
import { ActionButton } from "@/Components/UI/ActionButton";
import {
    HiOutlinePlusCircle,
    HiOutlinePhone,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { GoMail } from "react-icons/go";

// Mock data
const mockSuppliers = [
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

export default function SuppliersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSuppliers = mockSuppliers.filter(
        (supplier) =>
            supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Suppliers - Admin" />
            <AuthenticatedLayout >
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
                                Supplier Partners
                            </h2>
                            <p className="text-on-surface-variant">
                                Manage your artisanal supply chain partners.
                            </p>
                        </div>
                        <ActionButton
                            icon={HiOutlinePlusCircle}
                            label="Add Partner"
                            variant="primary"
                        />
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
                            <div
                                key={supplier.id}
                                className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm group hover:shadow-md transition-all"
                            >
                                <img
                                    src={supplier.image}
                                    className="h-32 w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    alt={supplier.name}
                                />
                                <div className="p-5 md:p-6">
                                    <h4 className="text-lg md:text-xl font-headline font-bold mb-2 md:mb-4">
                                        {supplier.name}
                                    </h4>
                                    <p className="text-sm text-on-surface-variant flex items-center gap-2 mb-2">
                                        <GoMail className="text-primary text-sm" />
                                        {supplier.email}
                                    </p>
                                    <p className="text-sm text-on-surface-variant flex items-center gap-2 mb-4">
                                        <HiOutlinePhone className="text-primary text-sm" />
                                        {supplier.phone}
                                    </p>
                                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                                        {supplier.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

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
            </AuthenticatedLayout>
        </>
    );
}
