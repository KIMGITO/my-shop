import React, { useRef, ChangeEvent } from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineX, HiOutlinePhotograph } from "react-icons/hi";
import { RiUpload2Line } from "react-icons/ri";
import Button from "@/Components/UI/Button";

interface SingleImageUploadProps {
    value: string | null;
    onFileChange: (file: File | null) => void;
    onRemoveExisting: (shouldRemove: boolean) => void;
    error?: string;
}

export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
    value,
    onFileChange,
    onRemoveExisting,
    error,
}) => {
    const [preview, setPreview] = React.useState<string | null>(value);
    const [isRemoved, setIsRemoved] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        setIsRemoved(false);
        onFileChange(file);
        onRemoveExisting(true); 
    };

    const handleRemove = () => {
        setPreview(null);
        setIsRemoved(true);
        onFileChange(null);
        onRemoveExisting(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            <div
                className={cn(
                    "relative w-32 h-32 rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center bg-surface-container-low",
                    isRemoved ? "border-error/50" : "border-outline-variant/30"
                )}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            className="w-full h-full object-cover"
                            alt="Logo"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-1 right-1 p-1 bg-error text-white rounded-full hover:scale-110 transition-transform"
                        >
                            <HiOutlineX className="w-3 h-3" />
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors"
                    >
                        <RiUpload2Line className="text-xl mb-1" />
                        <span className="text-[10px] font-bold">UPLOAD</span>
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />
            {error && <p className="text-error text-xs italic">{error}</p>}
        </div>
    );
};

export default SingleImageUpload;
