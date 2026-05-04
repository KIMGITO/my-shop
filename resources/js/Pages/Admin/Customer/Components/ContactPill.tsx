export const ContactPill = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-4 p-1 bg-surface-container-high rounded-full border border-transparent hover:border-primary/20 transition-all group">
        <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
        </div>
        <div className="pr-4 truncate">
            <p className="text-[10px] font-black text-on-surface-variant uppercase leading-none mb-1">{label}</p>
            <p className="font-bold text-on-surface truncate">{value}</p>
        </div>
    </div>
);