import React, { useState } from "react";
import Input from "@/Components/UI/Input";

interface AddressFormProps {
    onSubmit?: (data: any) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const [address, setAddress] = useState({
        fullName: "",
        address: "",
        city: "",
        phone: "",
    });

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">
                    local_shipping
                </span>
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                    Shipping/Delivery Address
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <Input
                        label="Full Name"
                        value={address.fullName}
                        onChange={(e) =>
                            setAddress({ ...address, fullName: e.target.value })
                        }
                        placeholder="Jane Doe"
                    />
                </div>
                <div className="md:col-span-2">
                    <Input
                        label="Address"
                        value={address.address}
                        onChange={(e) =>
                            setAddress({ ...address, address: e.target.value })
                        }
                        placeholder="Street name and House number"
                    />
                </div>
                <Input
                    label="City"
                    value={address.city}
                    onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                    }
                    placeholder="Nairobi"
                />
                <Input
                    label="Phone"
                    type="tel"
                    value={address.phone}
                    onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                    }
                    placeholder="+254..."
                />
            </div>
        </section>
    );
};

export default AddressForm;
