import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { RiCloseLargeLine } from "react-icons/ri";
import { Product } from "@/types";
import { ProductFormWidget } from "@/Widgets/ProductFormWidget";
import { ImageItem } from "@/Components/ImageUpload";

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
    isOpen,
    onClose,
    initialData,
}) => {
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            price: 0,
            unit: "",
            images: [] as ImageItem[],
            description: "",
            category: "",
            inStock: true,
            isPopular: false,
            isFeatured: false,
            badge: "",
        });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setData({
                    name: initialData.name || "",
                    price: initialData.price || 0,
                    unit: initialData.unit || "",
                    images: initialData.images
                        ? initialData.images.map((img, index) => ({
                              id: img.id || `existing-${index}`,
                              url: img.url,
                              isMain: img.is_main || index === 0,
                          }))
                        : [],
                    description: initialData.description || "",
                    category: initialData.category || "",
                    inStock: initialData.inStock ?? true,
                    isPopular: initialData.isPopular ?? false,
                    isFeatured: initialData.isFeatured ?? false,
                    badge: initialData.badge || "",
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        // Create FormData for proper file upload
        const formData = new FormData();

        // Add basic fields
        formData.append("name", data.name);
        formData.append("price", String(data.price));
        formData.append("unit", data.unit);
        formData.append("description", data.description || "");
        formData.append("category", data.category);
        formData.append("isPopular", String(data.isPopular));
        formData.append("isFeatured", String(data.isFeatured));
        formData.append("badge", data.badge || "");

        // Separate existing images (URLs) from new files
        const existingImages: string[] = [];
        const newFiles: File[] = [];

        data.images.forEach((img) => {
            if (img.file instanceof File) {
                newFiles.push(img.file);
            } else if (img.url && typeof img.url === "string") {
                existingImages.push(img.url);
            }
        });

        // Add existing images as JSON
        if (existingImages.length > 0) {
            formData.append("existing_images", JSON.stringify(existingImages));
        }

        // Add new files as product_images[] (flattened array)
        newFiles.forEach((file) => {
            formData.append("product_images[]", file);
        });

        // Add main image index
        const mainImageIndex = data.images.findIndex((img) => img.isMain);
        if (mainImageIndex !== -1) {
            formData.append("main_image_index", String(mainImageIndex));
        }

        // Debug log
        console.log("Submitting:", {
            newFiles: newFiles.length,
            existingImages: existingImages.length,
            formDataEntries: Array.from(formData.entries()),
        });

        if (initialData?.id) {
            formData.append("_method", "PUT");
            post(route("admin.inventory.products.update", initialData.id), {
                data: formData,
                forceFormData: true,
            });
        } else {
            post(route("admin.inventory.products.store"), {
                data: formData,
                forceFormData: true,
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
                <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface">
                        {initialData ? "Edit Product" : "Add New Product"}
                    </h3>
                    <Button
                        variant="ghost"
                        className="p-2 rounded-full"
                        onClick={onClose}
                    >
                        <RiCloseLargeLine className="w-5 h-5" />
                    </Button>
                </div>
                <div className="overflow-y-auto flex-1 px-6 py-6 scrollbar-thin">
                    <ProductFormWidget
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

export default ProductFormModal;
