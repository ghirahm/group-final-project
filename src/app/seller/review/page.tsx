"use client";

import SellerHeader from "@/components/ui/SellerHeader";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Reviews() {

    const reviews = [
        {
            name: "Jane Doe",
            email: "janedoe@example.com",
            image:
                "https://storage.googleapis.com/a1aa/image/942202d2-2f3f-405c-0ee7-03650271cdcb.jpg",
            rating: 4,
            comment: "Great product! Really satisfied with the quality and delivery time.",
        },
        {
            name: "John Smith",
            email: "johnsmith@example.com",
            image:
                "https://storage.googleapis.com/a1aa/image/9f6f2e9f-e73c-430d-6c26-4bd47302fc50.jpg",
            rating: 4,
            comment: "Good value for money. Customer service was very helpful.",
        },
        {
            name: "Emily Clark",
            email: "emilyclark@example.com",
            image:
                "https://storage.googleapis.com/a1aa/image/a8f56789-6668-45df-9e2c-8925c6233d77.jpg",
            rating: 3,
            comment: "The product is okay but shipping took longer than expected.",
        },
    ];

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <SellerHeader title='Order Review' icon={faStar} />

            <div className="flex flex-col overflow-auto w-full">
                <div className="overflow-x-auto">
                    <section className="space-y-6">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                        ))}
                    </section>
                </div>
            </div>
        </section>
    );
};

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