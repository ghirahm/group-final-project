/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
    image: string;
    author: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
}

export default function ProductCard({ image, author, title, originalPrice, discountedPrice }: ProductCardProps) {
    function formatNumber(num: number) {
        return num.toLocaleString('id-ID');
    }

    function calculateDiscount(original: number, discounted: number) {
        if (original <= discounted) return 0;
        return Math.round(((original - discounted) / original) * 100);
    }

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
                <button className="absolute top-4 right-4 bg-[var(--background)] rounded-full p-2 shadow-md hover:bg-[var(--background)] hover:text-[var(--primary)] transition z-10 w-8 h-8 flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                </button>
            </div>

            {/* Text Section */}
            <div className="p-4 flex flex-col gap-2">
                <p className="text-xs text-gray-500">{author}</p>
                <h2 className="text-2xl font-semibold line-clamp-2">{title}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-400 line-through">Rp {formatNumber(originalPrice)}</p>
                    <p className="text-sm font-extrabold text-[var(--primary)] px-6 py-2 border-2 border-[var(--primary)] rounded-full">
                        Rp {formatNumber(discountedPrice)}
                    </p>
                    {calculateDiscount(originalPrice, discountedPrice) > 0 && (
                        <div className="w-8 h-8 bg-[var(--alert)] text-[var(--background)] text-[6px] font-semibold rounded-full flex items-center justify-center">
                            {calculateDiscount(originalPrice, discountedPrice)}%<br />OFF
                        </div>
                    )}
                </div>

                {/* Buttons Section */}
                <div className="flex w-full gap-2 mt-4">
                    <button className="w-fit px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-[var(--background)] transition text-sm flex flex-row items-center justify-center gap-2">
                        Details <FontAwesomeIcon icon={faArrowRight} className="text-sm -rotate-45" />
                    </button>
                    <button className="w-full px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-lg hover:opacity-60 transition text-sm flex flex-row items-center justify-center gap-2">
                        Add to Cart <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
}
