import React from "react";
import { cn } from "@/Utils/helpers";

interface AlertCardProps {
    type: "critical" | "warning" | "info" | "success";
    title: string;
    message: string;
    time?: string;
    actionText?: string;
    onAction?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
    type,
    title,
    message,
    time,
    actionText,
    onAction,
}) => {
    const configs = {
        critical: {
            borderColor: "border-error",
            icon: "warning",
            bgClass: "bg-error-container/10",
        },
        warning: {
            borderColor: "border-amber-500",
            icon: "schedule",
            bgClass: "bg-amber-500/10",
        },
        info: {
            borderColor: "border-primary",
            icon: "info",
            bgClass: "bg-primary/10",
        },
        success: {
            borderColor: "border-green-500",
            icon: "check_circle",
            bgClass: "bg-green-500/10",
        },
    };

    const config = configs[type];

    return (
        <div
            className={cn(
                "p-4 rounded-xl border-l-4 shadow-sm",
                config.borderColor,
                config.bgClass
            )}
        >
            <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg">
                    {config.icon}
                </span>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-on-surface">
                        {title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1">
                        {message}
                    </p>
                    {time && (
                        <span className="text-[10px] text-stone-400 font-medium block mt-2">
                            {time}
                        </span>
                    )}
                </div>
                {actionText && (
                    <button
                        onClick={onAction}
                        className="text-primary font-bold text-xs hover:underline"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
};
