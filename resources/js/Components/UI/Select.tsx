import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi";
import { IconType } from "react-icons";

interface SelectOption {
    id: string | number;
    value: string | number;
    label: string;
    icon?: React.ReactNode;
}

interface SelectProps {
    label?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: SelectOption[];
    placeholder?: string;
    Icon?: IconType;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

// Size classes matching Input component
const sizeClasses = {
    sm: "h-10 text-sm",
    md: "h-12",
    lg: "h-14",
    xl: "h-16 text-lg",
};

const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
};

const paddingLeftClasses = {
    sm: "pl-10",
    md: "pl-12",
    lg: "pl-14",
    xl: "pl-16",
};

const paddingRightClasses = {
    sm: "pr-10",
    md: "pr-12",
    lg: "pr-14",
    xl: "pr-16",
};

/* --- Refined Select Component --- */

export const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    Icon,
    error,
    disabled = false,
    required = false,
    className,
    size = "sm",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Find current option for display
    const selectedOption = options.find((opt) => String(opt.value) === String(value));

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (option: SelectOption) => {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div className={cn("space-y-1.5 w-full relative", className)} ref={containerRef}>
            {label && (
                <label className="text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wider block">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <button
                ref={triggerRef}
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full rounded-xl bg-surface-container-high border-none transition-all text-on-surface font-medium text-left flex items-center justify-between",
                    "focus:ring-2 focus:ring-primary/20 focus:outline-none",
                    sizeClasses[size],
                    error ? "ring-2 ring-error" : "",
                    Icon ? paddingLeftClasses[size] : "pl-4",
                    paddingRightClasses[size],
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    {Icon && (
                        <Icon className={cn("text-on-surface-variant flex-shrink-0", iconSizeClasses[size])} />
                    )}
                    <span className={cn("truncate", !selectedOption && "text-on-surface-variant/60")}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <HiOutlineChevronDown className={cn("text-on-surface-variant transition-transform flex-shrink-0", iconSizeClasses[size], isOpen && "rotate-180")} />
            </button>

            {isOpen && !disabled && (
                <div 
                    className="absolute z-[100] left-0 right-0 mt-2 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    style={{ minWidth: '100%' }}
                >
                    <div className="p-2 border-b border-outline-variant/10">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/20 focus:ring-1 focus:ring-primary text-on-surface text-sm"
                        />
                    </div>

                    <div className="max-h-60 overflow-y-auto py-1 scrollbar-hidden">
                        {filteredOptions.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-on-surface-variant/60 text-center">No options found</div>
                        ) : (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={cn(
                                        "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-surface-container-high transition-colors",
                                        String(value) === String(option.value) && "bg-primary/10"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {option.icon && <span className="text-on-surface-variant">{option.icon}</span>}
                                        <span className={cn("text-sm", String(value) === String(option.value) ? "text-primary font-bold" : "text-on-surface")}>
                                            {option.label}
                                        </span>
                                    </div>
                                    {String(value) === String(option.value) && <HiOutlineCheck className="w-4 h-4 text-primary" />}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
            {error && <p className="text-error text-[12px] mt-1 px-1">{error}</p>}
        </div>
    );
};

export default Select;
