"use client"

import { useState, useEffect } from "react";

import ProductCard from "@/components/product/ProductCard.tsx";
import ImageHero from "@/components/ui/ImageHero";

import { faFilter, faShop, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getBooks, getCategories, getBooksByCategory } from '@/lib/api';
import { handleLogout } from "@/lib/auth";

interface Book {
    id: number;
    title: string;
    author_name: string;
    image_url_1: string;
    price: number;
    discount_percent: number;
}

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooksAndCategories = async () => {
            try {
                const [bookData, categoryData] = await Promise.all([
                    getBooks(),
                    getCategories()
                ]);
                setBooks(bookData);
                setCategories(categoryData.map((cat: any) => cat.name));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooksAndCategories();
    }, []);

    useEffect(() => {
        const loginTime = localStorage.getItem("loginTime");
        if (!loginTime) return;

        const oneHour = 60 * 60 * 1000;
        const timePassed = Date.now() - parseInt(loginTime);
        const timeLeft = oneHour - timePassed;

        if (timeLeft <= 0) {

        } else {
            const timer = setTimeout(() => handleLogout(), timeLeft);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleCategoryClick = async (category: string) => {
        try {
            setLoading(true);
            const filteredBooks = await getBooksByCategory(category);
            console.log(filteredBooks)
            setBooks(filteredBooks);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-[var(--alert)]">Error: {error}</p>;

    return (
        <main className="w-full flex flex-col gap-12 mt-24 py-12">
            <section className="max-w-7xl mx-auto min-h-fit overflow-hidden">
                <div className="w-full h-full grid grid-cols-2 bg-[var(--primary)] rounded-4xl overflow-hidden">
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
                    <div className="order-2 col-span-1">
                        <ImageHero />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto min-h-screen flex flex-col gap-6">
                <div className="w-full flex flex-row items-center justify-between relative">
                    <h2 className="text-2xl text-[var(--foreground)] font-extrabold flex flex-row items-center gap-2">
                        <FontAwesomeIcon icon={faShop} className="text-sm text-[var(--foreground)]" />
                        Trend Books
                    </h2>

                    <div className="relative group">
                        <button
                            type="button"
                            className="px-6 py-2 bg-[var(--primary)] text-white rounded-2xl hover:opacity-80 transition flex flex-row items-center gap-2 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faFilter} className="text-md" />
                            Filter Products
                        </button>

                        <div className="absolute right-2 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-[var(--background)] shadow-lg z-50 p-4 transition-all duration-300 ease-in-out opacity-0 -translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
                            <div className="flex flex-col gap-2">
                                {categories.map((category, i) => (
                                    <button
                                        type="button"
                                        key={i}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCategoryClick(category)
                                        }}

                                        className="text-sm text-left px-4 py-2 rounded-lg hover:bg-[var(--primary)] hover:text-white transition"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
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
                        {books.map((book) => {
                            return (
                                <ProductCard
                                    key={book.id}
                                    id={book.id}
                                    image={book.image_url_1}
                                    author={book.author_name}
                                    title={book.title}
                                    originalPrice={book.price}
                                    discountedPercent={book.discount_percent}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </main >
    );
}
