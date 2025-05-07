"use client"

import { useState } from "react";
import Image from "next/image";
import { faCartShopping, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import CustomerHeader from "@/components/ui/CustomerHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    selected: boolean;
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Semesta Kata: Hidup dan Harapan',
            image: '/product/book1.jpg',
            price: 95000,
            quantity: 1,
            selected: true,
        },
        {
            id: 2,
            name: 'Filosofi Teras',
            image: '/product/book1.jpg',
            price: 88000,
            quantity: 2,
            selected: true,
        },
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const toggleSelect = (id: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const total = cartItems
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <CustomerHeader title='Cart Items' icon={faCartShopping} />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-600">
                            <th className="px-4 py-6">Select</th>
                            <th className="px-4 py-6">Product</th>
                            <th className="px-4 py-6">Quantity</th>
                            <th className="px-4 py-6">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100">
                                <td className="px-4 py-6">
                                    <input
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={() => toggleSelect(item.id)}
                                        className="accent-[var(--primary)]"
                                    />
                                </td>
                                <td className="px-4 py-6 flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span>{item.name}</span>
                                </td>
                                <td className="px-4 py-6">
                                    <div className="flex flex-row items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faMinusCircle} className="text-md" />
                                        </button>
                                        <input
                                            type="text"
                                            id="quantity-input"
                                            value={item.quantity}
                                            readOnly
                                            className="w-12 text-center text-[var(--foreground)] text-sm"
                                            placeholder="999"
                                            required
                                        />
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-12 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle} className="text-md" />
                                        </button>
                                    </div>
                                </td>
                                <td className="py-3 px-2 font-medium text-[var(--foreground)]">
                                    Rp {item.price.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total & Checkout */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <p className="text-lg font-semibold">
                    Total: <span className="text-[var(--primary)]">Rp {total.toLocaleString()}</span>
                </p>
                <button className="px-6 py-2 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-opacity-90 transition">
                    Checkout
                </button>
            </div>
        </section>
    )
}