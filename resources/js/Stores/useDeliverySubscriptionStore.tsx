import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DaySchedule {
    dayId: string;
    dayName: string;
    enabled: boolean;
    volume: string;
    productId?: number;
    customPrice?: number;
}

export interface Volume {
    id: string;
    label: string;
    value: string;
    priceMultiplier: number;
    ml?: number;
}

export interface Frequency {
    id: string;
    label: string;
    icon: string;
    description?: string;
    customDays?: DaySchedule[];
}

export interface SubscriptionState {
    // State
    selectedFrequency: string;
    selectedVolume: string;
    customFrequency: Frequency | null;
    frequencies: Frequency[];
    volumes: Volume[];
    isCustomModalOpen: boolean;
    isPerDayModalOpen: boolean;
    perDaySchedules: DaySchedule[];
    basePrice: number;

    // Actions
    setSelectedFrequency: (frequencyId: string) => void;
    setSelectedVolume: (volumeId: string) => void;
    setCustomFrequency: (frequency: Frequency) => void;
    updatePerDaySchedule: (
        dayId: string,
        updates: Partial<DaySchedule>
    ) => void;
    openCustomModal: () => void;
    closeCustomModal: () => void;
    openPerDayModal: () => void;
    closePerDayModal: () => void;
    resetToDefault: () => void;
}

const defaultVolumes: Volume[] = [
    {
        id: "250ml",
        label: "250ml",
        value: "250ml",
        priceMultiplier: 0.5,
        ml: 250,
    },
    {
        id: "500ml",
        label: "500ml",
        value: "500ml",
        priceMultiplier: 0.8,
        ml: 500,
    },
    {
        id: "1l",
        label: "1 Litre",
        value: "1 Litre",
        priceMultiplier: 1,
        ml: 1000,
    },
    {
        id: "2l",
        label: "2 Litres",
        value: "2 Litres",
        priceMultiplier: 1.8,
        ml: 2000,
    },
];

const defaultFrequencies: Frequency[] = [
    {
        id: "daily",
        label: "Daily",
        icon: "calendar_today",
        description: "Every day delivery",
    },
    {
        id: "weekdays",
        label: "Mon - Fri",
        icon: "work",
        description: "Weekday deliveries only",
    },
    {
        id: "weekends",
        label: "Weekends",
        icon: "weekend",
        description: "Saturday & Sunday",
    },
    {
        id: "per_day",
        label: "Per Day",
        icon: "tune",
        description: "Custom volume per day",
    },
    {
        id: "custom",
        label: "Custom",
        icon: "schedule",
        description: "Set your own schedule",
    },
];

export const useDeliverySubscriptionStore = create<SubscriptionState>()(
    persist(
        (set) => ({
            // Initial state
            selectedFrequency: "weekdays",
            selectedVolume: "1l",
            customFrequency: null,
            frequencies: defaultFrequencies,
            volumes: defaultVolumes,
            isCustomModalOpen: false,
            isPerDayModalOpen: false,
            basePrice: 6.5,

            perDaySchedules: [
                {
                    dayId: "mon",
                    dayName: "Monday",
                    enabled: true,
                    volume: "1l",
                },
                {
                    dayId: "tue",
                    dayName: "Tuesday",
                    enabled: true,
                    volume: "1l",
                },
                {
                    dayId: "wed",
                    dayName: "Wednesday",
                    enabled: true,
                    volume: "1l",
                },
                {
                    dayId: "thu",
                    dayName: "Thursday",
                    enabled: true,
                    volume: "1l",
                },
                {
                    dayId: "fri",
                    dayName: "Friday",
                    enabled: true,
                    volume: "1l",
                },
                {
                    dayId: "sat",
                    dayName: "Saturday",
                    enabled: false,
                    volume: "1l",
                },
                {
                    dayId: "sun",
                    dayName: "Sunday",
                    enabled: false,
                    volume: "1l",
                },
            ],

            // Actions
            setSelectedFrequency: (frequencyId) =>
                set({ selectedFrequency: frequencyId }),
            setSelectedVolume: (volumeId) => set({ selectedVolume: volumeId }),

            setCustomFrequency: (frequency) =>
                set({
                    customFrequency: frequency,
                    selectedFrequency: "custom",
                }),

            updatePerDaySchedule: (dayId, updates) =>
                set((state) => ({
                    perDaySchedules: state.perDaySchedules.map((day) =>
                        day.dayId === dayId ? { ...day, ...updates } : day
                    ),
                })),

            openCustomModal: () => set({ isCustomModalOpen: true }),
            closeCustomModal: () => set({ isCustomModalOpen: false }),

            openPerDayModal: () => set({ isPerDayModalOpen: true }),
            closePerDayModal: () => set({ isPerDayModalOpen: false }),

            resetToDefault: () =>
                set({
                    selectedFrequency: "weekdays",
                    selectedVolume: "1l",
                    customFrequency: null,
                    perDaySchedules: [
                        {
                            dayId: "mon",
                            dayName: "Monday",
                            enabled: true,
                            volume: "1l",
                        },
                        {
                            dayId: "tue",
                            dayName: "Tuesday",
                            enabled: true,
                            volume: "1l",
                        },
                        {
                            dayId: "wed",
                            dayName: "Wednesday",
                            enabled: true,
                            volume: "1l",
                        },
                        {
                            dayId: "thu",
                            dayName: "Thursday",
                            enabled: true,
                            volume: "1l",
                        },
                        {
                            dayId: "fri",
                            dayName: "Friday",
                            enabled: true,
                            volume: "1l",
                        },
                        {
                            dayId: "sat",
                            dayName: "Saturday",
                            enabled: false,
                            volume: "1l",
                        },
                        {
                            dayId: "sun",
                            dayName: "Sunday",
                            enabled: false,
                            volume: "1l",
                        },
                    ],
                    isCustomModalOpen: false,
                    isPerDayModalOpen: false,
                }),
        }),
        {
            name: "subscription-storage",
        }
    )
);

