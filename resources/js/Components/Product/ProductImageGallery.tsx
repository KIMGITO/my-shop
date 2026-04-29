import React, { useState } from "react";
import { cn } from "@/Utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImage {
    url: string;
    id: number;
}

interface ProductImageGalleryProps {
    images: ProductImage[];
    productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
    images: initialImages,
    productName,
}) => {
    // We store the full array in state to allow re-ordering/swapping
    const [gallery, setGallery] = useState<ProductImage[]>(initialImages);

    const handleSwap = (clickedIdx: number) => {
        const newGallery = [...gallery];
        // Swap index 0 (Hero) with clickedIdx (Thumbnail)
        const temp = newGallery[0];
        newGallery[0] = newGallery[clickedIdx];
        newGallery[clickedIdx] = temp;
        
        setGallery(newGallery);
    };

    if (!gallery.length) return null;

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Hero Image */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-md border border-border/40">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={gallery[0].id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={gallery[0].url}
                        alt={productName}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Horizontal Scrollable Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                {gallery.slice(1).map((img, idx) => (
                    <button
                        key={img.id}
                        onClick={() => handleSwap(idx + 1)}
                        className={cn(
                            "relative shrink-0 w-20 aspect-square rounded-lg overflow-hidden",
                            "bg-muted border transition-all hover:border-primary/50"
                        )}
                    >
                        <img
                            src={img.url}
                            alt={`${productName} thumbnail`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductImageGallery;