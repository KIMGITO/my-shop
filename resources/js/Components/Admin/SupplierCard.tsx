import React from "react";
import { cn } from "@/Utils/helpers";
import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineInformationCircle,
    HiOutlinePhone,
} from "react-icons/hi2";
import { GoMail } from "react-icons/go";
import { FaUserTie } from "react-icons/fa";
import LazyImage from "../UI/LazyImage";
import Button from "../UI/Button";

export interface Supplier {
    id: number | string;
    name: string;
    email: string;
    contact: string;
    phone: string;
    logo: string;
    type: string;
}

interface SupplierCardProps {
    supplier: Supplier;
    onEdit: (supplier: Supplier) => void;
    onDelete: (id: number | string) => void;
    onInfo?: (supplier: Supplier) => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({
    supplier,
    onEdit,
    onDelete,
    onInfo,
}) => {
    return (
        <div
            className={cn(
                "group relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
                "flex flex-row md:flex-col bg-surface-container-lowest border border-outline-variant/30"
            )}
        >
            {/* logo Section - Matches ProductCard dimensions */}
            <div className="relative w-24 h-full md:w-full md:h-40 overflow-hidden bg-surface-container-high">
                <LazyImage
                    src={supplier.logo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
            </div>

            {/* Content Area */}
            <div className="p-3 md:p-5 flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm md:text-lg capitalize font-bold text-on-surface truncate">
                            {supplier.name}
                        </h3>
                    </div>

                    <div className="space-y-2 mt-1">
                        <p className="text-on-surface-variant text-[10px] md:text-base flex items-center gap-1.5 truncate">
                            <GoMail className="text-primary shrink-0" />
                            {supplier.email}
                        </p>
                        <div className="flex gap-6">
                            <p className="text-on-surface-variant text-[10px] max-w-1/2 md:text-base flex items-center gap-1.5 truncate">
                                <FaUserTie className="text-primary shrink-0" />
                                {supplier.contact}
                            </p>
                            <p className="text-on-surface-variant text-[10px] md:text-base flex items-center gap-1.5 truncate">
                                <HiOutlinePhone className="text-primary shrink-0" />
                                {supplier.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-3 md:mt-4 pt-2 md:pt-4 border-t border-outline-variant flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[60%]">
                        {supplier.type.split(",").map((type, index) => (
                            <span
                                key={index}
                                className="bg-primary/5 text-primary px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap"
                            >
                                {type.trim()}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons - Identical to ProductCard */}
                    <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <Button
                            variant="ghost"
                            onClick={() => onInfo?.(supplier)}
                            className="px-2 hover:bg-primary/30 rounded py-2 text-success"
                        >
                            <HiOutlineInformationCircle className="text-xs md:text-sm" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => onEdit?.(supplier)}
                            className="px-2 hover:bg-primary/30 rounded py-2"
                        >
                            <HiOutlinePencil className="text-xs md:text-sm" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => onDelete(supplier.id)}
                            className="px-2 hover:bg-primary/30 rounded py-2 text-error"
                        >
                            <HiOutlineTrash className="text-xs md:text-sm" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierCard;
