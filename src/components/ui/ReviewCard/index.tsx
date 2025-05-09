import Image from "next/image";

type Review = {
    name: string;
    image: string;
    rating: number;
    comment: string;
};

export function ReviewCard({ name, image, rating, comment }: Review) {
    return (
        <article className="bg-[var(--background)] rounded-xl p-6 border-2 border-[var(--primary)] text-[var(--foreground)] space-y-2">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
                <Image
                    alt={`Profile picture of ${name}`}
                    src={image}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-[#3a4db7]"
                />
                <div>
                    <h2 className="font-semibold text-sm">{name}</h2>
                </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`star-svg ${i >= rating ? "empty" : ""}`}
                        viewBox="0 0 24 24"
                        stroke="#2940d5"
                        strokeWidth={1.5}
                        fill={i < rating ? "var(--primary)" : "transparent"}
                        width={14}
                        height={14}
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                ))}
            </div>

            {/* Comment */}
            <p className="text-sm leading-relaxed">{comment}</p>
        </article>
    );
}