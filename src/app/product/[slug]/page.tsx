"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinusCircle, faPlusCircle, faShop } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '@/components/product/ProductCard.tsx';
import { useBooks } from '@/context/BookContext';

interface ProductProps {
    params: { slug: number };
}

interface Book {
    id: number;
    title: string;
    author_name: string;
    image_url_1: string;
    price: number;
    discount_percent: number;
    description: string;
}

export default function ProductDetailPage({ params }: ProductProps) {
    const [book, setBook] = useState<Book | null>(null);
    const [recommended, setRecommended] = useState<Book[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [activeTab, setActiveTab] = useState<'deskripsi' | 'detail'>('deskripsi');
    const [quantity, setQuantity] = useState(1);

    const { books, loading: booksLoading } = useBooks();
    const router = useRouter();

    // Fetch detail for the main book
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`https://finalprojectbackend-production-9a18.up.railway.app/api/v1/books/${params.slug}`);
                const json = await res.json();
                console.log(json.data)
                setBook(json.data);
            } catch (err) {
                console.error('Book not found', err);
                router.push('/not-found');
            }
        };

        fetchBook();
    }, [params.slug]);

    useEffect(() => {
        if (books.length > 0 && book) {
            const others = books.filter((b) => b.id !== book.id);
            const shuffled = others.sort(() => 0.5 - Math.random());
            setRecommended(shuffled.slice(0, 3));
        }
    }, [books, book]);

    if (!book) return <p className="p-6">Loading...</p>;

    const shortDescription = book.description.slice(0, 220);
    const formatNumber = (num: number | undefined | null): string =>
        typeof num === 'number' ? num.toLocaleString('id-ID') : '0';

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <section className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-12 mt-24 py-12">
            {/* Image */}
            <div className="w-full h-[400px] relative col-span-1">
                <img src={book.image_url_1} alt={book.title} className="object-cover rounded-xl" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6 text-[var(--foreground)] col-span-2">
                <p className="w-fit text-sm bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-full">{book.author_name}</p>
                <h1 className="text-4xl font-bold">{book.title}</h1>

                <div className="flex items-center gap-6">
                    <p className="text-xl line-through text-gray-400">Rp {formatNumber(book.price)}</p>
                    <p className="text-2xl font-extrabold text-[var(--primary)] px-6 py-2 border-2 border-[var(--primary)] rounded-full">
                        Rp {formatNumber(book.price * ((100 - book.discount_percent) / 100))}
                    </p>
                    <div className="w-12 h-12 bg-[var(--alert)] text-[var(--background)] text-xs font-semibold rounded-full flex items-center justify-center">
                        {book.discount_percent}%<br />OFF
                    </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="w-full flex flex-row items-center gap-6 text-sm font-semibold text-[var(--foreground)]">
                    <div className="flex flex-row gap-6 items-center justify-center">
                        <button onClick={decrement} className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded">
                            <FontAwesomeIcon icon={faMinusCircle} />
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="w-12 text-center text-sm"
                        />
                        <button onClick={increment} className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                    </div>
                    <button onClick={() => console.log('Added', quantity, 'to cart')} className="px-6 py-2 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition">
                        Add to Cart
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary)] hover:bg-gray-200 px-6 py-2 rounded-xl">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Favorit</span>
                    </div>
                </div>

                {/* Description Tabs */}
                <div className="mt-12 space-y-6">
                    <div className="flex border-b border-gray-200">
                        <button onClick={() => setActiveTab('deskripsi')} className={`px-4 py-2 font-semibold text-sm ${activeTab === 'deskripsi' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-gray-500'}`}>Deskripsi</button>
                        <button onClick={() => setActiveTab('detail')} className={`px-4 py-2 font-semibold text-sm ${activeTab === 'detail' ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]' : 'text-gray-500'}`}>Detail Buku</button>
                    </div>

                    {activeTab === 'deskripsi' ? (
                        <p className="text-gray-700 leading-relaxed">
                            {showMore ? book.description : shortDescription}
                            {!showMore && (
                                <button onClick={() => setShowMore(true)} className="ml-1 text-sm text-[var(--primary)] font-semibold">Baca Selengkapnya ▼</button>
                            )}
                            {showMore && (
                                <button onClick={() => setShowMore(false)} className="ml-1 text-sm text-[var(--primary)] font-semibold">Tutup ▲</button>
                            )}
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm text-gray-800">
                            <div><p className="font-medium">Penerbit</p><p>Gramedia Pustaka Utama</p></div>
                            <div><p className="font-medium">Tanggal Terbit</p><p>17 Feb 2022</p></div>
                            <div><p className="font-medium">ISBN</p><p>9786020659107</p></div>
                            <div><p className="font-medium">Halaman</p><p>160</p></div>
                            <div><p className="font-medium">Bahasa</p><p>Indonesia</p></div>
                            <div><p className="font-medium">Panjang</p><p>20.0 cm</p></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recommendation */}
            <h2 className="text-2xl text-[var(--foreground)] font-extrabold col-span-3 flex flex-row items-center gap-2 mt-12">
                <FontAwesomeIcon icon={faShop} className="text-sm" />
                Recommendation Books
            </h2>

            <div className="col-span-3 grid grid-cols-3 gap-6">
                {recommended.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        author={item.author_name}
                        title={item.title}
                        originalPrice={item.price}
                        discountedPercent={item.discount_percent}
                    />
                ))}
            </div>
        </section>
    );
}
