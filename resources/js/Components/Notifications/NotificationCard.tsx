import React from "react";
import { cn } from "@/Utils/helpers";
import { Notification } from "@/types";
import Button from "@/Components/UI/Button";
import { Link } from "@inertiajs/react";

interface NotificationCardProps {
    notification: Notification;
    onMarkAsRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
    notification,
    onMarkAsRead,
}) => {
    const getIcon = () => {
        switch (notification.type) {
            case "delivery":
                return "local_shipping";
            case "billing":
                return "payments";
            case "promotion":
                return "celebration";
            case "announcement":
                return "notifications_active";
            default:
                return "notifications";
        }
    };

    const getIconBgClass = () => {
        if (!notification.isRead) return "bg-primary-container";
        return "bg-surface-container-high";
    };

    const getIconColorClass = () => {
        if (!notification.isRead) return "text-on-primary-container";
        return "text-on-surface-variant";
    };

    return (
        <div
            className={cn(
                "group flex gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl transition-colors items-start",
                !notification.isRead &&
                    "bg-surface-container-low/30 border-l-4 border-primary",
                notification.isRead &&
                    "opacity-75 hover:bg-surface transition-colors"
            )}
            onClick={() => {
                if (!notification.isRead && onMarkAsRead) {
                    onMarkAsRead(notification.id);
                }
            }}
        >
            <div
                className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0",
                    getIconBgClass()
                )}
            >
                <span
                    className={cn(
                        "material-symbols-outlined",
                        getIconColorClass()
                    )}
                >
                    {getIcon()}
                </span>
            </div>
            <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h5 className="font-bold text-base md:text-lg text-on-surface">
                        {notification.title}
                    </h5>
                    {!notification.isRead && (
                        <span className="text-[10px] font-bold text-primary bg-primary-container/20 px-2 py-1 rounded">
                            {notification.time}
                        </span>
                    )}
                    {notification.isRead && (
                        <span className="text-[10px] font-medium text-on-surface-variant">
                            {notification.time}
                        </span>
                    )}
                </div>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed mb-3">
                    {notification.message}
                </p>
                {notification.actionUrl && notification.actionText && (
                    <Link
                        href={notification.actionUrl}
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                    >
                        {notification.actionText}
                        <span className="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;
