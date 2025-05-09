"use client";

import { useState, useEffect } from "react";
import {
    faCartShopping,
    faMinusCircle,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerHeader from "@/components/ui/CustomerHeader";

interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    selected: boolean;
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on first mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                setCartItems(parsedCart);
            } catch (err) {
                console.error("Failed to parse cart data:", err);
            }
        }
    }, []);

    const saveCart = (items: CartItem[]) => {
        setCartItems(items);
        localStorage.setItem("cart", JSON.stringify(items));
    };

    const updateQuantity = (id: number, delta: number) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        saveCart(updatedItems);
    };

    const toggleSelect = (id: number) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        saveCart(updatedItems);
    };

    const removeItem = (id: number) => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        saveCart(updatedItems);
    };

    const total = cartItems
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        const token = localStorage.getItem("accessToken");
        const selectedItems = cartItems.filter(item => item.selected);

        if (selectedItems.length === 0) {
            alert("Please select at least one product to checkout.");
            return;
        }

        const payload = {
            items: selectedItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
            total: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };

        try {
            const res = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Transaction completed successfully!");
                const remainingCart = cartItems.filter(item => !item.selected);
                saveCart(remainingCart);
            } else {
                alert("Transaction failed: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Something went wrong during checkout.");
        }
    };


    return (
        <section className="flex flex-col gap-6 min-h-screen">
            <CustomerHeader title="Cart Items" icon={faCartShopping} />

            {cartItems.length === 0 ? (
                <p className="text-center text-[var(--foreground)] text-lg font-medium py-12">
                    You dont have any products yet.
                </p>
            ) : (
                <>
                    {/* Cart Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-600">
                                    <th className="px-4 py-6">Select</th>
                                    <th className="px-4 py-6">Product</th>
                                    <th className="px-4 py-6">Quantity</th>
                                    <th className="px-4 py-6">Price</th>
                                    <th className="px-4 py-6 text-center">Action</th>
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
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <span>{item.name}</span>
                                        </td>
                                        <td className="px-4 py-6">
                                            <div className="flex flex-row items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-10 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center"
                                                >
                                                    <FontAwesomeIcon icon={faMinusCircle} />
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-12 text-center border border-gray-300 rounded text-[var(--foreground)]"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-10 h-8 bg-[var(--primary)] text-[var(--background)] rounded hover:opacity-90 flex items-center justify-center"
                                                >
                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 font-medium text-[var(--foreground)]">
                                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                        </td>
                                        <td className="py-3 px-2 text-center">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:underline text-sm"
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Total & Checkout */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <p className="text-lg font-semibold">
                            Total:{" "}
                            <span className="text-[var(--primary)]">
                                Rp {total.toLocaleString("id-ID")}
                            </span>
                        </p>
                        <button onClick={handleCheckout} className="px-6 py-2 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-opacity-90 transition">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
