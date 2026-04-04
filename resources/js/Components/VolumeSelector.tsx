// components/Subscription/VolumeSelector.tsx
import React from "react";
import { cn } from "@/Utils/helpers";
import { useDeliverySubscriptionStore } from "@/Stores/useDeliverySubscriptionStore";
import { CustomVolumeSelector } from "./CustomVolumeSelector";

interface VolumeSelectorProps {
    basePrice?: number;
    className?: string;
}

export const VolumeSelector: React.FC<VolumeSelectorProps> = ({
    basePrice = 6.5,
    className,
}) => {
    const { volumes, selectedVolume, setSelectedVolume } =
        useDeliverySubscriptionStore();

    const selectedVol = volumes.find((v) => v.id === selectedVolume);
    const currentPrice = basePrice * (selectedVol?.priceMultiplier || 1);

    return (
        <div className={cn("space-y-4", className)}>
            <CustomVolumeSelector />

            {/* Price Display */}
            <div className="mt-3 text-right">
                <p className="text-sm text-on-surface-variant">
                    Total:{" "}
                    <span className="font-bold text-primary text-lg">
                        ${currentPrice.toFixed(2)}
                    </span>
                </p>
            </div>
        </div>
    );
};
