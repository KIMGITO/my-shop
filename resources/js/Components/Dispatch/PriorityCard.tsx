import React from "react";
import { cn } from "@/Utils/helpers";

interface PriorityAlertProps {
    alert: {
        id: string;
        type: "critical" | "warning" | "info";
        title: string;
        description: string;
        actionText?: string;
        onAction?: () => void;
    };
}

export const PriorityAlert: React.FC<PriorityAlertProps> = ({ alert }) => {
    const typeConfig = {
        critical: {
            bgClass: "bg-error-container/10",
            borderClass: "border-error",
            icon: "warning",
            textClass: "text-on-error-container",
        },
        warning: {
            bgClass: "bg-surface-container-high",
            borderClass: "border-primary",
            icon: "person_alert",
            textClass: "text-on-primary-container",
        },
        info: {
            bgClass: "bg-surface-container-high",
            borderClass: "border-primary",
            icon: "notifications_active",
            textClass: "text-on-primary-container",
        },
    };

    const config = typeConfig[alert.type];

    return (
        <div
            className={cn(
                "p-5 rounded-2xl border-l-4 flex gap-4 items-start",
                config.bgClass,
                config.borderClass
            )}
        >
            <div className="p-2 bg-error-container rounded-lg text-on-error-container">
                <span className="material-symbols-outlined">{config.icon}</span>
            </div>
            <div className="flex-1">
                <h4 className={cn("font-bold", config.textClass)}>
                    {alert.title}
                </h4>
                <p className="text-sm opacity-80">{alert.description}</p>
            </div>
            {alert.actionText && (
                <button
                    onClick={alert.onAction}
                    className="text-primary font-bold text-sm px-4 py-2 hover:underline"
                >
                    {alert.actionText}
                </button>
            )}
        </div>
    );
};
