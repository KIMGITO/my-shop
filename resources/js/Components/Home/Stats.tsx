// resources/js/Components/Home/Stats.tsx
import React from "react";

const Stats: React.FC = () => {
    const stats = [
        { value: "10,000+", label: "Happy Families", icon: "family_history" },
        { value: "50+", label: "Farm Partners", icon: "agriculture" },
        { value: "24/7", label: "Fresh Delivery", icon: "schedule" },
        { value: "100%", label: "Organic", icon: "eco" },
    ];

    return (
        <section className="py-20 bg-surface-container-low">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-primary">
                                        {stat.icon}
                                    </span>
                                </div>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-on-surface-variant">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
