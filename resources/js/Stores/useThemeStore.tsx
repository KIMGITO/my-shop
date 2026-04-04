import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
    isLight: boolean;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            isLight: true, 
            toggleTheme: () =>
                set((state) => {
                    const nextMode = !state.isLight;
                    if (nextMode) {
                        document.documentElement.classList.add("light");
                        document.documentElement.classList.remove("dark");
                    } else {
                        document.documentElement.classList.add("dark");
                        document.documentElement.classList.remove("light");
                    }
                    return { isLight: nextMode };
                }),
        }),
        { name: "theme-storage" }
    )
);
