// resources/js/Widgets/AddressFormWidget.tsx
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { KENYAN_COUNTIES } from "@/Data/DeliveryData";
import { cn } from "@/lib/utils";
import { Address } from "@/types";
import { useState } from "react";
import {
    HiOutlineOfficeBuilding,
    HiOutlineLocationMarker,
} from "react-icons/hi";
import {
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineBuildingOffice,
    HiOutlineMapPin,
    HiOutlinePhone,
} from "react-icons/hi2";

interface AddressFormWidgetProps {
    onSave: (address: Partial<Address>) => void;
    onClose: () => void;
    deliveryFee?: number;
    initialData?: Partial<Address>;
}

export const AddressFormWidget: React.FC<AddressFormWidgetProps> = ({
    onSave,
    onClose,
    deliveryFee = 100,
    initialData,
}) => {
    const [formData, setFormData] = useState<Partial<Address>>(
        initialData || {
            name: "",
            type: "home",
            county: "Nairobi",
            estate: "",
            street: "",
            houseNumber: "",
            landmark: "",
            phone: "",
            instructions: "",
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Address name is required";
        if (!formData.county) newErrors.county = "County is required";
        if (!formData.estate) newErrors.estate = "Estate/Area is required";
        if (!formData.street) newErrors.street = "Street/Road is required";
        if (!formData.houseNumber)
            newErrors.houseNumber = "House/Apartment number is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        else if (!/^0\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone =
                "Enter a valid Kenyan phone number (e.g., 0712345678)";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 md:p-6 space-y-4 md:space-y-5"
        >
            {/* Address Name */}
            <Input
                label="Address Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Home, Office, Mama's Place"
                icon={<HiOutlineHome className="text-lg" />}
                error={errors.name}
            />

            {/* Address Type */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Address Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                        {
                            id: "home",
                            label: "Home",
                            icon: <HiOutlineHome className="text-lg" />,
                        },
                        {
                            id: "office",
                            label: "Office",
                            icon: (
                                <HiOutlineOfficeBuilding className="text-lg" />
                            ),
                        },
                        {
                            id: "cottage",
                            label: "Cottage",
                            icon: <HiOutlineHomeModern className="text-lg" />,
                        },
                        {
                            id: "other",
                            label: "Other",
                            icon: (
                                <HiOutlineLocationMarker className="text-lg" />
                            ),
                        },
                    ].map((type) => (
                        <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    type: type.id as any,
                                })
                            }
                            className={cn(
                                "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                                formData.type === type.id
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container-low text-on-surface-variant"
                            )}
                        >
                            {type.icon}
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* County Selection */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    County
                </label>
                <select
                    value={formData.county}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            county: e.target.value,
                        })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface"
                >
                    {KENYAN_COUNTIES.map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>
                {errors.county && (
                    <p className="text-error text-xs mt-1">{errors.county}</p>
                )}
            </div>

            {/* Estate and Street */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Estate/Area"
                    value={formData.estate}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            estate: e.target.value,
                        })
                    }
                    placeholder="e.g., Kilimani Estate"
                    icon={<HiOutlineBuildingOffice className="text-lg" />}
                    error={errors.estate}
                />
                <Input
                    label="Street/Road"
                    value={formData.street}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            street: e.target.value,
                        })
                    }
                    placeholder="e.g., Argwings Kodhek Road"
                    icon={<HiOutlineMapPin className="text-lg" />}
                    error={errors.street}
                />
            </div>

            {/* House Number and Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="House/Apartment Number"
                    value={formData.houseNumber}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            houseNumber: e.target.value,
                        })
                    }
                    placeholder="e.g., The Mirage, Apt 3B, Plot 1246"
                    icon={<HiOutlineBuildingOffice className="text-lg" />}
                    error={errors.houseNumber}
                />
                <Input
                    label="Landmark (Optional)"
                    value={formData.landmark}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            landmark: e.target.value,
                        })
                    }
                    placeholder="e.g., Opposite Yaya Centre"
                    icon={<HiOutlineLocationMarker className="text-lg" />}
                />
            </div>

            {/* Phone Number */}
            <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="e.g., 0712345678"
                icon={<HiOutlinePhone className="text-lg" />}
                error={errors.phone}
            />

            {/* Delivery Fee Display */}
            <div className="p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface-variant">
                        Delivery Fee
                    </span>
                    <span className="text-lg font-bold text-primary">
                        KSH {deliveryFee}
                    </span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-1">
                    *Free delivery on orders over KSH 2000
                </p>
            </div>

            {/* Delivery Instructions */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Delivery Instructions (Optional)
                </label>
                <textarea
                    value={formData.instructions}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            instructions: e.target.value,
                        })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface text-sm"
                    placeholder="Gate code, security contacts, preferred delivery spot, etc."
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
                <Button onClick={onClose} variant="outline" className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                    Save Address
                </Button>
            </div>
        </form>
    );
};

export default AddressFormWidget;
