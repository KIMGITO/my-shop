import React from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineStar, HiOutlinePencil } from "react-icons/hi2";

interface RiderCardProps {
    rider: {
        id: string;
        name: string;
        avatar: string;
        status: "online" | "on_break" | "offline";
        rating: number;
        trips: number;
        joinDate: string;
        vehicle: string;
        riderId: string;
    };
    onEdit?: (id: string) => void;
}

export const RiderCard: React.FC<RiderCardProps> = ({ rider, onEdit }) => {
    const statusConfig = {
        online: {
            color: "bg-green-500",
            label: "Online",
            bgClass: "bg-green-100",
            textClass: "text-green-700",
        },
        on_break: {
            color: "bg-orange-400",
            label: "On Break",
            bgClass: "bg-orange-100",
            textClass: "text-orange-700",
        },
        offline: {
            color: "bg-gray-400",
            label: "Offline",
            bgClass: "bg-gray-100",
            textClass: "text-gray-700",
        },
    };

    const config = statusConfig[rider.status];

    return (
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
            <div className="flex items-start justify-between mb-6">
                <div className="relative">
                    <img
                        alt={rider.name}
                        className="w-20 h-20 rounded-2xl object-cover ring-4 ring-surface-container-low"
                        src={rider.avatar}
                    />
                    <span
                        className={cn(
                            "absolute -bottom-1 -right-1 w-5 h-5 border-4 border-surface-container-lowest rounded-full",
                            config.color
                        )}
                    />
                </div>
                <div className="text-right">
                    <span
                        className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter",
                            config.bgClass,
                            config.textClass
                        )}
                    >
                        {config.label}
                    </span>
                    <div className="mt-2 flex items-center justify-end text-primary gap-1">
                        <HiOutlineStar className="text-xs fill-primary text-primary" />
                        <span className="font-bold text-sm">
                            {rider.rating}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold font-headline text-on-surface mb-1">
                    {rider.name}
                </h3>
                <p className="text-on-surface-variant text-sm flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-sm">
                        {rider.vehicle === "electric"
                            ? "electric_moped"
                            : rider.vehicle === "bike"
                            ? "pedal_bike"
                            : "motorcycle"}
                    </span>
                    {rider.vehicle === "electric"
                        ? "Electric Scooter"
                        : rider.vehicle === "bike"
                        ? "Cargo Bike"
                        : "Motorbike"}{" "}
                    • ID #{rider.riderId}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-surface-container-low">
                    <div className="text-center px-4 border-r border-surface-container-low">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold">
                            Trips
                        </p>
                        <p className="font-black">
                            {rider.trips.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold">
                            Join Date
                        </p>
                        <p className="font-black">{rider.joinDate}</p>
                    </div>
                    <button
                        onClick={() => onEdit?.(rider.id)}
                        className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                    >
                        <HiOutlinePencil className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};
