// CategoryModal.tsx
import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { RiCloseLargeLine, RiAddLine } from "react-icons/ri";
import { cn } from "@/Utils/helpers";

interface Category {
    id: number;
    label: string;
    description: string | null;
}

interface CategoryModalProps {
    isOpen: Boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory?: string | null;
    onSelectCategory?: (categoryName: string) => void;
    onCategoryCreated?: (newCategory: {name:string,  description:string}) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose,
    categories,
    selectedCategory = null,
    onSelectCategory,
    onCategoryCreated,
}) => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDescription, setNewCategoryDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { processing } = useForm({});

    const handleSelectCategory = (categoryName: string) => {
        if (onSelectCategory) {
            onSelectCategory(categoryName);
        }
        onClose();
    };

    const handleAddNewCategory = async () => {
        if (!newCategoryName.trim()) {
            setError("Category name is required");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Replace with your actual API endpoint
            const response = await fetch(route("admin.inventory.categories.store"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
                },
                body: JSON.stringify({
                    name: newCategoryName.trim(),
                    description: newCategoryDescription.trim() || null,
                }),
            });

            const data = await response.json();

            if (data.success && data.category) {
                // Call the callback with the new category
                if (onCategoryCreated) {
                    onCategoryCreated(data.category);
                }
                
                // Auto-select the new category
                if (onSelectCategory) {
                    onSelectCategory(data.category.name);
                }
                
                // Reset form and close
                resetNewCategoryForm();
                onClose();
            } else {
                setError(data.message || "Failed to create category");
            }
        } catch (err) {
            setError("An error occurred while creating the category");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetNewCategoryForm = () => {
        setNewCategoryName("");
        setNewCategoryDescription("");
        setIsAddingNew(false);
        setError(null);
    };

    const handleCancelAdd = () => {
        resetNewCategoryForm();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
                {/* Header */}
                <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-on-surface">
                        Product Categories
                    </h3>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-2 rounded-full"
                    >
                        <RiCloseLargeLine className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 px-6 py-6">
                    {/* Categories Row */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-on-surface-variant mb-3">
                            Available Categories
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={()=>{}}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        selectedCategory === category.label
                                            ? "bg-primary text-white shadow-md scale-105"
                                            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-lowest hover:shadow-sm"
                                    )}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add New Category Section */}
                    {!isAddingNew ? (
                        <button
                            onClick={() => setIsAddingNew(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 group"
                        >
                            <RiAddLine className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-primary">
                                Add New Category
                            </span>
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="e.g., Bakery, Dairy, Beverages"
                                    className="w-full px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={newCategoryDescription}
                                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                                    placeholder="Brief description of the category"
                                    rows={2}
                                    className="w-full px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface resize-none"
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-error bg-error/10 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleAddNewCategory}
                                    disabled={isSubmitting || !newCategoryName.trim()}
                                    className="flex-1"
                                >
                                    {isSubmitting ? "Creating..." : "Create Category"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCancelAdd}
                                    disabled={isSubmitting}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;