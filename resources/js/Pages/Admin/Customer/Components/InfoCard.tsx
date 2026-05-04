import { cn } from "@/lib/utils";

export const InfoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-surface-container-lowest border border-outline-variant/10 shadow-sm", className)}>
        {children}
    </div>
);
