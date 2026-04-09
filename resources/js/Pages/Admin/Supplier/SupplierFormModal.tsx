import React, { useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { RiCloseLargeLine } from "react-icons/ri";
import { ImageItem } from "@/Components/UI/ImageUpload";
import { SupplierFormWidget } from "@/Widgets/SupplierFormWidget";

interface Supplier {
    id: number | string;
    name: string;
    email: string;
    phone: string;
    image: string;
    type: string;
}

interface SupplierFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Supplier | null;
}

export const SupplierFormModal: React.FC<SupplierFormModalProps> = ({
    isOpen,
    onClose,
    initialData,
}) => {
    const { data, setData, processing, errors, reset, clearErrors, setError } =
        useForm({
            name: "",
            email: "",
            contact:"",
            phone: "",
            type: "",
            images: [] as ImageItem[],
        });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setData({
                    name: initialData.name || "",
                    email: initialData.email || "",
                    phone: initialData.phone || "",
                    type: initialData.type || "",
                    images: initialData.image
                        ? [
                              {
                                  id: "existing-logo",
                                  url: initialData.image,
                                  isMain: true,
                                  isDeleted: false,
                              },
                          ]
                        : [],
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const logoFile =
            data.images.find((img) => img.file && !img.isDeleted)?.file || null;
        const isLogoDeleted = data.images.some(
            (img) => img.isDeleted && !img.file
        );

        const payload: any = {
            name: data.name,
            email: data.email,
            contact: data.contact,
            phone: data.phone,
            type: data.type,
            logo: logoFile,
            removeExistingLogo: isLogoDeleted ? 1 : 0,
        };

        if (initialData?.id) {
            payload["_method"] = "PUT";
        }

        const url = initialData?.id
            ? route("admin.suppliers.update", initialData.id)
            : route("admin.suppliers.store");

        router.post(url, payload, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (err) => {
                Object.keys(err).forEach((key: any) => setError(key, err[key]));
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
                <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-on-surface">
                        {initialData ? "Edit Supplier" : "Add New Supplier"}
                    </h3>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-2 rounded-full"
                    >
                        <RiCloseLargeLine className="w-5 h-5" />
                    </Button>
                </div>
                <div className="overflow-y-auto flex-1 px-6 py-12">
                    <SupplierFormWidget
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSave={handleSubmit}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    );
};
