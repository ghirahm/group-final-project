import ProductCard from "@/components/product/ProductCard.tsx";
import ImageHero from "@/components/ui/ImageHero";
import { faArrowAltCircleRight, faFilter, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
    return (
        <main className="w-full flex flex-col gap-12 py-36">
            <section className="max-w-7xl mx-auto min-h-fit overflow-hidden">
                <div className="w-full h-full grid grid-cols-2 bg-[var(--primary)] rounded-4xl overflow-hidden">
                    {/* Section 1 */}
                    <div className="order-1 col-span-1 flex flex-col items-start justify-center gap-2 p-12">
                        <h2 className="text-2xl font-extrabold uppercase text-[var(--primary)] bg-[var(--secondary)] rounded-full px-6 py-2">
                            FIND HERE!
                        </h2>
                        <h1 className="text-6xl font-black leading-16 text-[var(--secondary)] flex flex-col">
                            BOOKS FOR<br />EVERY READER
                        </h1>
                        <p className="max-w-xl text-[var(--background)] text-sm leading-loose">
                            Discover, buy, and enjoy a world of books at Semesta Kata. From timeless classics to the latest bestsellers — all in one place.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="order-2 col-span-1">
                        <ImageHero />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto min-h-screen flex flex-col gap-6">
                <div className="w-full flex flex-row items-center justify-between">
                    <h2 className="text-2xl text-[var(--foreground)] font-extrabold flex flex-row items-center gap-2"><FontAwesomeIcon icon={faShop} className="text-sm text-[var(--foreground)]" />Trend Books</h2>
                    <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-2xl hover:bg-opacity-80 transition flex flex-row items-center gap-2">
                        <FontAwesomeIcon icon={faFilter} className="text-md" /> Filter Products
                    </button>
                </div>

                <div className="w-full grid grid-cols-4 gap-6">
                    <div className="col-span-1 flex flex-col items-center justify-between bg-[var(--secondary)] p-6 rounded-2xl h-[360px]">
                        <div className="">
                            <h2 className="text-6xl font-bold mb-4 text-left text-[var(--primary)]">New Arrivals</h2>
                        </div>
                        <div className="w-full h-fit flex items-center justify-end">
                            <button className="w-12 h-12 flex items-center justify-center bg-[var(--primary)] text-white rounded-full hover:bg-opacity-80 transition">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-md text-[var(--background)]" />
                            </button>
                        </div>
                    </div>

                    <div className="col-span-3 grid grid-cols-3 gap-6">
                        {[...Array(9)].map((_, index) => (
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
                </div>
            </section>
        </main >
    );
}
