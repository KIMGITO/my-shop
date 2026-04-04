import React from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineStar } from "react-icons/hi2";

interface DeliveryHistoryCardProps {
    delivery: {
        id: string;
        orderNumber: string;
        address: string;
        time: string;
        status: "on_time" | "early" | "delayed";
        rider: { name: string; avatar: string };
        duration: number;
        rating: number;
        review: string;
        image: string;
    };
}

export const DeliveryHistoryCard: React.FC<DeliveryHistoryCardProps> = ({
    delivery,
}) => {
    const statusConfig = {
        on_time: {
            label: "On Time",
            bgClass: "bg-secondary-container",
            textClass: "text-on-secondary-container",
        },
        early: {
            label: "Early",
            bgClass: "bg-surface-container-highest",
            textClass: "text-on-surface",
        },
        delayed: {
            label: "Delayed",
            bgClass: "bg-error-container",
            textClass: "text-on-error-container",
        },
    };

    const config = statusConfig[delivery.status];

    return (
        <article className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 group hover:shadow-md transition-shadow">
            <div className="md:w-1/3 flex-shrink-0 relative overflow-hidden rounded-2xl aspect-square md:aspect-auto">
                <img
                    alt="Proof of Delivery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={delivery.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-white text-xs font-bold uppercase tracking-tighter">
                        Proof of Delivery
                    </span>
                    <span className="text-white/80 text-[10px] font-mono">
                        IMG_{delivery.orderNumber.slice(-4)}.JPG
                    </span>
                </div>
            </div>
            <div className="flex-grow flex flex-col justify-between py-1">
                <div>
                    <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                            <h3 className="text-xl font-bold font-headline text-on-surface">
                                Order #{delivery.orderNumber}
                            </h3>
                            <p className="text-sm text-on-surface-variant font-body">
                                {delivery.address} • Delivered {delivery.time}
                            </p>
                        </div>
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                config.bgClass,
                                config.textClass
                            )}
                        >
                            {config.label}
                        </span>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                className="w-8 h-8 rounded-full border border-primary-container/30"
                                src={delivery.rider.avatar}
                                alt={delivery.rider.name}
                            />
                            <span className="text-xs font-bold text-on-surface">
                                {delivery.rider.name}
                            </span>
                        </div>
                        <div className="h-4 w-px bg-outline-variant/30"></div>
                        <div className="flex items-center gap-1">
                            <span
                                className="material-symbols-outlined text-primary text-sm"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                timer
                            </span>
                            <span className="text-xs font-bold">
                                {delivery.duration}m total
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/10">
                    <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <HiOutlineStar
                                key={i}
                                className={cn(
                                    "text-lg",
                                    i < delivery.rating
                                        ? "fill-primary text-primary"
                                        : "opacity-20"
                                )}
                            />
                        ))}
                    </div>
                    <p className="text-sm italic text-on-surface-variant line-clamp-2">
                        "{delivery.review}"
                    </p>
                </div>
            </div>
        </article>
    );
};
