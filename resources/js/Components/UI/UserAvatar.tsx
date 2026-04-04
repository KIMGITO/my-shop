import React from "react";
import { cn } from "@/Utils/helpers";
import { User } from "@/types";

export const UserAvatar = ({ user }:{user: User}) => {
    const getInitials = (name: string) => {
        return (
            name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .substring(0, 2) || "U"
        );
    };

    return (
        <div className="relative inline-block">
            {user.avatar ? (
                // 1. Show Image if Avatar exists
                <img
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                    src={user.avatar}
                />
            ) : (
                <div
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                        "bg-primary/10 text-primary border-2 border-primary/20 ring-2 ring-primary/5",
                        "tracking-tighter"
                    )}
                >
                    {getInitials(user.name)}
                </div>
            )}

            {/* Online Status Indicator */}
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
        </div>
    );
};
