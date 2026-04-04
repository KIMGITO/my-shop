import React, { useState, useMemo } from "react";
import { cn } from "@/Utils/helpers";

interface DeliverySchedule {
    date: Date;
    items: string[];
    status: "scheduled" | "delivered" | "missed" | "pending";
}

interface CalendarWidgetProps {
    deliveryDays?: number[]; // Array of day numbers that have deliveries
    scheduledDates?: Date[]; // Specific dates with deliveries
    onDateSelect?: (date: Date) => void;
    onAddDelivery?: (date: Date) => void;
    monthlyTotal?: number;
    className?: string;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
    deliveryDays = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11],
    scheduledDates = [],
    onDateSelect,
    onAddDelivery,
    monthlyTotal = 126.5,
    className,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [deliverySchedule, setDeliverySchedule] = useState<
        Map<string, DeliverySchedule>
    >(new Map());

    // Get month and year display
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = new Date();

    // Check if a date has a delivery scheduled
    const hasDelivery = (date: Date): boolean => {
        const dateKey = date.toDateString();

        // Check scheduled dates
        if (scheduledDates.some((d) => d.toDateString() === dateKey)) {
            return true;
        }

        // Check delivery days pattern
        const isInDeliveryDays = deliveryDays.includes(date.getDate());
        const isFutureDate =
            date >=
            new Date(today.getFullYear(), today.getMonth(), today.getDate());

        return isInDeliveryDays && isFutureDate;
    };

    // Get delivery status
    const getDeliveryStatus = (
        date: Date
    ): "scheduled" | "delivered" | "missed" | "pending" => {
        const dateKey = date.toDateString();
        const schedule = deliverySchedule.get(dateKey);

        if (schedule) return schedule.status;

        if (date < today && hasDelivery(date)) return "missed";
        if (date.toDateString() === today.toDateString() && hasDelivery(date))
            return "pending";
        if (hasDelivery(date)) return "scheduled";

        return "scheduled";
    };

    // Get days in month with proper alignment
    const daysInMonth = useMemo(() => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const startingDayOfWeek = firstDayOfMonth.getDay() || 7; // Convert Sunday (0) to 7
        const days = [];

        // Previous month days
        const prevMonthDays = startingDayOfWeek - 1;
        for (let i = prevMonthDays; i > 0; i--) {
            const date = new Date(currentYear, currentMonth, -i + 1);
            days.push({
                date,
                isCurrentMonth: false,
                dayNumber: date.getDate(),
            });
        }

        // Current month days
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const date = new Date(currentYear, currentMonth, i);
            days.push({
                date,
                isCurrentMonth: true,
                dayNumber: i,
            });
        }

        // Next month days (to fill up to 6 rows)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(currentYear, currentMonth + 1, i);
            days.push({
                date,
                isCurrentMonth: false,
                dayNumber: date.getDate(),
            });
        }

        return days;
    }, [currentYear, currentMonth]);

    // Navigation handlers
    const goPrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const goToday = () => {
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    };

    // Date selection handler
    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    // Add delivery handler
    const handleAddDelivery = (date: Date, e: React.MouseEvent) => {
        e.stopPropagation();
        if (onAddDelivery) {
            onAddDelivery(date);
        }

        // Update local schedule
        const dateKey = date.toDateString();
        const newSchedule: DeliverySchedule = {
            date,
            items: ["Heritage Whole Milk"],
            status: "scheduled",
        };
        setDeliverySchedule((prev) => new Map(prev).set(dateKey, newSchedule));
    };

    // Get delivery stats
    const getDeliveryStats = () => {
        const scheduledCount = daysInMonth.filter(
            (day) => day.isCurrentMonth && hasDelivery(day.date)
        ).length;

        const deliveredCount = daysInMonth.filter(
            (day) =>
                day.isCurrentMonth &&
                getDeliveryStatus(day.date) === "delivered"
        ).length;

        return { scheduledCount, deliveredCount };
    };

    const stats = getDeliveryStats();

    return (
        <div
            className={cn(
                "bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden",
                className
            )}
        >
            {/* Calendar Header */}
            <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-headline font-bold text-2xl text-on-surface">
                            {monthNames[currentMonth]} {currentYear}
                        </h3>
                        <p className="text-sm text-on-surface-variant mt-1">
                            {stats.scheduledCount} deliveries this month
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={goToday}
                            className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={goPrevMonth}
                            className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant transition-colors"
                            aria-label="Previous month"
                        >
                            <span className="material-symbols-outlined">
                                chevron_left
                            </span>
                        </button>
                        <button
                            onClick={goNextMonth}
                            className="p-2 hover:bg-surface-container-low rounded-lg text-on-surface-variant transition-colors"
                            aria-label="Next month"
                        >
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>

                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                            <div
                                key={day}
                                className="text-center text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50 py-2"
                            >
                                {day}
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6 pt-0">
                <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map(
                        ({ date, isCurrentMonth, dayNumber }, idx) => {
                            const isToday =
                                date.toDateString() === today.toDateString();
                            const isSelected =
                                selectedDate?.toDateString() ===
                                date.toDateString();
                            const hasDeliveryToday = hasDelivery(date);
                            const deliveryStatus = getDeliveryStatus(date);

                            const statusColors = {
                                scheduled:
                                    "bg-primary-container/30 border-primary-container/50",
                                delivered: "bg-green-500/20 border-green-500",
                                missed: "bg-error/20 border-error",
                                pending:
                                    "bg-primary/30 border-warning animate-pulse",
                            };

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleDateClick(date)}
                                    className={cn(
                                        "relative aspect-square p-1 rounded-xl cursor-pointer transition-all duration-200",
                                        "hover:bg-surface-container-low hover:scale-[0.98]",
                                        isCurrentMonth
                                            ? "opacity-100"
                                            : "opacity-30",
                                        isSelected &&
                                            "ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest",
                                        hasDeliveryToday &&
                                            isCurrentMonth &&
                                            "border-2",
                                        hasDeliveryToday &&
                                            isCurrentMonth &&
                                            statusColors[deliveryStatus]
                                    )}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <span
                                            className={cn(
                                                "text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full",
                                                isToday &&
                                                    "bg-primary text-white shadow-sm",
                                                isSelected &&
                                                    !isToday &&
                                                    "bg-primary-container text-on-primary-container font-bold"
                                            )}
                                        >
                                            {dayNumber}
                                        </span>

                                        {/* Delivery indicator */}
                                        {hasDeliveryToday && isCurrentMonth && (
                                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                                                <div
                                                    className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        deliveryStatus ===
                                                            "delivered" &&
                                                            "bg-green-500",
                                                        deliveryStatus ===
                                                            "missed" &&
                                                            "bg-error",
                                                        deliveryStatus ===
                                                            "pending" &&
                                                            "bg-mist-500",
                                                        deliveryStatus ===
                                                            "scheduled" &&
                                                            "bg-primary"
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {/* Add delivery button on hover */}
                                        {!hasDeliveryToday &&
                                            isCurrentMonth &&
                                            date >= today && (
                                                <button
                                                    onClick={(e) =>
                                                        handleAddDelivery(
                                                            date,
                                                            e
                                                        )
                                                    }
                                                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                                    aria-label="Schedule delivery"
                                                >
                                                    <span className="material-symbols-outlined text-[12px] text-white">
                                                        add
                                                    </span>
                                                </button>
                                            )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>

            {/* Footer Stats */}
            <div className="p-6 pt-0 border-t border-surface-container-low mt-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-low rounded-lg p-3">
                        <p className="text-xs text-on-surface-variant mb-1">
                            Scheduled Deliveries
                        </p>
                        <p className="text-2xl font-bold text-primary">
                            {stats.scheduledCount} days
                        </p>
                    </div>
                    <div className="bg-surface-container-low rounded-lg p-3">
                        <p className="text-xs text-on-surface-variant mb-1">
                            Monthly Total
                        </p>
                        <p className="text-2xl font-bold text-primary">
                            ${monthlyTotal.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-xs text-on-surface-variant">
                            Scheduled
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-on-surface-variant">
                            Delivered
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-error"></div>
                        <span className="text-xs text-on-surface-variant">
                            Missed
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-mist-500 animate-pulse"></div>
                        <span className="text-xs text-on-surface-variant">
                            Pending Today
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarWidget;
