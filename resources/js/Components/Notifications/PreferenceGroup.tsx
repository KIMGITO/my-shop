import React from "react";
import { NotificationPreference } from "@/types";
import PreferenceToggle from "../UI/PreferenceToggle";

interface PreferenceGroupProps {
    title: string;
    preferences: NotificationPreference[];
    onToggle: (id: string, enabled: boolean) => void;
}

export const PreferenceGroup: React.FC<PreferenceGroupProps> = ({
    title,
    preferences,
    onToggle,
}) => {
    return (
        <div>
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant mb-4 md:mb-6 border-b border-outline-variant/10 pb-2">
                {title}
            </h4>
            <div className="space-y-5 md:space-y-6">
                {preferences.map((pref) => (
                    <PreferenceToggle
                        key={pref.id}
                        preference={pref}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default PreferenceGroup;
