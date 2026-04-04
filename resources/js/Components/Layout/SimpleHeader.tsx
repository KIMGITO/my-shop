import { Link } from "@inertiajs/react";

export const SimpleHeader = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-background h-16 flex items-center ">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    
                    <Link href={'/'}  className="font-headline font-extrabold text-2xl text-primary tracking-tighter">
                        Kaykay's
                    </Link> 
                </div>
                <Link
                    href={"info/help"}
                    className="material-symbols-outlined text-primary/60"
                >
                    help_outline
                </Link>
            </div>
        </header>
    );
};

export default SimpleHeader;
