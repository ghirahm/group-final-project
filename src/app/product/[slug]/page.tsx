"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faMinusCircle,
    faPlusCircle,
    faShop,
} from "@fortawesome/free-solid-svg-icons";

import ProductCard from "@/components/product/ProductCard";
import { useBooks } from "@/context/BookContext";

interface Category {
    id: number;
    name: string;
}

interface Book {
    id: number;
    title: string;
    author_name: string;
    publisher_name: string;
    image_url_1: string;
    price: number;
    discount_percent: number;
    description: string;
    categories?: Category[];
}

interface CartItem {
    id: number;
    title: string;
    image: string;
    author_name: string;
    price: number;
    discount_percent: number;
    quantity: number;
}

export default function ProductDetailPage() {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"deskripsi" | "detail">("deskripsi");
    const [quantity, setQuantity] = useState(1);
    const [recommended, setRecommended] = useState<Book[]>([]);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const params = useParams() as { slug: string };
    const { books } = useBooks();

    function formatNumber(num: number | undefined | null): string {
        if (typeof num !== "number" || isNaN(num)) return "0";
        return num.toLocaleString("id-ID");
    }

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(
                    `https://finalprojectbackend-production-9a18.up.railway.app/api/v1/books/${params.slug}`
                );
                const json = await res.json();
                setBook(json.data);
            } catch (err) {
                console.error("Book not found", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [params.slug]);

    useEffect(() => {
        if (books.length > 0) {
            const shuffled = [...books].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            setRecommended(selected);
        }
    }, [books]);

    useEffect(() => {
        if (!book) return;
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(wishlist.some((item: any) => item.id === book.id));
    }, [book]);

    const handleWishlist = () => {
        if (!book) return;
        const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const alreadyInWishlist = currentWishlist.some(
            (item: any) => item.id === book.id
        );

        let updatedWishlist;
        if (alreadyInWishlist) {
            updatedWishlist = currentWishlist.filter(
                (item: any) => item.id !== book.id
            );
            setIsWishlisted(false);
        } else {
            updatedWishlist = [
                ...currentWishlist,
                {
                    id: book.id,
                    title: book.title,
                    image: book.image_url_1,
                    author: book.author_name,
                    originalPrice: book.price,
                    discountedPercent: book.discount_percent,
                },
            ];
            setIsWishlisted(true);
        }

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        if (!book) return;

        const currentCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = currentCart.find(item => item.id === book.id);

        let updatedCart;

        if (existingItem) {
            updatedCart = currentCart.map(item =>
                item.id === book.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedCart = [
                ...currentCart,
                {
                    id: book.id,
                    title: book.title,
                    image: book.image_url_1,
                    author: book.author_name,
                    price: book.price,
                    discount_percent: book.discount_percent,
                    quantity: quantity,
                }
            ];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`${book.title} added to cart (${quantity})`);
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (!book) return <p className="p-6 text-red-500">Book not found.</p>;

    return (
        <section className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-12 mt-24 py-12">
            <div className="w-full h-[400px] relative col-span-1">
                <img
                    src={book.image_url_1}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <div className="flex flex-col gap-6 text-[var(--foreground)] col-span-2">
                <p className="w-fit text-sm bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-full">
                    {book.author_name}
                </p>
                <h1 className="text-4xl font-bold">{book.title}</h1>

                <div className="flex items-center gap-6">
                    <p className="text-xl line-through text-gray-400">
                        Rp {book.price.toLocaleString()}
                    </p>
                    <p className="text-2xl font-extrabold text-[var(--primary)] px-6 py-2 border-2 border-[var(--primary)] rounded-full">
                        Rp {formatNumber(book.price * ((100 - book.discount_percent) / 100))}
                    </p>
                    <div className="w-12 h-12 bg-[var(--alert)] text-[var(--background)] text-xs font-semibold rounded-full flex items-center justify-center">
                        {book.discount_percent}%<br />
                        OFF
                    </div>
                </div>

                <div className="w-full flex flex-row items-center gap-6 text-sm font-semibold text-[var(--foreground)]">
                    <div className="flex flex-row gap-6 items-center justify-center">
                        <div className="flex flex-row items-center gap-2 text-center">
                            <button
                                onClick={decrement}
                                className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center  cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faMinusCircle} className="text-md" />
                            </button>
                            <input
                                type="text"
                                id="quantity-input"
                                value={quantity}
                                readOnly
                                className="w-12 text-center text-[var(--foreground)] text-sm"
                                placeholder="999"
                                required
                            />
                            <button
                                onClick={increment}
                                className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="text-md" />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            handleAddToCart();
                        }}
                        className="px-6 py-2 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition cursor-pointer"
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={handleWishlist}
                        className={`flex items-center gap-2 cursor-pointer hover:text-[var(--primary)] hover:bg-gray-200 ${isWishlisted ? "text-[var(--primary)]" : "text-[var(--foreground)]"} px-6 py-2 rounded-xl`}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                        <span>{isWishlisted ? "Favorited" : "Favorite"}</span>
                    </button>
                </div>

                <div className="mt-12 space-y-6">
                    <div className="flex border-b border-gray-400">
                        <button
                            onClick={() => setActiveTab("deskripsi")}
                            className={`px-6 py-2 font-semibold text-sm cursor-pointer ${activeTab === "deskripsi"
                                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                                : "text-gray-400"
                                }`}
                        >
                            Deskripsi
                        </button>
                        <button
                            onClick={() => setActiveTab("detail")}
                            className={`px-4 py-2 font-semibold text-sm cursor-pointer ${activeTab === "detail"
                                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                                : "text-gray-400"
                                }`}
                        >
                            Detail Buku
                        </button>
                    </div>

                    {activeTab === "deskripsi" ? (
                        <div>
                            <p className="text-sm text-[var(--foreground)]">{book.description}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm text-[var(--foreground)]">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Category</p>
                                <div className="text-sm flex flex-wrap gap-2">
                                    {book.categories?.map((category) => (
                                        <span
                                            key={category.id}
                                            className="px-4 py-1 border-2 border-[var(--primary)] rounded-full"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Publisher</p>
                                <p className="text-sm">{book.publisher_name}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <h2 className="text-2xl text-[var(--foreground)] font-extrabold col-span-3 flex items-center gap-2 mt-12">
                <FontAwesomeIcon icon={faShop} className="text-sm" /> Recommended Books
            </h2>
            <div className="col-span-3 grid grid-cols-3 gap-6">
                {recommended.map((book, index) => (
                    <ProductCard
                        key={index}
                        id={book.id}
                        image={book.image_url_1}
                        author={book.author_name}
                        title={book.title}
                        originalPrice={book.price}
                        discountedPercent={book.discount_percent}
                    />
                ))}
            </div>
        </section>
    );
}
