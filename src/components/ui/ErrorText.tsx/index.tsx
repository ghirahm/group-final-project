import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function ErrorText({ message }: { message: string }) {
    return (
        <p className="text-[var(--alert)] text-xs flex items-center gap-2">
            <FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />
            {message}
        </p>
    );
}