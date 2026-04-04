import React from "react";
import { cn } from "@/Utils/helpers";
import { NotificationPreference } from "@/types";

interface PreferenceToggleProps {
    preference: NotificationPreference;
    onToggle: (id: string, enabled: boolean) => void;
}

export const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
    preference,
    onToggle,
}) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-bold text-on-surface text-sm md:text-base">
                    {preference.name}
                </p>
                <p className="text-xs md:text-sm text-on-surface-variant">
                    {preference.description}
                </p>
            </div>
            <button
                onClick={() => onToggle(preference.id, !preference.enabled)}
                className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-200 flex items-center px-1",
                    preference.enabled
                        ? "bg-primary-container"
                        : "bg-surface-container-highest"
                )}
            >
                <div
                    className={cn(
                        "w-4 h-4 bg-white rounded-full transition-transform duration-200",
                        preference.enabled ? "translate-x-6" : "translate-x-0"
                    )}
                />
            </button>
        </div>
    );
};

export default PreferenceToggle;
