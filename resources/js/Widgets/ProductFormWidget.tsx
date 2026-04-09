import { Button } from "@/Components/UI/Button";
import ImageUpload from "@/Components/UI/ImageUpload";
import { Input } from "@/Components/UI/Input";
import { Select } from "@/Components/UI/Select";
import ToggleSwitch from "@/Components/UI/ToggleSwitch";
import { categories } from "@/Data/ProductData";
import { GiPriceTag } from "react-icons/gi";
import { HiOutlineShoppingBag, HiTag } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { TbChartBarPopular, TbRulerMeasure2 } from "react-icons/tb";
import { useEffect } from "react";

interface ProductFormWidgetProps {
    data: any;
    setData: Function;
    errors: any;
    processing: boolean;
    onSave: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const ProductFormWidget: React.FC<ProductFormWidgetProps> = ({
    data,
    setData,
    errors,
    processing,
    onSave,
    onClose,
}) => {
    
    console.log('data for por', data);
    useEffect(() => {
        // When in edit mode and images exist, make sure they have the right structure
        if (data.id && data.images && data.images.length > 0) {
            // Transform server images to include originalId if not already set
            const transformedImages = data.images.map((img: any) => ({
                id: img.id?.toString() || crypto.randomUUID(),
                url: img.url,
                originalId: img.id, // Important for ImageUpload to know it's an existing image
                isMain: img.is_main === 1 || img.is_main === true,
                isDeleted: false,
            }));

            // Only update if the structure is different
            if (!data.images[0]?.originalId) {
                setData("images", transformedImages);
            }
        }
    }, [data.id]);

    const handleCancel = () => {
        // Clean up any blob URLs before closing
        if (data.images) {
            data.images.forEach((image: any) => {
                if (image.url?.startsWith("blob:")) {
                    URL.revokeObjectURL(image.url);
                }
            });
        }

        // Call parent's onClose
        onClose();
    };

    return (
        <form onSubmit={onSave} className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Basic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Product Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="e.g., Fresh Organic Tomatoes"
                        Icon={HiOutlineShoppingBag}
                        error={errors.name}
                        disabled={processing}
                        required
                    />

                    <Input
                        label="Price (KES)"
                        type="number"
                        step="0.01"
                        value={data.price}
                        onChange={(e) =>
                            setData("price", parseFloat(e.target.value))
                        }
                        placeholder="0.00"
                        Icon={GiPriceTag}
                        error={errors.price}
                        disabled={processing}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Unit"
                        value={data.unit}
                        onChange={(e) => setData("unit", e.target.value)}
                        placeholder="e.g., kg, piece, bunch"
                        error={errors.unit}
                        disabled={processing}
                        Icon={TbRulerMeasure2}
                        required
                    />

                    <Select
                        size="sm"
                        label="Category"
                        value={data.category}
                        onChange={(value) => setData("category", value)}
                        options={categories.map((cat) => ({
                            id: cat.slug,
                            value: cat.slug,
                            label: cat.name,
                        }))}
                        placeholder="Select Category"
                        Icon={MdCategory}
                        error={errors.category}
                        disabled={processing}
                        required
                    />
                </div>
            </div>

            <ImageUpload
                value={data.images || []}
                onChange={(images) => setData("images", images)}
                label="Product Images"
                error={errors.images}
                disabled={processing}
                required
                maxFiles={5}
                showMainImageControl={true}
            />

            {/* Description */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Description
                </h4>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                        Product Description
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        disabled={processing}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/20 focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface text-sm"
                        placeholder="Describe the product, its features, origin, etc..."
                    />
                    {errors.description && (
                        <p className="text-error text-xs mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Status & Badges */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Status & Badges
                </h4>
                <div className="space-y-3">
                    <ToggleSwitch
                        label="Popular Product"
                        onChange={(val) => setData("isPopular", val)}
                        value={data.isPopular}
                        size="sm"
                        icon={TbChartBarPopular}
                        disabled={processing}
                    />

                    <ToggleSwitch
                        label="Featured Product"
                        onChange={(val) => setData("isFeatured", val)}
                        value={data.isFeatured}
                        size="sm"
                        icon={HiTag}
                        disabled={processing}
                    />

                    {/* Badge input */}
                    <Input
                        label="Custom Badge (Optional)"
                        value={data.badge}
                        onChange={(e) => setData("badge", e.target.value)}
                        placeholder="e.g., 'New', 'Sale', 'Limited'"
                        error={errors.badge}
                        disabled={processing}
                    />
                </div>
            </div>

            {data?.id && <input type="hidden" name="id" value={data.id} />}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 sticky -bottom-6 bg-surface-container-lowest py-4 -mx-6 px-6 border-t border-outline-variant/10 mt-6">
                <Button
                    type="button"
                    onClick={handleCancel}
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
                    {data.id ? "Update Product" : "Save Product"}
                </Button>
            </div>
        </form>
    );
};
