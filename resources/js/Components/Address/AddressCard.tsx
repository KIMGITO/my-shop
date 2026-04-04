import React from "react";
import { cn } from "@/Utils/helpers";
import Badge from "@/Components/UI/Badge";
import Button from "@/Components/UI/Button";
import {
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineBuildingOffice,
} from "react-icons/hi2";
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker } from "react-icons/hi";
import { Address } from "@/types";

interface AddressCardProps {
    address: Address;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onSetDefault?: (id: string) => void;
    deliveryFee?: number;
}

export const AddressCard: React.FC<AddressCardProps> = ({
    address,
    onEdit,
    onDelete,
    onSetDefault,
    deliveryFee = 100,
}) => {
    const getIcon = () => {
        switch (address.type) {
            case "home":
                return <HiOutlineHome className="text-2xl md:text-3xl" />;
            case "office":
                return (
                    <HiOutlineOfficeBuilding className="text-2xl md:text-3xl" />
                );
            case "cottage":
                return <HiOutlineHomeModern className="text-2xl md:text-3xl" />;
            default:
                return (
                    <HiOutlineLocationMarker className="text-2xl md:text-3xl" />
                );
        }
    };

    return (
        <div
            className={cn(
                "group relative bg-surface-container-lowest rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-500",
                address.isDefault && "border-2 border-primary/30"
            )}
        >
            {/* Default Badge */}
            {address.isDefault && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <Badge
                        variant="primary"
                        className="text-[8px] md:text-[10px]"
                    >
                        Primary
                    </Badge>
                </div>
            )}

            {/* Header */}
            <div className="flex gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container rounded-xl md:rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {getIcon()}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold font-headline text-on-surface">
                        {address.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant capitalize">
                        {address.type}
                    </p>
                </div>
            </div>

            {/* Address Details */}
            <div className="space-y-2 mb-4 md:mb-6">
                <div className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <HiOutlineMapPin
                        className="text-primary mt-0.5 flex-shrink-0"
                        size={14}
                    />
                    <span className="text-xs md:text-sm">
                        {address.houseNumber}, {address.street}
                    </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <HiOutlineBuildingOffice
                        className="text-primary mt-0.5 flex-shrink-0"
                        size={14}
                    />
                    <span className="text-xs md:text-sm">
                        {address.estate}, {address.county}
                    </span>
                </div>
                {address.landmark && (
                    <div className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <HiOutlineLocationMarker
                            className="text-primary mt-0.5 flex-shrink-0"
                            size={14}
                        />
                        <span className="text-xs md:text-sm">
                            📍 {address.landmark}
                        </span>
                    </div>
                )}
                <div className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <HiOutlinePhone
                        className="text-primary mt-0.5 flex-shrink-0"
                        size={14}
                    />
                    <span className="text-xs md:text-sm">{address.phone}</span>
                </div>
            </div>

            {/* Delivery Fee */}
            <div className="mb-4 p-2 md:p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-on-surface-variant">
                        Delivery Fee
                    </span>
                    <span className="text-sm md:text-base font-bold text-primary">
                        KSH {deliveryFee}
                    </span>
                </div>
                {address.instructions && (
                    <p className="text-[10px] text-on-surface-variant mt-2 italic">
                        📝 {address.instructions}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-surface-container-low">
                <div className="flex gap-3 md:gap-4">
                    <button
                        onClick={() => onEdit(address.id)}
                        className="text-primary font-bold text-xs md:text-sm flex items-center gap-1 hover:underline"
                    >
                        <HiOutlinePencil size={14} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(address.id)}
                        className="text-error font-bold text-xs md:text-sm flex items-center gap-1 hover:underline"
                    >
                        <HiOutlineTrash size={14} />
                        Remove
                    </button>
                </div>
                {!address.isDefault && onSetDefault && (
                    <button
                        onClick={() => onSetDefault(address.id)}
                        className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity"
                    >
                        Set Default
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddressCard;
