import { cn } from "@/lib/utils";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search...",
    value,
    onChange,
    className,
}) => {
    return (
        <div className={cn("relative group", className)}>
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-surface-container-high border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all"
            />
        </div>
    );
};
