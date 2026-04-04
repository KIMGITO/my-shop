import React from "react";
import { cn } from "@/Utils/helpers";

interface ActivityFeedItemProps {
    activity: {
        id: string;
        orderNumber: string;
        rider: string;
        status: "in_progress" | "delayed" | "completed";
        progress: number;
        eta: string;
        distance: string;
    };
}

export const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
    activity,
}) => {
    const statusColor =
        activity.status === "delayed" ? "text-error" : "text-primary";

    return (
        <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-outline-variant/5 hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <div className="w-10 h-10 bg-primary-container/10 rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">
                            local_shipping
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold leading-none">
                            Order #{activity.orderNumber}
                        </p>
                        <p className="text-[10px] opacity-60 mt-1">
                            {activity.distance} away from target
                        </p>
                    </div>
                </div>
                <span className={cn("text-xs font-black", statusColor)}>
                    {activity.eta} MIN
                </span>
            </div>
            <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden mb-4">
                <div
                    className={cn(
                        "h-full w-[75%]",
                        statusColor === "text-error" ? "bg-error" : "bg-primary"
                    )}
                ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium opacity-80">
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        person
                    </span>
                    {activity.rider}
                </span>
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        schedule
                    </span>
                    ETA {activity.eta}
                </span>
            </div>
        </div>
    );
};
