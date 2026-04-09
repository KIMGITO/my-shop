import React, { useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { RiCloseLargeLine } from "react-icons/ri";
import { Product } from "@/types";
import { ProductFormWidget } from "@/Widgets/ProductFormWidget";
import { ImageItem } from "@/Components/UI/ImageUpload";
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

            const { data, setData, processing, errors, reset, clearErrors, setError } =
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
                const transformedImages =
                    initialData.images?.map((img, index) => ({
                        id: img.id?.toString() || `existing-${index}`,
                        url: img.url,
                        originalId: img.id,
                        isMain: img.isMain,
                        isDeleted: false,
                    })) || [];

                setData({
                    name: initialData.name || "",
                    price: initialData.price || 0,
                    unit: initialData.unit || "",
                    images: transformedImages,
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

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        // 1. Filter and Categorize Images
        const activeImages = data.images.filter((img) => !img.isDeleted);
        const newFiles = activeImages
            .filter((img) => img.file)
            .map((img) => img.file);
        const existingIds = activeImages
            .filter((img) => img.originalId)
            .map((img) => img.originalId);
        const deletedIds = data.images
            .filter((img) => img.isDeleted && img.originalId)
            .map((img) => img.originalId);

        // 2. Identify Main Image (Can be a File or an ID)
        const mainImg =
            activeImages.find((img) => img.isMain) || activeImages[0];
        const mainProductImage = mainImg?.file || null;
        const mainImageId = mainImg?.originalId || null;

        /**
         * 3. Construct the flat payload.
         */
        const payload: any = {
            name: data.name,
            price: data.price,
            unit: data.unit,
            description: data.description,
            category: data.category,
            inStock: data.inStock ? 1 : 0,
            isPopular: data.isPopular ? 1 : 0,
            isFeatured: data.isFeatured ? 1 : 0,
            badge: data.badge,

            productImages: newFiles,
            main_product_image: mainProductImage,

            existing_images: JSON.stringify(existingIds),
            delete_images: JSON.stringify(deletedIds),
            main_image_id: mainImageId,
        };

        if (initialData?.id) {
            payload["_method"] = "PUT";
        }

        const url = initialData?.id
            ? route("admin.inventory.products.update", initialData.id)
            : route("admin.inventory.products.store");

        router.post(url, payload, {
            forceFormData: true,
            onStart: () => clearErrors(),
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
            <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
                <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-on-surface">
                        {initialData ? "Edit Product" : "Add New Product"}
                    </h3>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-2 rounded-full"
                    >
                        <RiCloseLargeLine className="w-5 h-5" />
                    </Button>
                </div>
                <div className="overflow-y-auto flex-1 px-6 py-6">
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