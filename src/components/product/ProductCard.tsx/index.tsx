"use client"

import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

interface ProductCardProps {
    id: number;
    image: string;
    author: string;
    title: string;
    originalPrice: number;
    discountedPercent: number;
}

export default function ProductCard({ id, image, author, title, originalPrice, discountedPercent }: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsWishlisted(wishlist.some((item: any) => item.id === id));
    }, [id]);

    function formatNumber(num: number | undefined | null): string {
        if (typeof num !== 'number' || isNaN(num)) return '0';
        return num.toLocaleString('id-ID');
    }

    const handleWishlist = () => {
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const alreadyInWishlist = currentWishlist.some((item: any) => item.id === id);

        let updatedWishlist;
        if (alreadyInWishlist) {
            updatedWishlist = currentWishlist.filter((item: any) => item.id !== id);
            setIsWishlisted(false);
        } else {
            updatedWishlist = [...currentWishlist, { id, title, image, author, originalPrice, discountedPercent }];
            setIsWishlisted(true);
        }

        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    /* function calculateDiscount(original: number, discounted: number) {
        if (original <= discounted) return 0;
        return Math.round(((original - discounted) / original) * 100);
    } */

    return (
        <div className="w-full flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition relative group">
            {/* Image Section */}
            <div className="relative w-full h-64">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Wishlist Icon */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-4 right-4 rounded-full p-2 shadow-md transition z-10 w-8 h-8 flex items-center justify-center cursor-pointer
                    ${isWishlisted ? 'bg-[var(--background)] text-[var(--primary)]' : 'bg-[var(--background)] text-[var(--foreground)]'}`}
                >
                    <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                </button>
            </div>

            {/* Text Section */}
            <div className="p-4 w-full h-56 flex flex-col justify-between gap-2">
                <div className="w-full">
                    <p className="text-xs text-gray-500">{author}</p>
                    <h2 className="text-2xl font-semibold line-clamp-2">{title}</h2>
                </div>
                <div className="w-full">
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-400 line-through">Rp {formatNumber(originalPrice)}</p>
                        <p className="text-sm font-extrabold text-[var(--primary)] px-6 py-2 border-2 border-[var(--primary)] rounded-full">
                            Rp {formatNumber(originalPrice * ((100 - discountedPercent) / 100))}
                        </p>
                        <div className="w-8 h-8 bg-[var(--alert)] text-[var(--background)] text-[6px] font-semibold rounded-full flex items-center justify-center">
                            {discountedPercent}%<br />OFF
                        </div>
                    </div>

                    <div className="flex w-full gap-2 mt-4">
                        <Link
                            href={`/product/${id}`}
                            className="w-fit px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-[var(--background)] transition text-sm flex flex-row items-center justify-center gap-2 cursor-pointer">
                            Details <FontAwesomeIcon icon={faArrowRight} className="text-sm -rotate-45" />
                        </Link>
                        <button className="w-full px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-lg hover:opacity-60 transition text-sm flex flex-row items-center justify-center gap-2 cursor-pointer">
                            Add to Cart <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
