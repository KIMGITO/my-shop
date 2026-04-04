// resources/js/Pages/Welcome.tsx
import { FloatingActionButton } from "@/Components/Common/FloatingActionButton";
import { Features } from "@/Components/Home/Features";
import { Hero } from "@/Components/Home/Hero";
import { Footer } from "@/Components/Layout/Footer";
import { MobileNav } from "@/Components/Layout/MobileNav";
import  Navbar  from "@/Components/Layout/Navbar";
import { Head } from "@inertiajs/react";

interface WelcomeProps {
    auth?: {
        user?: any;
    };
    laravelVersion?: string;
    phpVersion?: string;
}

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: WelcomeProps) {
    return (
        <>
            <Head title="Kaykay's Milk Bar - Artisanal & Fresh Dairy" />
            <div className="min-h-screen bg-background text-on-surface">
                <Navbar />
                <main>
                    <Hero />
                    <Features />
                </main>
                <Footer />
            </div>
        </>
    );
}
