import { useEffect } from "react";

interface AlertProps {
    type: "success" | "error";
    message: string;
    onClose?: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 4000); // auto-dismiss after 4 seconds

        return () => clearTimeout(timer); // cleanup if unmounted early
    }, [onClose]);

    const baseStyle = "px-6 py-4 rounded-xl text-sm font-medium shadow-md";
    const styles = {
        success: "bg-green-100 text-green-800 border border-green-300",
        error: "bg-red-100 text-red-800 border border-red-300",
    };

    return (
        <div className={`fixed bottom-6 right-6 z-50 ${baseStyle} ${styles[type]}`}>
            {message}
        </div>
    );
}
