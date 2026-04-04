import React, { useState } from "react";
import { cn } from "@/Utils/helpers";
import { useDeliverySubscriptionStore } from "@/Stores/useDeliverySubscriptionStore";
import { HiOutlinePencil, HiOutlineCheck } from "react-icons/hi";
import Modal from "@/Components/UI/Modal";

interface PerDayScheduleSelectorProps {
    className?: string;
    basePrice?: number;
}

const DAYS = [
    { id: "mon", name: "Monday", short: "M" },
    { id: "tue", name: "Tuesday", short: "T" },
    { id: "wed", name: "Wednesday", short: "W" },
    { id: "thu", name: "Thursday", short: "T" },
    { id: "fri", name: "Friday", short: "F" },
    { id: "sat", name: "Saturday", short: "S" },
    { id: "sun", name: "Sunday", short: "S" },
];

export const PerDayScheduleSelector: React.FC<PerDayScheduleSelectorProps> = ({
    className,
    basePrice = 6.5,
}) => {
    const {
        perDaySchedules,
        updatePerDaySchedule,
        volumes,
        isPerDayModalOpen,
        openPerDayModal,
        closePerDayModal,
    } = useDeliverySubscriptionStore();
    const [editingDay, setEditingDay] = useState<string | null>(null);
    const [tempSchedule, setTempSchedule] = useState<any>(null);

    const getVolumeLabel = (volumeId: string) => {
        const volume = volumes.find((v) => v.id === volumeId);
        return volume?.label || volumeId;
    };

    const getDayPrice = (schedule: any) => {
        const volume = volumes.find((v) => v.id === schedule.volume);
        const multiplier = volume?.priceMultiplier || 1;
        return basePrice * multiplier;
    };

    const totalWeeklyPrice = perDaySchedules
        .filter((day) => day.enabled)
        .reduce((sum, day) => sum + getDayPrice(day), 0);

    const totalMonthlyPrice = totalWeeklyPrice * 4;

    const handleEditDay = (dayId: string) => {
        const schedule = perDaySchedules.find((d) => d.dayId === dayId);
        setTempSchedule({ ...schedule });
        setEditingDay(dayId);
    };

    const handleSaveDay = () => {
        if (editingDay && tempSchedule) {
            updatePerDaySchedule(editingDay, tempSchedule);
            setEditingDay(null);
            setTempSchedule(null);
        }
    };

    const handleToggleDay = (dayId: string, enabled: boolean) => {
        updatePerDaySchedule(dayId, { enabled });
    };

    return (
        <>
            <div className={cn("space-y-4", className)}>
                <div className="flex items-center justify-between">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                        Per Day Schedule
                    </label>
                    <button
                        onClick={openPerDayModal}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                        <HiOutlinePencil size={14} />
                        Edit Schedule
                    </button>
                </div>

                {/* Weekly Summary Cards */}
                <div className="grid grid-cols-7 gap-1">
                    {DAYS.map((day) => {
                        const schedule = perDaySchedules.find(
                            (d) => d.dayId === day.id
                        );
                        const isEnabled = schedule?.enabled;
                        const volume = schedule?.volume || "1l";
                        const price = getDayPrice(schedule || { volume: "1l" });

                        return (
                            <div
                                key={day.id}
                                className={cn(
                                    "flex flex-col items-center p-2 rounded-lg transition-all",
                                    isEnabled
                                        ? "bg-primary-container/20 border border-primary-container/30"
                                        : "bg-surface-container-low opacity-50"
                                )}
                            >
                                <span className="text-xs font-bold">
                                    {day.short}
                                </span>
                                <span className="text-[10px] font-medium mt-1">
                                    {getVolumeLabel(volume).split(" ")[0]}
                                </span>
                                <span className="text-[9px] text-primary font-bold mt-0.5">
                                    ${price.toFixed(2)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Total Summary */}
                <div className="pt-2 border-t border-outline-variant/10">
                    <div className="flex justify-between text-sm">
                        <span className="text-on-surface-variant">
                            Weekly Total
                        </span>
                        <span className="font-bold text-primary">
                            ${totalWeeklyPrice.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-on-surface-variant">
                            Monthly Total
                        </span>
                        <span className="font-bold text-lg text-primary">
                            ${totalMonthlyPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Per Day Schedule Edit Modal */}
            <Modal
                isOpen={isPerDayModalOpen}
                onClose={closePerDayModal}
                title="Customize Daily Schedule"
                size="lg"
            >
                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                    {DAYS.map((day) => {
                        const schedule = perDaySchedules.find(
                            (d) => d.dayId === day.id
                        );
                        const isEditing = editingDay === day.id;

                        return (
                            <div
                                key={day.id}
                                className={cn(
                                    "p-4 rounded-xl transition-all",
                                    schedule?.enabled
                                        ? "bg-surface-container-low"
                                        : "bg-surface-container-low/50 opacity-70"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                handleToggleDay(
                                                    day.id,
                                                    !schedule?.enabled
                                                )
                                            }
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                                schedule?.enabled
                                                    ? "bg-primary text-white"
                                                    : "bg-surface-container-high text-on-surface-variant"
                                            )}
                                        >
                                            {schedule?.enabled ? (
                                                <HiOutlineCheck size={18} />
                                            ) : (
                                                <span className="text-xs">
                                                    ✕
                                                </span>
                                            )}
                                        </button>
                                        <div>
                                            <h4 className="font-bold text-on-surface">
                                                {day.name}
                                            </h4>
                                            {schedule?.enabled && (
                                                <p className="text-xs text-on-surface-variant">
                                                    {getVolumeLabel(
                                                        schedule?.volume || "1l"
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {schedule?.enabled && (
                                        <div className="flex items-center gap-3">
                                            {!isEditing ? (
                                                <>
                                                    <span className="font-bold text-primary">
                                                        $
                                                        {getDayPrice(
                                                            schedule
                                                        ).toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleEditDay(
                                                                day.id
                                                            )
                                                        }
                                                        className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                                                    >
                                                        <HiOutlinePencil
                                                            size={16}
                                                        />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={
                                                            tempSchedule?.volume ||
                                                            "1l"
                                                        }
                                                        onChange={(e) =>
                                                            setTempSchedule({
                                                                ...tempSchedule,
                                                                volume: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="px-3 py-2 rounded-lg bg-surface-container-high border-none focus:ring-2 focus:ring-primary text-sm"
                                                    >
                                                        {useDeliverySubscriptionStore
                                                            .getState()
                                                            .volumes.map(
                                                                (vol) => (
                                                                    <option
                                                                        key={
                                                                            vol.id
                                                                        }
                                                                        value={
                                                                            vol.id
                                                                        }
                                                                    >
                                                                        {
                                                                            vol.label
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                    </select>
                                                    <button
                                                        onClick={handleSaveDay}
                                                        className="p-2 bg-primary text-white rounded-lg hover:brightness-110"
                                                    >
                                                        <HiOutlineCheck
                                                            size={16}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/10 mt-4">
                    <button
                        onClick={closePerDayModal}
                        className="px-6 py-2 rounded-lg border-2 border-outline-variant text-on-surface-variant font-medium hover:bg-surface-container-low"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};
