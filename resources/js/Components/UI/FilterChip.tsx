import React from "react";
import { cn } from "@/Utils/helpers";
import { Button } from "./Button";

interface FilterChipProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
    count?: number;
}

export const FilterChip: React.FC<FilterChipProps> = ({
    label,
    active = false,
    onClick,
    count,
}) => {
    return (
        <Button
            onClick={onClick}
            className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                active
                    ? "bg-primary-fixed text-on-primary-fixed shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
            )}
        >
            {label}
            {count !== undefined && (
                <span className="ml-1 text-xs opacity-60">({count})</span>
            )}
        </Button>
    );
};
