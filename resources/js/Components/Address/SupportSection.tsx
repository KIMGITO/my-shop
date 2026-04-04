import React from "react";
import { router } from "@inertiajs/react";
import Button from "@/Components/UI/Button";

export const SupportSection: React.FC = () => {
    return (
        <section className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between p-5 md:p-8 bg-inverse-surface rounded-2xl text-on-primary">
            <div className="mb-4 md:mb-0 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold font-headline mb-1">
                    Moving soon?
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                    Contact our logistics team to transfer your subscription to
                    your new location.
                </p>
            </div>
            <Button
                onClick={() => router.visit("/contact")}
                variant="primary"
                className="bg-surface-bright text-inverse-surface whitespace-nowrap"
            >
                Contact Support
            </Button>
        </section>
    );
};

export default SupportSection;
