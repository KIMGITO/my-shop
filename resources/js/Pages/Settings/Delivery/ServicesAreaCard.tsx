// resources/js/Components/Settings/ServiceAreaCard.tsx
import React from "react";
import { Link } from "@inertiajs/react";
import { HiOutlineTruck } from "react-icons/hi2";
import { KENYAN_COUNTIES } from "@/Data/DeliveryData";

export const ServiceAreaCard: React.FC = () => {
    return (
        <div className="bg-surface-container-low rounded-2xl p-5 md:p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg md:text-xl font-bold font-headline text-on-surface mb-2">
                    🚚 Delivery Coverage
                </h4>
                <p className="text-sm text-on-surface-variant mb-4">
                    We deliver to Nairobi, Kiambu, Machakos, and select areas in
                    other counties.
                    {` `}
                    <Link
                        href="/delivery-zones"
                        className="text-primary font-medium hover:underline"
                    >
                        View full coverage map
                    </Link>
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {KENYAN_COUNTIES.slice(0, 6).map((county) => (
                        <span
                            key={county}
                            className="text-xs bg-surface-container-lowest px-2 py-1 rounded-full"
                        >
                            {county}
                        </span>
                    ))}
                    <span className="text-xs text-on-surface-variant">
                        +{KENYAN_COUNTIES.length - 6} more
                    </span>
                </div>
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <HiOutlineTruck className="text-3xl md:text-4xl text-primary" />
            </div>
        </div>
    );
};

export default ServiceAreaCard;
