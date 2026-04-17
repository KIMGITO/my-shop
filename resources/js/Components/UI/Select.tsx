import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; // Adjusted to your common lib path
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi2";
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
    size = "md",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find(
        (opt) => String(opt.value) === String(value)
    );
    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset active index when search changes
    useEffect(() => {
        setActiveIndex(0);
    }, [searchTerm]);

    // Handle Clicks Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard Navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === "Enter" || e.key === "ArrowDown") setIsOpen(true);
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(
                    (prev) =>
                        (prev - 1 + filteredOptions.length) %
                        filteredOptions.length
                );
                break;
            case "Enter":
                e.preventDefault();
                if (filteredOptions[activeIndex]) {
                    handleSelect(filteredOptions[activeIndex]);
                }
                break;
            case "Escape":
                setIsOpen(false);
                break;
        }
    };

    const handleSelect = (option: SelectOption) => {
        onChange(option.value);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div
            className={cn("space-y-1.5 w-full relative", className)}
            ref={containerRef}
            onKeyDown={handleKeyDown}
        >
            {label && (
                <label className="text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wider block">
                    {label} {required && <span className="text-error">*</span>}
                </label>
            )}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full rounded-2xl bg-surface-container-high border-none transition-all text-on-surface font-medium text-left flex items-center justify-between px-4",
                    "focus:ring-2 focus:ring-primary/20 focus:outline-none",
                    sizeClasses[size],
                    error ? "ring-2 ring-error" : "",
                    Icon && paddingLeftClasses[size],
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <div className="flex items-center gap-3 truncate">
                    {Icon && (
                        <Icon
                            className={cn(
                                "text-on-surface-variant",
                                iconSizeClasses[size]
                            )}
                        />
                    )}
                    <span
                        className={cn(
                            "truncate",
                            !selectedOption && "text-on-surface-variant/60"
                        )}
                    >
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <HiOutlineChevronDown
                    className={cn(
                        "text-on-surface-variant transition-transform",
                        iconSizeClasses[size],
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute z-100 left-0 right-0 mt-2 bg-outline-variant rounded-none rounded-b-xl p-0 border border-outline-variant/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-0 pb-2 border-b border-none">
                        <input
                            ref={searchInputRef}
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search ..."
                            className="w-full px-3 py-2   border-b-white focus:ring-primary focus:ring-0  text-on-surface text-sm"
                        />
                    </div>

                    <div className="max-h-64 overflow-y-auto py-2">
                        {filteredOptions.length === 0 ? (
                            <div className="px-4 py-8 text-sm text-on-surface-variant/60 text-center">
                                No results found
                            </div>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={cn(
                                        "w-full px-4 py-3 text-left flex items-center justify-between transition-colors",
                                        index === activeIndex
                                            ? "bg-primary/10"
                                            : "hover:bg-surface-container-high",
                                        String(value) ===
                                            String(option.value) &&
                                            "bg-primary/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {option.icon && (
                                            <span className="flex-shrink-0">
                                                {option.icon}
                                            </span>
                                        )}
                                        <span
                                            className={cn(
                                                "text-sm",
                                                String(value) ===
                                                    String(option.value)
                                                    ? "text-primary font-bold"
                                                    : "text-on-surface"
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                    </div>
                                    {String(value) === String(option.value) && (
                                        <HiOutlineCheck className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
            {error && (
                <p className="text-error text-[11px] mt-1 px-1 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};
