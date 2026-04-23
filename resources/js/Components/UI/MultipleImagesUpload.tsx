// MultipleImagesUpload.tsx (updated)
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import { RiUpload2Line } from "react-icons/ri";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

export interface ImageItem {
    id: string;
    url: string;
    file?: File;
    isMain?: boolean;
    isDeleted?: boolean;
    originalId?: string | number;
}

interface MultiImageUploadProps {
    value: ImageItem[];
    onChange: (images: ImageItem[]) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    maxFiles?: number;
    accept?: string;
    maxSize?: number;
    showUrlInput?: boolean;
    showMainImageControl?: boolean;
}

export const MultipleImagesUpload: React.FC<MultiImageUploadProps> = ({
    value = [],
    onChange,
    label = "Images",
    error,
    disabled = false,
    required = false,
    className,
    maxFiles = 10,
    accept = "image/jpeg,image/png,image/webp,image/jpg",
    maxSize = 5,
    showUrlInput = true,
    showMainImageControl = true,
}) => {
    console.log("images", value);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [urlInput, setUrlInput] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cleanup blob URLs on unmount
    useEffect(() => {
        return () => {
            value.forEach((image) => {
                if (image.url?.startsWith("blob:")) {
                    URL.revokeObjectURL(image.url);
                }
            });
        };
    }, [value]);

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const activeImages = value.filter((img) => !img.isDeleted);
        if (activeImages.length + files.length > maxFiles) {
            setUploadError(`You can only upload up to ${maxFiles} images`);
            return;
        }

        setUploadError(null);
        setIsUploading(true);

        const newImages: ImageItem[] = [];
        const allowedTypes = accept.split(",").map((t) => t.trim());

        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                setUploadError(`${file.name}: Invalid file type.`);
                setIsUploading(false);
                return;
            }

            if (file.size > maxSize * 1024 * 1024) {
                setUploadError(`${file.name}: Exceeds ${maxSize}MB limit.`);
                setIsUploading(false);
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            const activeCount = value.filter((img) => !img.isDeleted).length;

            newImages.push({
                id: crypto.randomUUID(),
                url: previewUrl,
                file: file,
                isMain:
                    showMainImageControl &&
                    activeCount === 0 &&
                    newImages.length === 0,
                isDeleted: false,
            });
        }

        onChange([...value, ...newImages]);
        setIsUploading(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleAddUrl = () => {
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) return;

    // 1. Get ONLY the images that are currently visible/not deleted
    const activeImages = value.filter((img) => !img.isDeleted);
    
    if (activeImages.length >= maxFiles) {
        setUploadError(`Maximum ${maxFiles} images allowed`);
        return;
    }

    // 2. Create the new item
    const newImage: ImageItem = {
        id: crypto.randomUUID(),
        url: trimmedUrl,
        // Match the logic in handleFileSelect: 
        // If there are no active images, this MUST be the main one.
        isMain: showMainImageControl && activeImages.length === 0,
        isDeleted: false,
    };

    // 3. Update and Reset
    onChange([...value, newImage]);
    setUrlInput("");
    setUploadError(null);
};

    const handleRemoveImage = (id: string) => {
        const imageToRemove = value.find((img) => img.id === id);

        if (!imageToRemove) return;

        // If it's an existing server image, mark as deleted
        if (imageToRemove.originalId) {
            const updatedImages = value.map((img) =>
                img.id === id ? { ...img, isDeleted: true, isMain: false } : img
            );

            // If we're deleting the main image, set a new main image
            if (imageToRemove.isMain) {
                const firstActive = updatedImages.find(
                    (img) => !img.isDeleted && img.id !== id
                );
                if (firstActive) {
                    firstActive.isMain = true;
                }
            }

            onChange(updatedImages);
        } else {
            // For new images, remove completely and revoke blob URL
            if (imageToRemove.url?.startsWith("blob:")) {
                URL.revokeObjectURL(imageToRemove.url);
            }

            const newImages = value.filter((img) => img.id !== id);

            // Handle main image reassignment
            if (showMainImageControl && imageToRemove.isMain) {
                const firstActive = newImages.find((img) => !img.isDeleted);
                if (firstActive) {
                    firstActive.isMain = true;
                }
            }

            onChange(newImages);
        }
    };

    const handleRestoreImage = (id: string) => {
        const updatedImages = value.map((img) =>
            img.id === id ? { ...img, isDeleted: false } : img
        );
        onChange(updatedImages);
    };

    const handleSetMain = (id: string) => {
        if (!showMainImageControl) return;
        onChange(
            value.map((img) => ({
                ...img,
                isMain: img.id === id && !img.isDeleted,
            }))
        );
    };

    const activeImages = value.filter((img) => !img.isDeleted);
    const deletedImages = value.filter((img) => img.isDeleted);

    return (
        <div className={cn("space-y-4", className)}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {label} {required && <span className="text-error ml-1">*</span>}
                {maxFiles && (
                    <span className="text-xs font-normal ml-2">
                        (Max {maxFiles} images)
                    </span>
                )}
            </h4>

            {showUrlInput && (
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Input
                            value={urlInput}
                            height="sm"
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="Add via URL..."
                            Icon={HiOutlinePhotograph}
                            disabled={disabled || isUploading}
                        />
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        onClick={handleAddUrl}
                        disabled={!urlInput.trim() || disabled || isUploading}
                    >
                        Add
                    </Button>
                </div>
            )}

            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={
                        disabled ||
                        isUploading ||
                        activeImages.length >= maxFiles
                    }
                    loading={isUploading}
                >
                    <RiUpload2Line className="mr-2" /> Upload Images
                </Button>
            </div>

            {(error || uploadError) && (
                <p className="text-error text-xs">{error || uploadError}</p>
            )}

            {/* Active Images */}
            {activeImages.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-on-surface-variant">
                        {activeImages.length} / {maxFiles} images
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeImages.map((image) => (
                            <div
                                key={image.id}
                                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-outline-variant/20 bg-surface-container-low"
                            >
                                <img
                                    src={image.url}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                                {image.isMain && (
                                    <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded font-medium z-10">
                                        MAIN
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    {!image.isMain && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSetMain(image.id)
                                            }
                                            className="p-1.5 bg-success rounded-full hover:bg-success/60 transition-colors"
                                            title="Set as main image"
                                        >
                                            <HiOutlinePhotograph className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveImage(image.id)
                                        }
                                        className="p-1.5 bg-error text-white rounded-full hover:bg-error/80 transition-colors"
                                        title="Remove image"
                                    >
                                        <HiOutlineX className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Deleted Images (marked for deletion in edit mode) */}
            {deletedImages.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-error">
                        Marked for deletion ({deletedImages.length})
                    </p>
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                        {deletedImages.map((image) => (
                            <div
                                key={image.id}
                                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-error bg-surface-container-low opacity-60"
                            >
                                <img
                                    src={image.url}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />

                                <div className="absolute top-0.5 right-0.5 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    <Button
                                        size="sm"
                                        className="p-0.5 px-1"
                                        onClick={() =>
                                            handleRestoreImage(image.id)
                                        }
                                        title="Restore"
                                    >
                                        <MdOutlineSettingsBackupRestore />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultipleImagesUpload;
