// CategoryModal.tsx
import React, { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { RiCloseLargeLine } from "react-icons/ri";
import { cn } from "@/Utils/helpers";
import { HiPencil } from "react-icons/hi";

interface Category {
    id: number | string;
    name: string;
    description: string | null;
    label?: string;
    count?: number;
}

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory?: string | null;
    editingCategory?: Category | null;
    onSelectCategory?: (categoryName: string) => void;
    onCategoryCreated?: (newCategory: Category) => void;
    onCategoryUpdated?: (updatedCategory: Category) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose,
    categories,
    selectedCategory = null,
    editingCategory = null,
    onSelectCategory,
    onCategoryCreated,
    onCategoryUpdated,
}) => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEditCategory, setSelectedEditCategory] = useState<Category | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: "",
        description: "",
    });

    // Handle editing mode
    useEffect(() => {
        if (editingCategory && isOpen) {
            setIsEditing(true);
            setIsAddingNew(false);
            setSelectedEditCategory(editingCategory);
            setData({
                name: editingCategory.name || "",
                description: editingCategory.description || "",
            });
        } else if (!isOpen) {
            // Reset when modal closes
            resetForm();
        }
    }, [editingCategory, isOpen]);

    const resetForm = () => {
        reset();
        clearErrors();
        setIsAddingNew(false);
        setIsEditing(false);
        setSelectedEditCategory(null);
        setLocalError(null);
    };

    const handleSelectCategory = (categoryName: string) => {
        if (onSelectCategory) {
            onSelectCategory(categoryName);
        }
        onClose();
        resetForm();
    };

    const handleCreateCategory = () => {
        if (!data.name.trim()) {
            setLocalError("Category name is required");
            return;
        }

        post(route("admin.inventory.categories.store"), {
            preserveScroll: true,
            onSuccess: (response) => {
                // @ts-ignore - The response should contain the new category
                const newCategory = response.props?.flash?.category || {
                    id: Date.now(),
                    name: data.name,
                    description: data.description,
                };
                
                if (onCategoryCreated) {
                    onCategoryCreated(newCategory);
                }
                
                // Auto-select the new category
                if (onSelectCategory) {
                    onSelectCategory(data.name);
                }
                
                resetForm();
                onClose();
            },
            onError: (errors) => {
                setLocalError(Object.values(errors)[0] as string);
            },
        });
    };

    const handleUpdateCategory = () => {
        if (!data.name.trim()) {
            setLocalError("Category name is required");
            return;
        }

        if (!selectedEditCategory?.id) {
            setLocalError("No category selected for update");
            return;
        }

        put(route("admin.inventory.categories.update", selectedEditCategory.id), {
            preserveScroll: true,
            onSuccess: (response) => {
                // @ts-ignore - The response should contain the updated category
                const updatedCategory = response.props?.flash?.category || {
                    id: selectedEditCategory.id,
                    name: data.name,
                    description: data.description,
                };
                
                if (onCategoryUpdated) {
                    onCategoryUpdated(updatedCategory);
                }
                
                resetForm();
                onClose();
            },
            onError: (errors) => {
                setLocalError(Object.values(errors)[0] as string);
            },
        });
    };

    const handleEditClick = (category: Category) => {
        setIsEditing(true);
        setIsAddingNew(false);
        setSelectedEditCategory(category);
        setData({
            name: category.name,
            description: category.description || "",
        });
        setLocalError(null);
        clearErrors();
    };

    const handleCancelEdit = () => {
        resetForm();
    };

    const handleAddNewClick = () => {
        setIsAddingNew(true);
        setIsEditing(false);
        setSelectedEditCategory(null);
        setData({ name: "", description: "" });
        setLocalError(null);
        clearErrors();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
                {/* Header */}
                <div className="px-6 py-5 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-on-surface">
                        {isEditing ? "Edit Category" : "Select Category"}
                    </h3>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                        className="p-2 rounded-full"
                    >
                        <RiCloseLargeLine className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 px-6 py-6">
                    {/* Categories Row - Only show when not editing */}
                    {!isEditing && !isAddingNew && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-on-surface-variant mb-3">
                                Available Categories
                            </label>
                            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pb-2">
                                {categories && categories.map((category) => (
                                    <div key={category.id} className="relative group">
                                        <button
                                            onClick={() => handleSelectCategory(category.name)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                                selectedCategory === category.name
                                                    ? "bg-primary text-white shadow-md scale-105"
                                                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-lowest hover:shadow-sm"
                                            )}
                                        >
                                            {category.name}
                                            {category.count !== undefined && (
                                                <span className="ml-1 text-xs opacity-70">
                                                    ({category.count})
                                                </span>
                                            )}
                                        </button>
                                        {/* Edit button on hover */}
                                        <button
                                            onClick={() => handleEditClick(category)}
                                            className="absolute -bottom-2  -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-md"
                                            aria-label="Edit category"
                                        >
                                            <HiPencil/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add New Category Section */}
                    {!isEditing && !isAddingNew && (
                        <button
                            onClick={handleAddNewClick}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 group"
                        >
                            <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-sm font-medium text-primary">
                                Add New Category
                            </span>
                        </button>
                    )}

                    {/* Create/Edit Form */}
                    {(isAddingNew || isEditing) && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="e.g., Bakery, Dairy, Beverages"
                                    className={cn(
                                        "w-full px-4 py-2 rounded-lg bg-surface-container-high border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface",
                                        errors.name || localError
                                            ? "border-error"
                                            : "border-outline-variant focus:border-primary"
                                    )}
                                    autoFocus
                                />
                                {errors.name && (
                                    <p className="text-sm text-error mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Brief description of the category"
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface resize-none"
                                />
                                {errors.description && (
                                    <p className="text-sm text-error mt-1">{errors.description}</p>
                                )}
                            </div>

                            {(localError || errors._error) && (
                                <div className="text-sm text-error bg-error/10 p-3 rounded-lg">
                                    {localError || errors._error}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    onClick={isEditing ? handleUpdateCategory : handleCreateCategory}
                                    disabled={processing || !data.name.trim()}
                                    className="flex-1"
                                >
                                    {processing 
                                        ? (isEditing ? "Updating..." : "Creating...") 
                                        : (isEditing ? "Update Category" : "Create Category")
                                    }
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                    disabled={processing}
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