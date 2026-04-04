import React, { useState } from "react";
import { cn } from "@/Utils/helpers";
import { useDeliverySubscriptionStore } from "@/Stores/useDeliverySubscriptionStore";
import Button from "@/Components/UI/Button";
import { HiOutlineCheck, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Modal } from "./UI/Modal";

interface Frequency {
    id: string;
    label: string;
    icon: string;
    description?: string;
    customDays?: number[];
    dayQuantities?: { [key: string]: number };
    interval?: "daily" | "weekly" | "biweekly" | "monthly" | "custom";
    intervalValue?: number;
}

interface FrequencySelectorProps {
    className?: string;
    basePrice?: number; // Price per unit
    onPriceUpdate?: (total: number) => void;
}

const DAYS_OF_WEEK = [
    { id: "mon", label: "Mo", fullName: "Monday", index: 0 },
    { id: "tue", label: "Tu", fullName: "Tuesday", index: 1 },
    { id: "wed", label: "We", fullName: "Wednesday", index: 2 },
    { id: "thu", label: "Th", fullName: "Thursday", index: 3 },
    { id: "fri", label: "Fr", fullName: "Friday", index: 4 },
    { id: "sat", label: "Sa", fullName: "Saturday", index: 5 },
    { id: "sun", label: "Su", fullName: "Sunday", index: 6 },
];

// Round to nearest 5
const roundToNearestFive = (value: number): number => {
    return Math.ceil(value / 5) * 5;
};

