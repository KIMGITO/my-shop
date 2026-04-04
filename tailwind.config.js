import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Mapping to app.css variables
                primary: "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                "on-primary": "var(--color-on-primary)",
                secondary: "var(--color-secondary)",
                "on-secondary": "var(--color-on-secondary)",

                background: "var(--color-background)",
                surface: "var(--color-surface)",
                "on-surface": "var(--color-on-surface)",
                "on-surface-variant": "var(--color-on-surface-variant)",

                "surface-container-lowest":
                    "var(--color-surface-container-lowest)",
                "surface-container-low": "var(--color-surface-container-low)",
                "surface-container-high": "var(--color-surface-container-high)",

                success: "var(--color-success)",
                "on-success": "var(--color-on-success)",
                warning: "var(--color-warning)",
                "on-warning": "var(--color-on-warning)",
                error: "var(--color-error)",
                "on-error": "var(--color-on-error)",

                outline: "var(--color-outline)",
                "outline-variant": "var(--color-outline-variant)",
            },

            fontFamily: {
                headline: [
                    "var(--font-headline)",
                    ...defaultTheme.fontFamily.sans,
                ],
                body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
                label: ["var(--font-label)", ...defaultTheme.fontFamily.sans],
            },

            borderRadius: {
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
            },

            // POS-specific spacing and interactions
            spacing: {
                touch: "44px", // Standard minimum touch target size
            },

            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.4s ease-out",
            },

            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [
        forms,
        typography,
        // Responsive variant for touch devices
        function ({ addVariant }) {
            addVariant("touch", "@media (pointer: coarse)");
        },
    ],
};
