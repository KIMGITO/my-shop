// resources/js/Components/Settings/AddAddressModal.tsx
import React from "react";
import { AddressFormWidget } from "@/Widgets/AddressFormWidget";
import { Address } from "@/types";

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: Partial<Address>) => void;
    deliveryFee?: number;
    initialData?: Partial<Address>;
}

export const AddAddressModal: React.FC<AddAddressModalProps> = ({
    isOpen,
    onClose,
    onSave,
    deliveryFee = 100,
    initialData,
}) => {
    if (!isOpen) return null;

    const handleSave = (address: Partial<Address>) => {
        onSave(address);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-hidden">
                <div className="sticky top-0 bg-surface-container-lowest px-4 md:px-6 py-4 border-b border-outline-variant/10">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface">
                        {initialData ? "Edit Address" : "Add New Address"}
                    </h3>
                </div>

                <AddressFormWidget
                    onSave={handleSave}
                    onClose={onClose}
                    deliveryFee={deliveryFee}
                    initialData={initialData}
                />
            </div>
        </div>
    );
};

export default AddAddressModal;
