"use client";

import SellerHeader from "@/components/ui/SellerHeader";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { ReviewCard } from "@/components/ui/ReviewCard";

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

