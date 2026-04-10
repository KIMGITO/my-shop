import React from "react";
import Button from "@/Components/UI/Button";
import { SingleImageUpload } from "@/Components/UI/SingleImageUpload";
import { Input } from "@/Components/UI/Input";
import { HiOutlinePhone, HiUser } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { FcFactoryBreakdown } from "react-icons/fc";
import { AiTwotoneMail } from "react-icons/ai";

interface SupplierFormWidgetProps {
    data: any;
    existingImageUrl?: string | null;
    setData: (key: string, value: any) => void;
    errors: any;
    processing: boolean;
    onSave: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const SupplierFormWidget: React.FC<SupplierFormWidgetProps> = ({
    data,
    existingImageUrl,
    setData,
    errors,
    processing,
    onSave,
    onClose,
}) => {
    return (
        <form onSubmit={onSave} className="space-y-6">
            <div className="space-y-4">
                <SingleImageUpload
                    // Pass the DB URL for display, or the new blob if a file is picked
                    value={existingImageUrl}
                    onFileChange={(file) => setData("logo", file)}
                    onRemoveExisting={(bool) =>
                        setData("removeExistingLogo", bool)
                    }
                    label="Supplier Logo"
                    error={errors.logo}
                    disabled={processing}
                />

                <Input
                    label="Company Name"
                    value={data.name}
                    placeholder="e.g 2&8 Daily"
                    onChange={(e) => setData("name", e.target.value)}
                    Icon={FcFactoryBreakdown}
                    error={errors.name}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g 2and8daily@company.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        Icon={AiTwotoneMail}
                        error={errors.email}
                    />
                    <Input
                        label="Phone Number"
                        value={data.phone}
                        placeholder="e.g 0700123456"
                        onChange={(e) => setData("phone", e.target.value)}
                        Icon={HiOutlinePhone}
                        error={errors.phone}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Contact Person"
                        value={data.contact}
                        placeholder="e.g James Mwangi"
                        onChange={(e) => setData("contact", e.target.value)}
                        Icon={HiUser}
                        error={errors.contact}
                    />
                    <Input
                        label="Supplier Type"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        Icon={MdOutlineCategory}
                        placeholder="e.g. Dairy, Grain, Poultry"
                        error={errors.type}
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-outline-variant/10">
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
                    loading={processing}
                >
                    {data.id ? "Update Supplier" : "Save Supplier"}
                </Button>
            </div>
        </form>
    );
};
