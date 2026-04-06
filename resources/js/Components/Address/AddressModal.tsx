import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { AddressFormWidget } from "@/Widgets/AddressFormWidget";
import { Address } from "@/types";
import Button from "../UI/Button";
import { RiCloseLargeLine } from "react-icons/ri";

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    deliveryFee?: number;
    initialData?: Address | null;
}

export const AddAddressModal: React.FC<AddAddressModalProps> = ({
    isOpen,
    onClose,
    deliveryFee = 100,
    initialData,
}) => {
    
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: initialData?.name || "",
            type: initialData?.type || "home",
            county: initialData?.county || "Nairobi",
            estate: initialData?.estate || "",
            street: initialData?.street || "",
            house_number: initialData?.house_number || "",
            land_mark: initialData?.land_mark || "",
            phone_number: initialData?.phone_number || "",
            delivery_instructions: initialData?.delivery_instructions || "",
            is_default: initialData?.is_default || false,
        });

    // 2. Sync form data when initialData changes (e.g., switching from Add to Edit)

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setData({
                    name: initialData.name,
                    type: initialData.type,
                    county: initialData.county,
                    estate: initialData.estate,
                    street: initialData.street,
                    house_number: initialData.house_number,
                    land_mark: initialData.land_mark || "",
                    phone_number: initialData.phone_number,
                    delivery_instructions: initialData.delivery_instructions || "",
                    is_default: initialData.is_default,
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    // 3. Handle the actual server submission
    const handleSave = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (initialData?.id) {
            // Update existing
            put(route("settings.address.update", initialData.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                preserveScroll: true,
            });
        } else {
            // Create new
            post(route("settings.address.store"), {
                onSuccess: () => {
                    reset();
                    onClose();  
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface">
                        {initialData ? "Edit Address" : "Add New Address"}
                    </h3>
                    <Button variant="ghost" className="p-2 border-0 text-2xl font-bold" onClick={onClose}>
                        <RiCloseLargeLine />
                    </Button>
                </div>

                <div className="overflow-y-auto pb md:p-6 scrollbar-hidden">
                    <AddressFormWidget
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSave={handleSave}
                        onClose={onClose}
                        deliveryFee={deliveryFee}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddAddressModal;
