import { useThemeStore } from "@/Stores/useThemeStore";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";


export const ThemeToggler = () => {

    const { isLight, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary/10 text-primary transition-all"
        >
            {isLight ? <HiOutlineMoon size={22} /> : <HiOutlineSun size={22} />}
        </button>
    );
};

export default ThemeToggler;
