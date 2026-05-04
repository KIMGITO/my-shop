import { cn } from "@/lib/utils";

export const StatHighlight = ({ icon: Icon, label, value, colorClass }: { icon: any, label: string, value: string | number, colorClass: string }) => (
    <div className="bg-surface-container-lowest p-4 rounded-[2.2rem] border border-outline-variant/10 shadow-sm flex items-center gap-5 w-full">
        <div className={cn("p-4 rounded-2xl", colorClass)}>
            <Icon className="w-7 h-7" />
        </div>
        <div>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{label}</p>
            <p className="text-lg font-black text-on-surface uppercase tracking-tight">{value}</p>
        </div>
    </div>
);
