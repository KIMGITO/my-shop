import React, { useState } from "react";
import { cn } from "@/Utils/helpers";
import { useDeliverySubscriptionStore } from "@/Stores/useDeliverySubscriptionStore";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import Modal from "@/Components/UI/Modal";

interface CustomVolumeSelectorProps {
    className?: string;
    onVolumeAdd?: (volume: any) => void;
}

export const CustomVolumeSelector: React.FC<CustomVolumeSelectorProps> = ({
    className,
    onVolumeAdd,
}) => {
    const { volumes, selectedVolume, setSelectedVolume } =
        useDeliverySubscriptionStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [customVolumes, setCustomVolumes] = useState<any[]>([]);
    const [newVolume, setNewVolume] = useState({
        label: "",
        ml: 500,
        priceMultiplier: 0.8,
    });

    const allVolumes = [...volumes, ...customVolumes];

    const handleAddCustomVolume = () => {
        if (!newVolume.label) return;

        const volume = {
            id: `custom_${Date.now()}`,
            label: newVolume.label,
            value: newVolume.label,
            priceMultiplier: newVolume.priceMultiplier,
            ml: newVolume.ml,
        };

        setCustomVolumes((prev) => [...prev, volume]);
        onVolumeAdd?.(volume);
        setIsAddModalOpen(false);
        setNewVolume({ label: "", ml: 500, priceMultiplier: 0.8 });
    };

    const handleRemoveCustomVolume = (volumeId: string) => {
        setCustomVolumes((prev) => prev.filter((v) => v.id !== volumeId));
        if (selectedVolume === volumeId) {
            setSelectedVolume("1l");
        }
    };

    return (
        <>
            <div className={cn("space-y-4", className)}>
                <div className="flex items-center justify-between">
                    <label className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                        Volume Preference
                    </label>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                        <HiOutlinePlus size={14} />
                        Add Custom
                    </button>
                </div>

                {/* Volume Options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {allVolumes.map((option) => {
                        const isCustom = option.id.startsWith("custom_");
                        return (
                            <div key={option.id} className="relative">
                                <button
                                    onClick={() => setSelectedVolume(option.id)}
                                    className={cn(
                                        "w-full flex flex-col items-center p-3 rounded-xl transition-all border-2",
                                        selectedVolume === option.id
                                            ? "border-primary-container bg-surface-container-lowest shadow-md"
                                            : "border-transparent bg-surface-container-low hover:bg-surface-container"
                                    )}
                                >
                                    <span className="font-bold text-sm">
                                        {option.label}
                                    </span>
                                    {option.ml && (
                                        <span className="text-[10px] text-on-surface-variant">
                                            {option.ml}ml
                                        </span>
                                    )}
                                </button>
                                {isCustom && (
                                    <button
                                        onClick={() =>
                                            handleRemoveCustomVolume(option.id)
                                        }
                                        className="absolute -top-2 -right-2 p-1 bg-error text-white rounded-full hover:bg-error/80 transition-colors"
                                    >
                                        <HiOutlineTrash size={10} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Add Custom Volume Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add Custom Volume"
                size="sm"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-on-surface mb-2">
                            Volume Name
                        </label>
                        <input
                            type="text"
                            value={newVolume.label}
                            onChange={(e) =>
                                setNewVolume({
                                    ...newVolume,
                                    label: e.target.value,
                                })
                            }
                            placeholder="e.g., 750ml, 1.5 Litres"
                            className="w-full px-4 py-2 rounded-lg bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-on-surface mb-2">
                            Quantity (ml)
                        </label>
                        <input
                            type="number"
                            value={newVolume.ml}
                            onChange={(e) =>
                                setNewVolume({
                                    ...newVolume,
                                    ml: parseInt(e.target.value),
                                })
                            }
                            className="w-full px-4 py-2 rounded-lg bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-on-surface mb-2">
                            Price Multiplier
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={newVolume.priceMultiplier}
                            onChange={(e) =>
                                setNewVolume({
                                    ...newVolume,
                                    priceMultiplier: parseFloat(e.target.value),
                                })
                            }
                            className="w-full px-4 py-2 rounded-lg bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface"
                        />
                        <p className="text-xs text-on-surface-variant mt-1">
                            Base price: $
                            {useDeliverySubscriptionStore.getState().basePrice}{" "}
                            × multiplier
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 py-2 px-4 rounded-lg border-2 border-outline-variant text-on-surface-variant font-medium hover:bg-surface-container-low"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddCustomVolume}
                            className="flex-1 py-2 px-4 rounded-lg bg-primary text-on-primary font-medium hover:brightness-110"
                            disabled={!newVolume.label}
                        >
                            Add Volume
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
