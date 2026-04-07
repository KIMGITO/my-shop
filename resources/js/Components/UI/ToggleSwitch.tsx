import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface ToggleSwitchProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    icon?: IconType;
    iconColor?: string;
    description?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: {
        switch: "h-5 w-9",
        knob: "h-3.5 w-3.5",
        translateOn: "translate-x-3.5",
        translateOff: "translate-x-0.5",
        icon: "w-4 h-4",
        label: "text-sm",
    },
    md: {
        switch: "h-6 w-11",
        knob: "h-4 w-4",
        translateOn: "translate-x-5",
        translateOff: "translate-x-1",
        icon: "w-5 h-5",
        label: "text-base",
    },
    lg: {
        switch: "h-7 w-13",
        knob: "h-5 w-5",
        translateOn: "translate-x-6",
        translateOff: "translate-x-1",
        icon: "w-5 h-5",
        label: "text-base",
    },
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    label,
    value,
    onChange,
    icon: Icon,
    iconColor = "text-primary",
    description,
    disabled = false,
    size = "md",
    className,
}) => {
    const sizeStyle = sizeClasses[size];

    return (
        <div
            className={cn(
                "flex items-center justify-between p-3 rounded-xl bg-surface-container-low",
                className
            )}
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className={cn(sizeStyle.icon, iconColor)} />}
                <div>
                    <span
                        className={cn(
                            "text-on-surface font-medium",
                            sizeStyle.label
                        )}
                    >
                        {label}
                    </span>
                    {description && (
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            <button
                type="button"
                onClick={() => !disabled && onChange(!value)}
                disabled={disabled}
                className={cn(
                    "relative inline-flex items-center rounded-full transition-colors",
                    sizeStyle.switch,
                    value ? "bg-primary" : "bg-surface-container-high",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <span
                    className={cn(
                        "inline-block rounded-full bg-white transition-transform shadow-sm",
                        sizeStyle.knob,
                        value ? sizeStyle.translateOn : sizeStyle.translateOff
                    )}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
