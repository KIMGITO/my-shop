// resources/js/Components/Shop/ProductGrid.tsx
import React from "react";
import { ShopProduct } from "./type";
import ProductCard from "../UI/ProductCard";

interface ProductGridProps {
    products: ShopProduct[];
    featuredProduct?: ShopProduct;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    featuredProduct,
}) => {
    const regularProducts = products.filter((p) => !p.isFeatured);

    return (
        <div className="space-y-12">
            {/* Featured Product - Full width, separate section */}
            {featuredProduct && (
                <div className="w-full">
                    <ProductCard
                        product={featuredProduct}
                        size="lg"
                        variant="featured"
                        showAddButton={false}
                    />
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        hideRating
                        onAddToCart={() => { }}
                        hideUnit
                        size="md"
                        variant="default"
                        showAddButton={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
