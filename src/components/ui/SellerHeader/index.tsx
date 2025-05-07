import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SellerHeaderProps {
    title: string,
    icon: IconDefinition
}

export default function SellerHeader({ title, icon }: SellerHeaderProps) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2 py-6">
                    <FontAwesomeIcon icon={icon} className="text-xl" />
                    {title}
                </h1>
            </div>

            <div className="w-full border-b-2 border-[var(--primary)]" />
        </>
    )
}