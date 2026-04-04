// resources/js/Components/Home/Hero.tsx
import React from "react";
import { router } from "@inertiajs/react";

export const Hero: React.FC = () => {
    const handleShopClick = () => {
        router.visit("/shop");
    };

    return (
        <section className="hero-gradient relative overflow-hidden pt-20 pb-32 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="relative z-10 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 editorial-shadow mb-8 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-on-surface">
                            Fresh from the farm
                        </span>
                    </div>

                    <h1 className="font-headline text-5xl md:text-8xl text-on-surface font-extrabold tracking-tight leading-[0.95] mb-8">
                        Pure Dairy.
                        <br />
                        <span className="relative inline-block mt-2">
                            Pure Joy.
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                fill="none"
                                height="12"
                                viewBox="0 0 200 12"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 10C50 2 150 2 198 10"
                                    stroke="#fdb300"
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0">
                        Artisanal milk, hand-churned butter, and heirloom
                        sourdough delivered to your doorstep at the peak of
                        freshness.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                        <button
                            onClick={handleShopClick}
                            className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-[0_10px_30px_-10px_rgba(253,179,0,0.5)] hover:-translate-y-1 transition-all duration-300"
                        >
                            Start Your Subscription
                        </button>
                        <button className="group flex items-center gap-3 font-bold text-lg px-6 py-5">
                            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high editorial-shadow group-hover:scale-110 transition-transform">
                                <span
                                    className="material-symbols-outlined text-primary"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    play_arrow
                                </span>
                            </span>
                            See Our Farm
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative flex justify-center items-center">
                    <div className="relative z-20 w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden editorial-shadow transform -rotate-3 transition-transform hover:rotate-0 duration-700">
                        <img
                            alt="Fresh dairy"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAveZOIPwWhV57SHAGAQvmTJA-V5UCasSdvpLNptgtNegsneM84ql7Th7K6y8c0XZcnIaVqfrBL43gUr2BuQCY4sBExau_RLULaRMOyOSIGkwVwrdFAXgBAkuddcS3Dy3UklSbKpVZr67f8vwEX86iQJnF_b65CkRn5blh7LfS-Iv3IpQ6Bxm2Oxms-fY6gAdA-FVV4Adk-7YgHASpotP7wEtnGOnvaEFhHxyp60b6XL-uJ9jv5je8nRE9553JZHm7eTBvJCKgngZnY"
                        />
                    </div>
                    <div className="absolute -right-4 -bottom-10 z-30 bg-surface-container-high p-8 rounded-2xl editorial-shadow max-w-[240px] transform translate-y-4">
                        <div className="flex -space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-full border-4 border-surface-container-high bg-primary/20"></div>
                            <div className="w-10 h-10 rounded-full border-4 border-surface-container-high bg-primary"></div>
                            <div className="w-10 h-10 rounded-full border-4 border-surface-container-high bg-on-surface/20"></div>
                            <div className="w-10 h-10 rounded-full border-4 border-surface-container-high bg-background flex items-center justify-center text-[10px] font-bold">
                                +10k
                            </div>
                        </div>
                        <p className="text-sm font-bold text-on-surface leading-tight">
                            Joined by 10,000+ local families this month.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

