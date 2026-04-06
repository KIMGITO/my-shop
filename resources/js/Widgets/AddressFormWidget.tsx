import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { KENYAN_COUNTIES } from "@/Data/DeliveryData";
import { cn } from "@/lib/utils";
import { Address } from "@/types";
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
    data: any; 
    setData: Function; 
    errors: any; 
    processing: boolean;
    onSave: (e: React.FormEvent) => void;
    onClose: () => void;
    deliveryFee?: number;
}

export const AddressFormWidget: React.FC<AddressFormWidgetProps> = ({
    data,
    setData,
    errors,
    processing,
    onSave,
    onClose,
    deliveryFee = 100,
}) => {
    return (
        <form onSubmit={onSave} className="p-4 md:p-6 md:pb-0 space-y-4 md:space-y-5">
            {/* Address Name */}
            <Input
                label="Address Name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="e.g., Home, Office, Mama's Place"
                Icon={HiOutlineHome}
                error={errors.name}
                disabled={processing}
            />

            {/* Address Type */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Address Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                        { id: "home", label: "Home", icon: <HiOutlineHome /> },
                        {
                            id: "office",
                            label: "Office",
                            icon: <HiOutlineOfficeBuilding />,
                        },
                        {
                            id: "cottage",
                            label: "Cottage",
                            icon: <HiOutlineHomeModern />,
                        },
                        {
                            id: "other",
                            label: "Other",
                            icon: <HiOutlineLocationMarker />,
                        },
                    ].map((type) => (
                        <button
                            key={type.id}
                            type="button"
                            disabled={processing}
                            onClick={() => setData("type", type.id)}
                            className={cn(
                                "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                                data.type === type.id
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-medium"
                            )}
                        >
                            {type.icon}
                            {type.label}
                        </button>
                    ))}
                </div>
                {errors.type && (
                    <p className="text-error text-xs mt-1">{errors.type}</p>
                )}
            </div>

            {/* County Selection */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    County
                </label>
                <select
                    value={data.county}
                    disabled={processing}
                    onChange={(e) => setData("county", e.target.value)}
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
                    value={data.estate}
                    onChange={(e) => setData("estate", e.target.value)}
                    placeholder="e.g., Kilimani Estate"
                    Icon={HiOutlineBuildingOffice}
                    error={errors.estate}
                    disabled={processing}
                />
                <Input
                    label="Street/Road"
                    value={data.street}
                    onChange={(e) => setData("street", e.target.value)}
                    placeholder="e.g., Argwings Kodhek Road"
                    Icon={HiOutlineMapPin}
                    error={errors.street}
                    disabled={processing}
                />
            </div>

            {/* House Number and Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="House/Apartment Number"
                    value={data.house_number}
                    onChange={(e) => setData("house_number", e.target.value)}
                    placeholder="e.g., Apt 3B"
                    Icon={HiOutlineBuildingOffice}
                    error={errors.house_number}
                    disabled={processing}
                />
                <Input
                    label="Landmark (Optional)"
                    value={data.land_mark}
                    onChange={(e) => setData("land_mark", e.target.value)}
                    placeholder="e.g., Opposite Yaya Centre"
                    Icon={HiOutlineLocationMarker}
                    error={errors.landmark}
                    disabled={processing}
                />
            </div>

            {/* Phone Number */}
            <Input
                label="Phone Number"
                type="tel"
                value={data.phone_number}
                onChange={(e) => setData("phone_number", e.target.value)}
                placeholder="e.g., 0712345678"
                Icon={HiOutlinePhone}
                error={errors.phone_number}
                disabled={processing}
            />

            {/* Delivery Instructions */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Delivery Instructions (Optional)
                </label>
                <textarea
                    value={data.delivery_instructions}
                    onChange={(e) => setData("delivery_instructions", e.target.value)}
                    disabled={processing}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface text-sm"
                    placeholder="Gate code, security contacts, etc."
                />
                {errors.delivery_instructions && (
                    <p className="text-error text-[12px] mt-1 px-1">
                        {errors.delivery_instructions}
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className=" flex gap-4 mb-6  sticky -bottom-6 ">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 bg-secondary"
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={processing}
                    loading={processing}
                >
                    {data.id ? "Update Address" : "Save Address"}
                </Button>
            </div>
        </form>
    );
};

export default AddressFormWidget;
