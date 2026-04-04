import React, { useState, useRef } from "react";
import { cn } from "@/Utils/helpers";
import {
    HiOutlineTruck,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from "react-icons/hi2";
import { Link } from "@inertiajs/react";

interface WeekDay {
    day: string;
    date: string;
    delivery: boolean;
    pending?: boolean;
}

interface WeeklyScheduleProps {
    week: WeekDay[];
    onViewCalendar?: () => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
    week,
    onViewCalendar,
}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            const newPosition =
                direction === "left"
                    ? scrollPosition - scrollAmount
                    : scrollPosition + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newPosition,
                behavior: "smooth",
            });
            setScrollPosition(newPosition);
        }
    };

    return (
        <section>
            <div className="flex justify-between items-end mb-4 md:mb-6 px-2">
                <h4 className="text-lg md:text-xl font-headline font-black text-on-surface">
                    Weekly Schedule
                </h4>
                <Link
                    href={onViewCalendar ? "#" : "/"}
                    onClick={(e) => {
                        if (onViewCalendar) {
                            e.preventDefault();
                            onViewCalendar();
                        }
                    }}
                    className="text-primary font-bold text-xs md:text-sm hover:underline"
                >
                    View Calendar
                </Link>
            </div>

            {/* Desktop: 7 columns */}
            {/* <div className="hidden md:grid grid-cols-7 gap-3">
                {week.map((day) => (
                    <div
                        key={day.date}
                        className={cn(
                            "p-4 rounded-2xl flex flex-col items-center transition-all",
                            day.delivery
                                ? "bg-surface-container-lowest shadow-sm border-2 border-primary/20"
                                : "bg-surface-container-low opacity-50"
                        )}
                    >
                        <span className="text-[10px] font-black uppercase opacity-50 mb-1">
                            {day.day}
                        </span>
                        <span className="text-lg font-bold mb-3">
                            {day.date}
                        </span>
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center",
                                day.delivery
                                    ? "bg-primary text-on-primary"
                                    : "bg-outline-variant/20 text-on-surface-variant"
                            )}
                        >
                            {day.delivery ? (
                                <HiOutlineTruck size={16} />
                            ) : (
                                <span className="text-xs">✕</span>
                            )}
                        </div>
                        {day.pending && (
                            <span className="text-[8px] font-bold uppercase text-warning mt-2">
                                Pending
                            </span>
                        )}
                    </div>
                ))}
            </div> */}

            {/* Mobile: Swipeable Carousel */}
            <div className=" relative">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow-md"
                >
                    <HiOutlineChevronLeft size={20} className="text-primary" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto scroll-smooth scrollbar-hidden"
                >
                    <div className="flex gap-3 px-6 min-w-min">
                        {week.map((day) => (
                            <div
                                key={day.date}
                                className={cn(
                                    "w-28 shrink-0 p-4 rounded-2xl flex flex-col items-center transition-all",
                                    day.delivery
                                        ? "bg-surface-container-lowest shadow-sm border-2 border-primary/20"
                                        : "bg-surface-container-low opacity-50"
                                )}
                            >
                                <span className="text-[10px] font-black uppercase opacity-50 mb-1">
                                    {day.day}
                                </span>
                                <span className="text-xl font-bold mb-2">
                                    {day.date}
                                </span>
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center",
                                        day.delivery
                                            ? "bg-primary text-on-primary"
                                            : "bg-outline-variant/20 text-on-surface-variant"
                                    )}
                                >
                                    {day.delivery ? (
                                        <HiOutlineTruck size={18} />
                                    ) : (
                                        <span className="text-sm">✕</span>
                                    )}
                                </div>
                                {day.pending && (
                                    <span className="text-[8px] font-bold uppercase text-warning mt-2">
                                        Pending
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow-md"
                >
                    <HiOutlineChevronRight size={20} className="text-primary" />
                </button>
            </div>
        </section>
    );
};

export default WeeklySchedule;
