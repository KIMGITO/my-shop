export const SimpleFooter = () => {
    return (
        <footer className="mt-auto py-8 px-6 text-center text-on-surface-variant/60 text-sm border-t border-outline-variant/20">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 Kaykay's Milk Bar. All rights reserved.</p>
                <div className="flex gap-6">
                    <a
                        href="#"
                        className="hover:text-primary transition-colors"
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        className="hover:text-primary transition-colors"
                    >
                        Terms
                    </a>
                    <a
                        href="#"
                        className="hover:text-primary transition-colors"
                    >
                        Support
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default SimpleFooter;
