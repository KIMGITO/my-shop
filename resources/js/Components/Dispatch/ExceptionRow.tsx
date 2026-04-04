import React from "react";
import { cn } from "@/Utils/helpers";
import { StatusBadge } from "@/Components/UI/StatusBadge";

interface ExceptionRowProps {
    exception: {
        id: string;
        orderNumber: string;
        customer: string;
        address: string;
        type: "wrong_address" | "not_home" | "damaged" | "refused";
        rider: { name: string; avatar: string };
        status: "pending" | "returning" | "resolved";
    };
    onAction: (id: string, action: string) => void;
}

export const ExceptionRow: React.FC<ExceptionRowProps> = ({
    exception,
    onAction,
}) => {
    const typeConfig = {
        wrong_address: {
            color: "bg-error",
            label: "Incorrect Address",
            icon: "location_off",
        },
        not_home: {
            color: "bg-error",
            label: "Customer Not Home",
            icon: "person_off",
        },
        damaged: {
            color: "bg-secondary",
            label: "Product Damaged",
            icon: "inventory_2",
        },
        refused: {
            color: "bg-secondary",
            label: "Refused Order",
            icon: "person_remove",
        },
    };

    const config = typeConfig[exception.type];

    const getActionButton = () => {
        switch (exception.type) {
            case "wrong_address":
            case "not_home":
                return (
                    <button
                        onClick={() => onAction(exception.id, "reschedule")}
                        className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg text-xs font-black hover:scale-105 transition-transform"
                    >
                        Reschedule
                    </button>
                );
            case "damaged":
                return (
                    <button
                        onClick={() => onAction(exception.id, "process")}
                        className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg text-xs font-black hover:scale-105 transition-transform"
                    >
                        Process
                    </button>
                );
            case "refused":
                return (
                    <button
                        onClick={() => onAction(exception.id, "contact")}
                        className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg text-xs font-black hover:scale-105 transition-transform"
                    >
                        Contact
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <tr className="bg-surface group hover:bg-surface-container transition-colors">
            <td className="px-4 py-5 rounded-l-2xl">
                <span className="font-black text-primary">
                    #{exception.orderNumber}
                </span>
            </td>
            <td className="px-4 py-5">
                <div className="flex flex-col">
                    <span className="font-bold text-sm">
                        {exception.customer}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                        {exception.address}
                    </span>
                </div>
            </td>
            <td className="px-4 py-5">
                <div className="flex items-center gap-2">
                    <div
                        className={cn("w-2 h-2 rounded-full", config.color)}
                    ></div>
                    <span className="text-sm font-medium">{config.label}</span>
                </div>
            </td>
            <td className="px-4 py-5">
                <div className="flex items-center gap-2">
                    <img
                        alt="Rider"
                        className="w-6 h-6 rounded-full"
                        src={exception.rider.avatar}
                    />
                    <span className="text-xs font-bold">
                        {exception.rider.name}
                    </span>
                </div>
            </td>
            <td className="px-4 py-5">
                <StatusBadge
                    status={
                        exception.status === "pending"
                            ? "expiring_soon"
                            : exception.status === "returning"
                            ? "partial"
                            : "fulfilled"
                    }
                    showDot={false}
                />
            </td>
            <td className="px-4 py-5 rounded-r-2xl text-right">
                {getActionButton()}
            </td>
        </tr>
    );
};
