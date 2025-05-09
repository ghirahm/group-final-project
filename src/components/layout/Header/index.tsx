"use client"

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import Image from "next/image";

import { useAuth } from '@/context/AuthContext';

const profiles = [
    { name: "Profile", href: "/profile" },
    { name: "Wishlist", href: "/profile/wishlist" },
    { name: "Cart", href: "/profile/cart" },
    { name: "Order", href: "/profile/order" },
    { name: "Seller Dashboard", href: "/seller" },
]

interface User {
    "full_name": string
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('No access token found');

                const res = await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const error = await res.json().catch(() => ({}));
                    console.error("Error Response:", error);
                    throw new Error(error.message || 'Failed to fetch referral');
                }

                const data = await res.json();
                console.log("Me: ", data)

                setUser(data.data)

            } catch (err) {
                console.error("Fetch referral error:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <header className="w-full h-24 bg-[var(--background)] fixed top-0 left-0 z-50">
            <div className="max-w-6xl h-full mx-auto flex items-center justify-between px-6 py-12">
                <Link href="/" className="order-1 w-fit h-full flex items-center">
                    <Image
                        src='/logo.png'
                        width={100}
                        height={100}
                        alt='Semesta Kata'
                    />
                </Link>

                <nav className="order-2 flex items-center gap-6">
                    {/* <form className="relative">
                        <input
                            type="text"
                            placeholder="Search Product..."
                            className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        />
                    </form> */}

                    <Link href="/profile/wishlist" className="relative">
                        <FontAwesomeIcon icon={faHeart} className="text-[var(--foreground)] hover:text-[var(--primary)] text-lg" />
                    </Link>

                    <Link href="/profile/cart" className="relative">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-[var(--foreground)] hover:text-[var(--primary)] text-lg" />
                        <span className="absolute -top-2 -right-2 bg-[var(--alert)] text-[var(--background)] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            2
                        </span>
                    </Link>

                    <div className="relative w-fit group">
                        {!isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/auth/signin"
                                    className="text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="text-[var(--background)] bg-[var(--primary)] px-6 py-2 rounded-full transition-all hover:opacity-60"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="relative w-fit group">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-6 py-2 text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)] rounded-full transition"
                                >
                                    <FontAwesomeIcon className="text-2xl" icon={faUserCircle} />
                                    <p className="text-sm font-medium">{user?.full_name}</p>
                                </Link>
                                <ul
                                    className="absolute left-0 top-full mt-2 w-56 bg-[var(--background)] text-[var(--foreground)] rounded-xl shadow-lg p-4 flex flex-col gap-2 transition-all duration-300 ease-in-out opacity-0 -translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible z-50 border border-gray-200"
                                >
                                    {profiles.map((profile, i) => (
                                        <Link href={profile.href} key={i}>
                                            <p className={`w-full text-sm px-2 py-2 rounded hover:text-[var(--background)] hover:bg-[var(--primary)] transition-all ${i === profiles.length - 1 ? 'border-t border-gray-200 pt-3 mt-2' : ''}`}>
                                                {profile.name}
                                            </p>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* <div className="flex items-center gap-2">
                        <Link
                            href="/auth/signin"
                            className="text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="text-[var(--background)] bg-[var(--primary)] px-6 py-2 rounded-full transition-all hover:opacity-60"
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div className="relative w-fit group">
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 px-6 py-2 text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)] rounded-full transition"
                        >
                            <FontAwesomeIcon className="text-2xl" icon={faUserCircle} />
                            <p className="text-sm font-medium">Ghirah</p>
                        </Link>
                        <ul
                            className="absolute left-0 top-full mt-2 w-56 bg-[var(--background)] text-[var(--foreground)] rounded-xl shadow-lg p-4 flex flex-col gap-2 transition-all duration-300 ease-in-out opacity-0 -translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible z-50 border border-gray-200"
                        >
                            {profiles.map((profile, i) => (
                                <Link href={profile.href} key={i}>
                                    <p className={`w-full text-sm px-2 py-2 rounded hover:text-[var(--background)] hover:bg-[var(--primary)] transition-all ${i === profiles.length - 1 ? 'border-t border-gray-200 pt-3 mt-2' : ''}`}>
                                        {profile.name}
                                    </p>
                                </Link>
                            ))}
                        </ul>
                    </div> */}
                </nav>
            </div>
        </header>
    );
}
