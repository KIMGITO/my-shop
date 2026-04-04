import React from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineStar } from "react-icons/hi2";

interface LeaderboardRowProps {
    rank: number;
    name: string;
    vehicle: string;
    deliveries: number;
    avgTime: string;
    rating: number;
    efficiency: string;
    avatar: string;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
    rank,
    name,
    vehicle,
    deliveries,
    avgTime,
    rating,
    efficiency,
    avatar,
}) => {
    const rankColors = {
        1: "bg-primary text-white",
        2: "bg-secondary text-white",
        3: "bg-on-surface-variant/40 text-white",
    };

    const efficiencyClass = efficiency === "ELITE" 
        ? "bg-primary-fixed text-on-primary-fixed" 
        : "bg-surface-container-highest text-on-surface";

    return (
        <tr className="group hover:bg-surface-bright transition-colors rounded-xl">
            <td className="py-4 px-4 bg-surface rounded-l-2xl">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-primary" src={avatar} />
                        <div className={cn(
                            "absolute -top-1 -right-1 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold",
                            rankColors[rank as keyof typeof rankColors] || "bg-stone-400"
                        )}>
                            {rank}
                        </div>
                    </div>
                    <div>
                        <span className="block font-bold text-on-surface text-lg">{name}</span>
                        <span className="text-xs text-on-surface-variant font-medium">{vehicle}</span>
                    </div>
                </div>
            </td>
            <td className="py-4 px-4 bg-surface text-lg font-bold">{deliveries}</td>
            <td className="py-4 px-4 bg-surface text-right font-medium tabular-nums">{avgTime} min</td>
            <td className="py-4 px-4 bg-surface text-right">
                <div className="flex items-center justify-end gap-1">
                    <HiOutlineStar className="text-primary text-sm fill-primary" />
                    <span className="font-bold">{rating}</span>
                </div>
            </td>
            <td className="py-4 px-4 bg-surface">
                <div className="flex justify-center">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-black", efficiencyClass)}>
                        {efficiency}
                    </span>
                </div>
            </td>
            <td className="py-4 px-4 bg-surface rounded-r-2xl text-right">
                <button className="p-2 hover:bg-surface-container transition-colors rounded-full">
                    <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                </button>
            </td>
        </tr>
    );
};