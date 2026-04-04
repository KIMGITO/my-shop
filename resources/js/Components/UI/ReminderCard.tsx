import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";
import { cn } from "@/Utils/helpers";

interface ReminderCardProps {
    products: Product[];
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    className?: string;
    maxItems?: number;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
    products,
    title = "you may need",
    subtitle,
    icon,
    className,
    maxItems = 5,
}) => {
    const displayProducts = products.slice(0, maxItems);

    return (
        <div
            className={cn(
                "bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden p-2 ",
                className
            )}
        >
            <div className="px-1 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {icon}
                            </div>
                        )}
                        <div>
                            <h3 className="font-headline font-bold text-on-surface text-base md:text-lg">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                {displayProducts.length > 0 ? (
                    <div className="flex overflow-x-auto gap-4 scrollbar-hidden pb-2 rounded">
                        {displayProducts.map((product, index) => (
                            <div key={product.id} className="shrink-0">
                                <ProductCard
                                    size="xs"
                                    variant="compact"
                                    product={product}
                                    hideRating={true}
                                    hideUnit={true}
                                    showAddButton={true}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">
                            shopping_bag
                        </span>
                        <p className="text-sm text-on-surface-variant">
                            No reminders at the moment
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReminderCard;
