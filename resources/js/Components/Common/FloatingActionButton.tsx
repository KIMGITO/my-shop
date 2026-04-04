// resources/js/Components/Common/FloatingActionButton.tsx
import React, { ReactNode } from "react";
import { Icon } from "@/Components/UI/Icon";
import { Button } from "../UI/Button";

export const FloatingActionButton = ({
    icon,
    action,
}: {
    icon: ReactNode;
    action: () => void;
}) => {
    return (
        <Button
            variant="primary"
            onClick={action}
            className="fixed bottom-10 right-10 bg-primary text-on-primary p-6 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-60 "
        >
            {icon}
        </Button>
    );
};

export default FloatingActionButton;
