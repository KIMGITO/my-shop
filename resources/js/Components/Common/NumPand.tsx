import React from "react";
import { HiOutlineBackspace } from "react-icons/hi";

interface NumpadProps {
    onKeyPress: (value: string | number) => void;
    onClear?: () => void;
}

export const Numpad: React.FC<NumpadProps> = ({ onKeyPress, onClear }) => {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0];

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
            {keys.map((key) => (
                <button
                    key={key}
                    onClick={() => onKeyPress(key)}
                    className="h-16 md:h-20 bg-surface-container rounded-xl text-xl md:text-2xl font-headline font-bold text-on-surface hover:bg-primary-container/20 active:scale-95 transition-all"
                >
                    {key}
                </button>
            ))}
            <button
                onClick={onClear}
                className="h-16 md:h-20 bg-surface-container-highest rounded-xl text-xl md:text-2xl font-headline font-bold text-on-surface hover:bg-primary-container/40 active:scale-95 transition-all flex items-center justify-center"
            >
                <HiOutlineBackspace className="text-2xl" />
            </button>
        </div>
    );
};

export default Numpad;
