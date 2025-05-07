import { faHeart } from "@fortawesome/free-solid-svg-icons";

import CustomerHeader from "@/components/ui/CustomerHeader";
import ProductCard from "@/components/product/ProductCard.tsx";

export default function Wishlist() {
    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <CustomerHeader title='Wishlist Items' icon={faHeart} />
            <div className="col-span-3 grid grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                    <ProductCard
                        image="/product/book1.jpg"
                        author="J. K. Rowling"
                        title="Harry Potter: The Goblet of Fire"
                        originalPrice={150000}
                        discountedPrice={100000}
                        key={index}
                    />
                ))}
            </div>
        </section>
    )
}