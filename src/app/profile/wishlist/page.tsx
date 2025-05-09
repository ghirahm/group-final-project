'use client';

import { useEffect, useState } from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import CustomerHeader from "@/components/ui/CustomerHeader";
import ProductCard from '@/components/product/ProductCard';

interface WishlistItem {
    id: number;
    image: string;
    author: string;
    title: string;
    originalPrice: number;
    discountedPercent: number;
}

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setWishlistItems(parsed);
            } catch (e) {
                console.error("Failed to parse wishlist:", e);
            }
        }
    }, []);

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <CustomerHeader title='Wishlist Items' icon={faHeart} />
            <div className="col-span-3 grid grid-cols-3 gap-6">
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            author={item.author}
                            title={item.title}
                            originalPrice={item.originalPrice}
                            discountedPercent={item.discountedPercent}
                        />
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">Your wishlist is empty.</p>
                )}
            </div>
        </section>
    );
}
