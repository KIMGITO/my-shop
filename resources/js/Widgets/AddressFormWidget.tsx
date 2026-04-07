import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { cn } from "@/lib/utils";
import {
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineBuildingOffice,
    HiOutlineMapPin,
    HiOutlinePhone,
} from "react-icons/hi2";

// ... (Props interface stays the same)

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
        <form
            onSubmit={onSave}
            className="p-4 md:p-6 md:pb-0 space-y-4 md:space-y-5"
        >
            <Input
                label="Address Name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                Icon={HiOutlineHome}
                error={errors.name}
                disabled={processing}
            />

            {/* ... other inputs use setData("field", value) ... */}

            <div className="flex gap-4 mb-6 sticky -bottom-6 bg-surface-container-lowest pt-2">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1"
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