// Decimal Quantity Selector with Direct Input
const DecimalQuantitySelector: React.FC<{
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    size?: "sm" | "md";
}> = ({
    quantity,
    onIncrease,
    onDecrease,
    onChange,
    min = 0.1,
    max = 10,
    step = 0.1,
    size = "sm",
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(quantity.toString());

    const sizeClasses = {
        sm: "w-7 h-7 text-xs",
        md: "w-9 h-9 text-sm",
    };

    const formatQuantity = (q: number) => {
        return q % 1 === 0 ? q.toString() : q.toFixed(1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        let numValue = parseFloat(inputValue);
        if (isNaN(numValue)) {
            numValue = min;
        }
        numValue = Math.min(max, Math.max(min, numValue));
        const roundedValue = Math.round(numValue / step) * step;
        onChange(roundedValue);
        setInputValue(formatQuantity(roundedValue));
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleInputBlur();
        }
    };

    return (
        <div className="flex items-center bg-surface-container-low rounded-lg p-0.5">
            <button
                onClick={onDecrease}
                disabled={quantity <= min}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                <HiOutlineMinus size={size === "sm" ? 12 : 14} />
            </button>

            {isEditing ? (
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    step={step}
                    min={min}
                    max={max}
                    className="w-12 text-center text-sm font-medium text-on-surface bg-transparent focus:outline-none focus:ring-1 focus:ring-primary rounded"
                    autoFocus
                />
            ) : (
                <span
                    onClick={() => setIsEditing(true)}
                    className="min-w-[40px] text-center text-sm font-medium text-on-surface cursor-pointer hover:bg-surface-container-high rounded py-1 transition-colors"
                >
                    {formatQuantity(quantity)}
                </span>
            )}

            <button
                onClick={onIncrease}
                disabled={quantity >= max}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                <HiOutlinePlus size={size === "sm" ? 12 : 14} />
            </button>
        </div>
    );
};

// Interval Selector Component
const IntervalSelector: React.FC<{
    interval: string;
    intervalValue: number;
    onChange: (interval: string, value: number) => void;
}> = ({ interval, intervalValue, onChange }) => {
    const intervals = [
        {
            id: "daily",
            label: "Daily",
            icon: "today",
            description: "Every day",
        },
        {
            id: "weekly",
            label: "Weekly",
            icon: "calendar_view_week",
            description: "Once a week",
        },
        {
            id: "biweekly",
            label: "Every 2 weeks",
            icon: "date_range",
            description: "Twice a month",
        },
        {
            id: "monthly",
            label: "Monthly",
            icon: "calendar_month",
            description: "Once a month",
        },
    ];

    return (
        <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">
                Delivery Interval
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {intervals.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() =>
                            onChange(opt.id, opt.id === "biweekly" ? 2 : 1)
                        }
                        className={cn(
                            "flex flex-col items-center p-2 rounded-xl transition-all",
                            interval === opt.id
                                ? "bg-primary text-on-primary shadow-md"
                                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                        )}
                    >
                        <span className="material-symbols-outlined text-lg">
                            {opt.icon}
                        </span>
                        <span className="text-[10px] font-medium mt-0.5">
                            {opt.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Custom Frequency Modal
const CustomFrequencyModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (frequency: Frequency) => void;
    basePrice?: number;
}> = ({ isOpen, onClose, onSave, basePrice = 90 }) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [dayQuantities, setDayQuantities] = useState<{
        [key: string]: number;
    }>({});
    const [customName, setCustomName] = useState("");
    const [interval, setInterval] = useState("weekly");
    const [intervalValue, setIntervalValue] = useState(1);
    const [deliveryCount, setDeliveryCount] = useState(1); // Number of deliveries per interval

    const handleDayToggle = (dayId: string) => {
        setSelectedDays((prev) => {
            const newSelected = prev.includes(dayId)
                ? prev.filter((d) => d !== dayId)
                : [...prev, dayId];

            if (!prev.includes(dayId)) {
                setDayQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [dayId]: 1,
                }));
            }

            return newSelected;
        });
    };

    const handleQuantityChange = (dayId: string, quantity: number) => {
        setDayQuantities((prev) => ({
            ...prev,
            [dayId]: Math.round(quantity * 10) / 10,
        }));
    };

    const handleIntervalChange = (newInterval: string, value: number) => {
        setInterval(newInterval);
        setIntervalValue(value);
    };

    const calculatePerDeliveryPrice = () => {
        const totalQuantity = Object.values(dayQuantities).reduce(
            (sum, qty) => sum + qty,
            0
        );
        const rawPrice = basePrice * totalQuantity;
        return roundToNearestFive(rawPrice);
    };

    const calculateTotalForPeriod = () => {
        const perDelivery = calculatePerDeliveryPrice();
        return perDelivery * deliveryCount;
    };

    const handleSave = () => {
        if (selectedDays.length === 0) return;

        const dayLabels = selectedDays.map(
            (dayId) =>
                DAYS_OF_WEEK.find((d) => d.id === dayId)?.fullName || dayId
        );

        const dayIndices = selectedDays.map((dayId) =>
            DAYS_OF_WEEK.findIndex((d) => d.id === dayId)
        );

        const frequency: Frequency = {
            id: "custom",
            label: customName || `${selectedDays.length} day(s)`,
            icon: "schedule",
            description: `${selectedDays.length} day(s) • ${interval} • ${deliveryCount} delivery(s)`,
            customDays: dayIndices,
            dayQuantities: dayQuantities,
            interval: interval as any,
            intervalValue: intervalValue,
        };

        onSave(frequency);
        onClose();
    };

    const perDeliveryPrice = calculatePerDeliveryPrice();
    const totalPrice = calculateTotalForPeriod();

    return (
        <Modal
            isOpen={isOpen}
            b
            onClose={onClose}
            title="Custom Schedule"
            size="md"
        >
            <div className="space-y-5 max-h-[65vh] overflow-y-auto p-3 scrollbar-hidden">
                {/* Schedule Name */}
                <div>
                    <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Schedule name (optional)"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface text-sm"
                    />
                </div>

                {/* Delivery Interval */}
                <IntervalSelector
                    interval={interval}
                    intervalValue={intervalValue}
                    onChange={handleIntervalChange}
                />

                {/* Number of Deliveries */}
                <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2">
                        Number of Deliveries
                    </label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                setDeliveryCount(Math.max(1, deliveryCount - 1))
                            }
                            className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center hover:bg-surface-container"
                        >
                            <HiOutlineMinus size={14} />
                        </button>
                        <span className="text-lg font-bold text-on-surface min-w-[50px] text-center">
                            {deliveryCount}
                        </span>
                        <button
                            onClick={() => setDeliveryCount(deliveryCount + 1)}
                            className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center hover:bg-surface-container"
                        >
                            <HiOutlinePlus size={14} />
                        </button>
                        <span className="text-xs text-on-surface-variant ml-2">
                            {interval === "daily"
                                ? "per day"
                                : interval === "weekly"
                                ? "per week"
                                : interval === "biweekly"
                                ? "per 2 weeks"
                                : "per month"}
                        </span>
                    </div>
                </div>

                {/* Day Selection */}
                <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2">
                        Select Days
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                        {DAYS_OF_WEEK.map((day) => {
                            const isSelected = selectedDays.includes(day.id);
                            return (
                                <button
                                    key={day.id}
                                    onClick={() => handleDayToggle(day.id)}
                                    className={cn(
                                        "py-2 rounded-lg text-sm font-medium transition-all",
                                        isSelected
                                            ? "bg-primary text-on-primary shadow-md"
                                            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                                    )}
                                >
                                    {day.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Quantities */}
                {selectedDays.length > 0 && (
                    <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-2">
                            Quantities (Liters/Units)
                        </label>
                        <div className="space-y-2">
                            {selectedDays.map((dayId) => {
                                const day = DAYS_OF_WEEK.find(
                                    (d) => d.id === dayId
                                );
                                const quantity = dayQuantities[dayId] || 1;
                                const price = roundToNearestFive(
                                    basePrice * quantity
                                );

                                return (
                                    <div
                                        key={dayId}
                                        className="flex items-center justify-between p-3 rounded-xl bg-primary-container/5 border border-primary-container/20"
                                    >
                                        <div className="flex-1">
                                            <span className="font-medium text-on-surface text-sm">
                                                {day?.fullName}
                                            </span>
                                            <p className="text-xs text-primary font-bold mt-0.5">
                                                KSH {price}/delivery
                                            </p>
                                        </div>
                                        <DecimalQuantitySelector
                                            quantity={quantity}
                                            onIncrease={() =>
                                                handleQuantityChange(
                                                    dayId,
                                                    quantity + 0.1
                                                )
                                            }
                                            onDecrease={() =>
                                                handleQuantityChange(
                                                    dayId,
                                                    Math.max(
                                                        0.1,
                                                        quantity - 0.1
                                                    )
                                                )
                                            }
                                            onChange={(val) =>
                                                handleQuantityChange(dayId, val)
                                            }
                                            step={0.1}
                                            min={0.1}
                                            max={10}
                                            size="sm"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {selectedDays.length === 0 && (
                    <div className="text-center py-4">
                        <p className="text-xs text-error">
                            Select at least one day
                        </p>
                    </div>
                )}

                {/* Price Summary */}
                {selectedDays.length > 0 && (
                    <div className="pt-3 border-t border-outline-variant/10">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">
                                Per Delivery
                            </span>
                            <span className="font-bold text-primary">
                                KSH {perDeliveryPrice}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-on-surface-variant">
                                Total ({deliveryCount}{" "}
                                {deliveryCount === 1
                                    ? "delivery"
                                    : "deliveries"}
                                )
                            </span>
                            <span className="font-bold text-lg text-primary">
                                KSH {totalPrice}
                            </span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant text-right mt-2">
                            Prices rounded to nearest 5 KSH
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1 text-sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="primary"
                        className="flex-1 text-sm"
                        disabled={selectedDays.length === 0}
                    >
                        Save Schedule
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

// Day Schedule Display
const DayScheduleDisplay: React.FC<{
    customDays?: number[];
    dayQuantities?: { [key: string]: number };
    basePrice?: number;
    interval?: string;
    deliveryCount?: number;
}> = ({
    customDays,
    dayQuantities,
    basePrice = 90,
    interval,
    deliveryCount = 1,
}) => {
    const getDayQuantity = (dayId: string) => {
        return dayQuantities?.[dayId] || 1;
    };

    const calculateDayPrice = (dayId: string) => {
        const quantity = getDayQuantity(dayId);
        return roundToNearestFive(basePrice * quantity);
    };

    const daysToShow = customDays
        ? customDays.map((index) => DAYS_OF_WEEK[index])
        : DAYS_OF_WEEK;

    const perDeliveryTotal = daysToShow.reduce((total, day) => {
        return total + calculateDayPrice(day.id);
    }, 0);

    const totalPrice = perDeliveryTotal * deliveryCount;

    const intervalLabels = {
        daily: "Daily",
        weekly: "Weekly",
        biweekly: "Every 2 weeks",
        monthly: "Monthly",
    };

    return (
        <div className="mt-2">
            <div className="flex flex-wrap gap-2">
                {daysToShow.map((day) => {
                    const quantity = getDayQuantity(day.id);
                    const price = calculateDayPrice(day.id);

                    return (
                        <div
                            key={day.id}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-container-low rounded-lg"
                        >
                            <span className="text-xs font-bold">
                                {day.label}
                            </span>
                            <span className="text-[10px] text-primary font-medium">
                                {quantity.toFixed(1)}×
                            </span>
                            <span className="text-[10px] text-on-surface-variant">
                                KSH {price}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between items-center mt-2 pt-1">
                <p className="text-xs text-on-surface-variant">
                    {interval &&
                        intervalLabels[interval as keyof typeof intervalLabels]}
                    {deliveryCount &&
                        deliveryCount > 1 &&
                        ` • ${deliveryCount} 'deliveries'`}
                </p>
                <p className="text-xs font-bold text-primary">
                    Total: KSH {totalPrice}
                </p>
            </div>
        </div>
    );
};

// Main Frequency Selector Component
export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
    className,
    basePrice = 90,
    onPriceUpdate,
}) => {
    const {
        frequencies,
        selectedFrequency,
        customFrequency,
        setSelectedFrequency,
        setCustomFrequency,
        openCustomModal,
        closeCustomModal,
        isCustomModalOpen,
    } = useDeliverySubscriptionStore();

    const handleFrequencyClick = (frequencyId: string) => {
        if (frequencyId === "custom") {
            openCustomModal();
        } else {
            setSelectedFrequency(frequencyId);
        }
    };

    const handleSaveCustom = (frequency: Frequency) => {
        setCustomFrequency(frequency);
        if (onPriceUpdate && frequency.dayQuantities) {
            const perDelivery = Object.values(frequency.dayQuantities).reduce(
                (sum, qty) => sum + roundToNearestFive(basePrice * qty),
                0
            );
            const total = perDelivery * (frequency.intervalValue || 1);
            onPriceUpdate(total);
        }
    };

    const selectedFreq = frequencies.find((f) => f.id === selectedFrequency);
    const displayFrequency =
        selectedFrequency === "custom" && customFrequency
            ? customFrequency
            : selectedFreq;

    // Predefined frequencies
    const getPredefinedPrice = (days: number, multiplier: number = 1) => {
        return roundToNearestFive(basePrice * days * multiplier);
    };

    return (
        <>
            <div className={cn("space-y-3", className)}>
                <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Delivery Frequency
                </label>

                {/* Frequency Options */}
                <div className="overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hidden pb-2 sm:pb-0  sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
                        {frequencies.map((option) => {
                            const isSelected =
                                selectedFrequency === option.id ||
                                (option.id === "custom" && customFrequency);

                            return (
                                <button
                                    key={option.id}
                                    onClick={() =>
                                        handleFrequencyClick(option.id)
                                    }
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl transition-all border min-w-50 sm:min-w-25 sm:w-full aspect-square sm:aspect-auto",
                                        isSelected
                                            ? "border-primary bg-surface-container-lowest shadow-sm ring-1 ring-primary/20"
                                            : "border-outline-variant/30 bg-surface-container-low hover:bg-surface-container"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "material-symbols-outlined text-2xl mb-2 transition-transform duration-300",
                                            isSelected
                                                ? "text-primary scale-110"
                                                : "text-on-surface-variant"
                                        )}
                                    >
                                        {option.icon}
                                    </span>

                                    {/* Text Handling: Truncate + Tooltip fallback */}
                                    <span
                                        title={option.label}
                                        className={cn(
                                            "font-bold text-[10px]  tracking-wider text-center w-full truncate px-1",
                                            isSelected
                                                ? "text-on-surface"
                                                : "text-on-surface-variant/80"
                                        )}
                                    >
                                        {option.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Frequency Description */}
                {displayFrequency && (
                    <div className="p-3 bg-surface-container-low rounded-lg">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-xs text-on-surface-variant">
                                <span className="font-medium text-primary">
                                    {selectedFrequency === "custom"
                                        ? "Custom:"
                                        : ""}
                                </span>{" "}
                                {displayFrequency.description ||
                                    (selectedFrequency === "daily"
                                        ? "Every day delivery"
                                        : selectedFrequency === "weekly"
                                        ? "Once a week"
                                        : selectedFrequency === "biweekly"
                                        ? "Every 2 weeks"
                                        : selectedFrequency === "monthly"
                                        ? "Once a month"
                                        : "")}
                            </p>
                        </div>

                        {/* Show detailed schedule */}
                        {selectedFrequency === "custom" &&
                            customFrequency?.customDays && (
                                <DayScheduleDisplay
                                    customDays={customFrequency.customDays}
                                    dayQuantities={
                                        customFrequency.dayQuantities
                                    }
                                    basePrice={basePrice}
                                    interval={customFrequency.interval}
                                    deliveryCount={
                                        customFrequency.intervalValue
                                    }
                                />
                            )}
                    </div>
                )}
            </div>

            {/* Custom Frequency Modal */}
            <CustomFrequencyModal
                isOpen={isCustomModalOpen}
                onClose={closeCustomModal}
                onSave={handleSaveCustom}
                basePrice={basePrice}
            />
        </>
    );
};

export default FrequencySelector;
