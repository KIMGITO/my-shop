import React from "react";
import { cn } from "@/Utils/helpers";

interface AuditLogRowProps {
    date: string;
    time: string;
    user: { name: string; email: string; avatar?: string; initials: string };
    event: string;
    details: string;
    ip: string;
    status: "success" | "warning" | "error";
}

export const AuditLogRow: React.FC<AuditLogRowProps> = ({
    date,
    time,
    user,
    event,
    details,
    ip,
    status,
}) => {
    const statusConfig = {
        success: { icon: "check_circle", color: "text-tertiary" },
        warning: { icon: "warning", color: "text-error" },
        error: { icon: "error", color: "text-error" },
    };

    const eventConfig = {
        "Price Update": "bg-primary-fixed text-on-primary-fixed",
        "Session Login": "bg-secondary-fixed text-on-secondary-fixed",
        "Inventory Sync": "bg-surface-variant text-on-surface-variant",
        "Failed Login": "bg-error-container text-on-error-container",
    };

    return (
        <tr className="hover:bg-surface-container-low/30 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-on-surface">{date}</div>
                <div className="text-[11px] text-on-surface-variant">
                    {time}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container">
                        {user.initials}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-on-surface">
                            {user.name}
                        </div>
                        <div className="text-[11px] text-on-surface-variant">
                            {user.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span
                    className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight",
                        eventConfig[event as keyof typeof eventConfig] ||
                            "bg-surface-container-high text-on-surface-variant"
                    )}
                >
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    {event}
                </span>
            </td>
            <td className="px-6 py-4">
                <p className="text-sm font-medium text-on-surface">{details}</p>
            </td>
            <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">
                {ip}
            </td>
            <td className="px-6 py-4 text-right pr-8">
                <span
                    className={cn(
                        "material-symbols-outlined text-xl",
                        statusConfig[status].color
                    )}
                >
                    {statusConfig[status].icon}
                </span>
            </td>
        </tr>
    );
};
