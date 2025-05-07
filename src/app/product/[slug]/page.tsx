"use client"

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinusCircle, faPlusCircle, faShop } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard.tsx';

interface ProductProps {
    params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductProps) {
    const [showMore, setShowMore] = useState(false);
    const [activeTab, setActiveTab] = useState<'deskripsi' | 'detail'>('deskripsi');
    const [quantity, setQuantity] = useState(1);

    const dummyData = {
        slug: 'semesta-kata-hidup',
        title: 'Semesta Kata: Hidup dan Harapan',
        description: 'Buku ini merangkai kata-kata menjadi jembatan untuk memahami hidup dan harapan.',
        author: 'Ghirah Madani',
        category: 'Puisi',
        image: '/product/book1.jpg',
        originalPrice: 120000,
        discountedPrice: 95000,
    };

    const fullDescription = `Banyak orang mengira mengetahui siapa dan apa kepribadian mereka sebenarnya. Kenyataannya, mereka sering kali terkejut ketika melakukan tes tipe kepribadian yang ada di buku ini. Pada akhirnya, mereka mampu mengenali dan menemukan berbagai sisi lain dalam diri mereka, baik positif maupun negatif, yang mau tidak mau harus mereka akui.`;

    const shortDescription = fullDescription.slice(0, 220);

    if (params.slug !== dummyData.slug) return notFound();

    const discount = Math.round(
        ((dummyData.originalPrice - dummyData.discountedPrice) / dummyData.originalPrice) * 100
    );

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <section className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-12 mt-24 py-12">
            <div className="w-full h-[400px] relative col-span-1">
                <Image
                    src={dummyData.image}
                    alt={dummyData.title}
                    fill
                    className="object-cover rounded-xl"
                />
            </div>

            <div className="flex flex-col gap-6 text-[var(--foreground)] col-span-2">
                <p className="w-fit text-sm bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-full">{dummyData.author}</p>
                <h1 className="text-4xl font-bold">{dummyData.title}</h1>

                <div className="flex items-center gap-6">
                    <p className="text-xl line-through text-gray-400">Rp {dummyData.originalPrice.toLocaleString()}</p>
                    <p className="text-2xl font-extrabold text-[var(--primary)] px-6 py-2 border-2 border-[var(--primary)] rounded-full">Rp {dummyData.discountedPrice.toLocaleString()}</p>
                    <div className="w-12 h-12 bg-[var(--alert)] text-[var(--background)] text-xs font-semibold rounded-full flex items-center justify-center">
                        {discount}%<br />OFF
                    </div>
                </div>

                <div className="w-full flex flex-row items-center gap-6 text-sm font-semibold text-[var(--foreground)]">
                    <div className="flex flex-row gap-6 items-center justify-center">
                        <div className="flex flex-row items-center gap-2 text-center">
                            <button
                                onClick={decrement}
                                className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center"
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
                                className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="text-md" />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            console.log('Added', quantity, 'to cart');
                        }}
                        className="px-6 py-2 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
                    >
                        Add to Cart
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary)] hover:bg-gray-200 px-6 py-2 rounded-xl">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Favorit</span>
                    </div>

                </div>


                <div className="mt-12 space-y-6">
                    {/* Tab Buttons */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('deskripsi')}
                            className={`px-4 py-2 font-semibold text-sm ${activeTab === 'deskripsi'
                                ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]'
                                : 'text-gray-500'
                                }`}
                        >
                            Deskripsi
                        </button>
                        <button
                            onClick={() => setActiveTab('detail')}
                            className={`px-4 py-2 font-semibold text-sm ${activeTab === 'detail'
                                ? 'border-b-2 border-[var(--primary)] text-[var(--primary)]'
                                : 'text-gray-500'
                                }`}
                        >
                            Detail Buku
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'deskripsi' ? (
                        <div>
                            <p className="text-gray-700 leading-relaxed">
                                {showMore ? fullDescription : shortDescription}
                                {!showMore && ' '}
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className="ml-1 text-sm text-[var(--primary)] font-semibold"
                                >
                                    {showMore ? 'Tutup' : 'Baca Selengkapnya'}{' '}
                                    <span className="inline-block">{showMore ? '▲' : '▼'}</span>
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm text-gray-800">
                            <div>
                                <p className="font-medium">Penerbit</p>
                                <p>
                                    <a
                                        href="#"
                                        className="text-[var(--primary)] underline hover:opacity-80"
                                    >
                                        Gramedia Pustaka Utama
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">Tanggal Terbit</p>
                                <p>17 Feb 2022</p>
                            </div>

                            <div>
                                <p className="font-medium">ISBN</p>
                                <p>9786020659107</p>
                            </div>
                            <div>
                                <p className="font-medium">Halaman</p>
                                <p>160</p>
                            </div>

                            <div>
                                <p className="font-medium">Bahasa</p>
                                <p>Indonesia</p>
                            </div>
                            <div>
                                <p className="font-medium">Panjang</p>
                                <p>20.0 cm</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <h2 className="text-2xl text-[var(--foreground)] font-extrabold flex flex-row items-center gap-2"><FontAwesomeIcon icon={faShop} className="text-sm text-[var(--foreground)]" />Related Products</h2>
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
    );
}
