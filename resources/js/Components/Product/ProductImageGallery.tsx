import React, { useState } from "react";
import { cn } from "@/Utils/helpers";

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
    images,
    productName,
}) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
                <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>
            {images.slice(1, 4).map((img, idx) => (
                <div
                    key={idx}
                    className={cn(
                        "aspect-square rounded-xl overflow-hidden bg-surface-container-low shadow-sm cursor-pointer transition-all",
                        selectedImage === idx + 1 && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedImage(idx + 1)}
                >
                    <img
                        src={img}
                        alt={`${productName} view ${idx + 2}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductImageGallery;
