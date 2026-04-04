// resources/js/Components/Home/Features.tsx
import React from "react";
import { Icon } from "@/Components/UI/Icon";

interface Feature {
    icon: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: "stylus_note",
        title: "1. Build Your Box",
        description:
            "Choose from our selection of organic dairy, artisanal breads, and farm-fresh eggs.",
    },
    {
        icon: "calendar_month",
        title: "2. Set Your Schedule",
        description:
            "Weekly or bi-weekly deliveries. Pause, skip, or cancel anytime with a single tap.",
    },
    {
        icon: "local_shipping",
        title: "3. Cold-Chain Delivery",
        description:
            "Our drivers arrive before 7 AM, ensuring your morning starts with the absolute freshest goods.",
    },
];

export const Features: React.FC = () => {
    return (
        <section className="py-32 bg-surface">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-6">
                        Simple, Fresh, Reliable
                    </h2>
                    <p className="text-on-surface-variant text-lg">
                        We've modernized the traditional milk run for the modern
                        pantry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-20 h-20 bg-surface-container-low rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                                <Icon
                                    icon={feature.icon}
                                    size="lg"
                                    className="text-primary"
                                />
                            </div>
                            <h3 className="font-headline text-2xl font-bold mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-on-surface-variant leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
