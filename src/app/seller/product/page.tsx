"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SellerHeader from '@/components/ui/SellerHeader';
import { faPlusCircle, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBooks } from '@/context/BookContext';

interface Product {
    id: number;
    title: string;
    image_url_1: string;
    categories: { name: string }[];
    price: number;
    stock: number;
}

export default function Products() {
    const { fetchMyBooks } = useBooks();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const books = await fetchMyBooks();
            if (books) {
                setProducts(books);
            }
            setLoading(false);
        };
        load();
    }, [fetchMyBooks]);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <SellerHeader title='Product List' icon={faShop} />

            <div className="flex flex-col overflow-auto w-full">
                <div className="flex justify-end mb-6">
                    <button className="bg-[var(--secondary)] text-[var(--primary)] text-sm font-medium px-6 py-2 rounded-lg flex flex-row gap-2 items-center cursor-pointer">
                        <FontAwesomeIcon icon={faPlusCircle} className='text-sm' />
                        Add Product
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-600">
                                <th className="px-4 py-6">No</th>
                                <th className="px-4 py-6">Image</th>
                                <th className="px-4 py-6">Name</th>
                                <th className="px-4 py-6">Category</th>
                                <th className="px-4 py-6">Price</th>
                                <th className="px-4 py-6">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-gray-500 py-12">
                                        You dont have any products yet.
                                    </td>
                                </tr>
                            ) : (

                                products.map((product, index) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-[var(--secondary)]">
                                        <td className="px-4 py-6">{index + 1}</td>
                                        <td className="px-4 py-6">
                                            <Image
                                                src={product.image_url_1}
                                                alt={product.title}
                                                width={96}
                                                height={96}
                                                className="rounded-md object-cover border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-4 py-6">{product.title}</td>
                                        <td className="px-4 py-6">
                                            {product.categories?.map(c => c.name).join(', ') || '-'}
                                        </td>
                                        <td className="px-4 py-6">Rp {product.price.toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-6">{product.stock}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
