import React, { useState, useRef, ChangeEvent } from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import { RiUpload2Line } from "react-icons/ri";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

export interface ImageItem {
    id: string;
    url: string; // Used for browser preview
    file?: File; // <--- ADDED: Stores the actual binary for Laravel
    isMain?: boolean;
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
    maxSize?: number; // in MB
    showUrlInput?: boolean;
    showMainImageControl?: boolean;
}

export const ImageUpload: React.FC<MultiImageUploadProps> = ({
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
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [urlInput, setUrlInput] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        if (value.length + files.length > maxFiles) {
            setUploadError(`You can only upload up to ${maxFiles} images`);
            return;
        }

        setUploadError(null);
        setIsUploading(true);

        const newImages: ImageItem[] = [];
        const allowedTypes = accept.split(",").map((t) => t.trim());

        for (const file of files) {
            // Validation
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

            // Create a temporary Blob URL for the preview (Zero memory overhead vs Base64)
            const previewUrl = URL.createObjectURL(file);

            newImages.push({
                id: crypto.randomUUID(), // Modern browser unique ID
                url: previewUrl,
                file: file, // <--- We keep the binary file here!
                isMain:
                    showMainImageControl &&
                    value.length === 0 &&
                    newImages.length === 0,
            });
        }

        onChange([...value, ...newImages]);
        setIsUploading(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        if (value.length >= maxFiles) return;

        const newImage: ImageItem = {
            id: crypto.randomUUID(),
            url: urlInput.trim(),
            isMain: showMainImageControl && value.length === 0,
        };

        onChange([...value, newImage]);
        setUrlInput("");
    };

    const handleRemoveImage = (id: string) => {
        const imageToRemove = value.find((img) => img.id === id);

        // Memory Cleanup: Revoke the Blob URL to prevent memory leaks
        if (imageToRemove?.url.startsWith("blob:")) {
            URL.revokeObjectURL(imageToRemove.url);
        }

        const newImages = value.filter((img) => img.id !== id);
        if (
            showMainImageControl &&
            imageToRemove?.isMain &&
            newImages.length > 0
        ) {
            newImages[0].isMain = true;
        }
        onChange(newImages);
    };

    const handleSetMain = (id: string) => {
        if (!showMainImageControl) return;
        onChange(value.map((img) => ({ ...img, isMain: img.id === id })));
    };

    return (
        <div className={cn("space-y-4", className)}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                {label} {required && <span className="text-error ml-1">*</span>}
            </h4>

            {showUrlInput && (
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Input
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="Add via URL..."
                            Icon={HiOutlinePhotograph}
                            disabled={disabled || isUploading}
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={handleAddUrl}
                        disabled={!urlInput.trim()}
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
                    disabled={disabled || isUploading}
                    loading={isUploading}
                >
                    <RiUpload2Line className="mr-2" /> Upload Images
                </Button>
            </div>

            {(error || uploadError) && (
                <p className="text-error text-xs">{error || uploadError}</p>
            )}

            {value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {value.map((image, index) => (
                        <div
                            key={image.id}
                            className="relative group aspect-square rounded-lg overflow-hidden border-2 border-outline-variant/20"
                        >
                            <img
                                src={image.url}
                                className="w-full h-full object-cover"
                                alt="Preview"
                            />
                            {image.isMain && (
                                <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1 rounded">
                                    MAIN
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                {!image.isMain && (
                                    <button
                                        onClick={() => handleSetMain(image.id)}
                                        className="p-1 bg-white rounded-full"
                                    >
                                        <HiOutlinePhotograph />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleRemoveImage(image.id)}
                                    className="p-1 bg-error text-white rounded-full"
                                >
                                    <HiOutlineX />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
