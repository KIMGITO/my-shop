import React from "react";
import { Link } from "@inertiajs/react";
import { ShopProduct } from "../Shop/type";
import ProductCard from "../UI/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RelatedProductsProps {
    products: Array<ShopProduct>;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
    return (
        <section>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-on-surface">
                        Complete Your Breakfast
                    </h2>
                    <p className="text-on-surface-variant">
                        Hand-picked pairings for your morning ritual.
                    </p>
                </div>

                <Link
                    href="/shop"
                    className="text-primary font-bold flex items-center gap-1 group"
                >
                    View Catalog
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </Link>
            </div>
            <ScrollArea>
                <div className="flex justify-center gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            size="sm"
                            product={product}
                            variant="compact"
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
};

export default RelatedProducts;
