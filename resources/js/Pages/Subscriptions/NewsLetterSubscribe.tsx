import React, { useState } from "react";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

interface NewsletterSubscribeProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
    title = "Never miss a drop.",
    description = "Join 2,000+ milk lovers and get notified when our seasonal small-batch batches are ready for delivery.",
    buttonText = "Subscribe",
    onSubmit,
}) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(email);
        setEmail("");
    };

    return (
        <div className="bg-surface-container rounded-2xl md:rounded-[2.5rem] p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
            <div className="md:w-1/2">
                <h5 className="text-2xl md:text-3xl font-headline font-black text-on-surface mb-3 md:mb-4">
                    {title}
                </h5>
                <p className="text-sm md:text-base text-on-surface-variant font-medium leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="md:w-1/2 w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your farm-fresh email..."
                        className="flex-1 bg-surface-container-lowest border-none rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:ring-2 focus:ring-primary text-on-surface text-sm md:text-base"
                        required
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        className="editorial-gradient px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-on-primary font-bold shadow-xl hover:shadow-primary-container/20 transition-all active:scale-95 whitespace-nowrap"
                    >
                        {buttonText}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterSubscribe;
