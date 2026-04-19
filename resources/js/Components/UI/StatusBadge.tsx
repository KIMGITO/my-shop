import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";
import { SiCodefresh } from "react-icons/si";
import { IoTimer, IoToday } from "react-icons/io5";
import { FcExpired } from "react-icons/fc";
import { FaCheckCircle, FaBoxOpen, FaPaperPlane, FaFileAlt, FaClipboardCheck, FaChartPie, FaSpinner, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";

interface StatusBadgeProps {
    status:
        | "fresh"
        | "expiring_soon"
        | "expiring_today"
        | "expired"
        | "active"
        | "depleted"
        | "sent"
        | "draft"
        | "fulfilled"
        | "partial"
        | "in_progress"
        | "completed"
        | "pending"
        | "cancelled";
    size?: "sm" | "md";
    showDot?: boolean;
    Icon?: IconType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    size = "sm",
    showDot = true,
}) => {
    const configs = {
        fresh: {
            color: "bg-green-100 text-green-700",
            dotColor: "bg-green-500",
            label: "Fresh",
            Icon: SiCodefresh,
        },
        expiring_soon: {
            color: "bg-yellow-100 text-yellow-700",
            dotColor: "bg-yellow-500",
            label: "Expiring Soon",
            Icon: IoTimer,
        },
        expiring_today: {
            color: "bg-orange-100 text-orange-700",
            dotColor: "bg-orange-500",
            label: "Expires Today",
            Icon: IoToday,
        },
        expired: {
            color: "bg-red-100 text-red-700",
            dotColor: "bg-red-500",
            label: "Expired",
            Icon: FcExpired,
        },
        active: {
            color: "bg-green-100 text-green-700",
            dotColor: "bg-green-500",
            label: "Active",
            Icon: FaCheckCircle,
        },
        depleted: {
            color: "bg-gray-100 text-gray-700",
            dotColor: "bg-gray-500",
            label: "Depleted",
            Icon: FaBoxOpen,
        },
        sent: {
            color: "bg-blue-100 text-blue-700",
            dotColor: "bg-blue-500",
            label: "Sent",
            Icon: FaPaperPlane,
        },
        draft: {
            color: "bg-gray-100 text-gray-500",
            dotColor: "bg-gray-400",
            label: "Draft",
            Icon: FaFileAlt,
        },
        fulfilled: {
            color: "bg-purple-100 text-purple-700",
            dotColor: "bg-purple-500",
            label: "Fulfilled",
            Icon: FaClipboardCheck,
        },
        partial: {
            color: "bg-cyan-100 text-cyan-700",
            dotColor: "bg-cyan-500",
            label: "Partially Received",
            Icon: FaChartPie,
        },
        in_progress: {
            color: "bg-blue-100 text-blue-700",
            dotColor: "bg-blue-500",
            label: "In Progress",
            Icon: FaSpinner,
        },
        completed: {
            color: "bg-green-100 text-green-700",
            dotColor: "bg-green-500",
            label: "Completed",
            Icon: MdDoneAll,
        },
        pending: {
            color: "bg-yellow-100 text-yellow-700",
            dotColor: "bg-yellow-500",
            label: "Pending",
            Icon: FaHourglassHalf,
        },
        cancelled: {
            color: "bg-red-100 text-red-700",
            dotColor: "bg-red-500",
            label: "Cancelled",
            Icon: FaTimesCircle,
        },
    };

    const config = configs[status];
    
    // Add a fallback for undefined status
    if (!config) {
        console.warn(`Unknown status: ${status}`);
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1.5 rounded-full font-bold px-3 py-1 text-xs",
                    "bg-gray-100 text-gray-700"
                )}
            >
                {showDot && <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>}
                {String(status).replace(/_/g, ' ').toUpperCase()}
            </span>
        );
    }

    const sizeClasses = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-bold",
                sizeClasses[size],
                config.color
            )}
        >
            {showDot && (
                <span
                    className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)}
                ></span>
            )}
            {config.Icon && (
                <config.Icon/>
            )}
            {config.label}
        </span>
    );
};