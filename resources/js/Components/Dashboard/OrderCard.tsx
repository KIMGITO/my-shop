import React from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from "@/Components/UI/Button";
import Badge from "../UI/Badge";

interface OrderCardProps {
    title: string;
    price: string | number;
    tag: string;
    schedule: string;
    image: string;
    onMenuClick?: () => void;
    className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
    title,
    price,
    tag,
    schedule,
    image,
    onMenuClick,
    className,
}) => {
    return (
        <div
            className={cn(
                "bg-mist-300/20 p-3 md:p-5 rounded-xl md:rounded-[28px] shadow-sm border border-primary/20 transition-all hover:shadow-md",
                className
            )}
        >
            {/* Mobile Layout: Column */}
            <div className="md:hidden space-y-3">
                <div className="flex gap-3">
                    <img
                        src={image}
                        className="w-14 h-14 rounded-xl object-cover bg-surface-container flex-shrink-0"
                        alt={title}
                    />
                    <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-on-surface text-sm truncate">
                            {title}
                        </h5>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                            {schedule}
                        </p>
                    </div>
                    <Button
                        onClick={onMenuClick}
                        variant="ghost"
                        className="text-on-surface-variant p-2 h-12 w-12  hover:bg-primary/25 rounded-full "
                    >
                        <HiOutlineDotsVertical className="text-xl" />
                    </Button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                    <div className="flex items-center gap-2">
                        <p className="font-black text-primary text-base">
                            $
                            {typeof price === "number"
                                ? price.toFixed(2)
                                : price}
                        </p>
                        <Badge
                            variant="success"
                            className="text-[10px] px-2 py-0.5"
                        >
                            {tag}
                        </Badge>
                    </div>
                    <button className="text-primary text-xs font-bold hover:underline">
                        View Details
                    </button>
                </div>
            </div>

            {/* Desktop Layout: Row */}
            <div className="hidden md:flex items-center gap-6">
                <img
                    src={image}
                    className="w-20 h-20 rounded-2xl object-cover bg-surface-container shrink-0"
                    alt={title}
                />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h5 className="font-bold text-on-surface text-base">
                                {title}
                            </h5>
                            <p className="text-xs text-on-surface-variant font-medium mt-1">
                                {schedule}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-black text-primary text-lg">
                                $
                                {typeof price === "number"
                                    ? price.toFixed(2)
                                    : price}
                            </p>
                            <Badge variant="success" className="mt-1">
                                {tag}
                            </Badge>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={onMenuClick}
                    variant="ghost"
                    className="text-on-surface-variant p-2 hover:bg-primary/25 rounded-full flex-shrink-0"
                >
                    <HiOutlineDotsVertical className="text-2xl" />
                </Button>
            </div>
        </div>
    );
};

export default OrderCard;
