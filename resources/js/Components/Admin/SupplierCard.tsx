import React from "react";
import { GoMail } from "react-icons/go";
import { HiOutlinePhone } from "react-icons/hi";

export interface Supplier {
    id: number | string;
    name: string;
    email: string;
    contact: string;
    phone: string;
    image: string;
    type: string;
}

interface SupplierCardProps {
    supplier: Supplier;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
    return (
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/50 shadow-sm group hover:shadow-md transition-all duration-300">
            {/* Supplier Image Header */}
            <div className="relative h-32 w-full bg-surface-container-high overflow-hidden">
                <img
                    src={supplier.image || "/images/placeholder-supplier.jpg"}
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    alt={supplier.name}
                />
            </div>

            {/* Content Area */}
            <div className="p-5 md:p-6">
                <h4 className="text-lg md:text-xl font-headline font-bold mb-2 md:mb-4 text-on-surface truncate">
                    {supplier.name}
                </h4>

                <div className="space-y-2 mb-4">
                    <p className="text-sm text-on-surface-variant flex items-center gap-2">
                        <GoMail className="text-primary shrink-0" />
                        <span className="truncate">{supplier.email}</span>
                    </p>
                    <p className="text-sm text-on-surface-variant flex items-center gap-2">
                        <HiOutlinePhone className="text-primary shrink-0" />
                        <span>{supplier.phone}</span>
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {supplier.type}
                    </span>

                    {/* Optional: Add a "View Details" or "Contact" action here */}
                </div>
            </div>
        </div>
    );
};

export default SupplierCard;
