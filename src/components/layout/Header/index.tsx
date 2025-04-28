
"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Header() {

    return (
        <header className="w-full h-36 bg-[var(--background)] fixed top-0 left-0 z-50">
            <div className="max-w-6xl h-full mx-auto flex items-center justify-between px-6 py-12">
                <Link href="/" className="order-1 w-fit h-full flex items-center">
                    <Image
                        src='/logo.png'
                        width={100}
                        height={100}
                        alt='Hyundai Official Jakarta'
                    />
                </Link>

                <nav className="order-2 flex items-center gap-6">
                    <form className="relative">
                        <input
                            type="text"
                            placeholder="Search Product..."
                            className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                        />
                    </form>

                    <Link href="/wishlist" className="relative">
                        <FontAwesomeIcon icon={faHeart} className="text-[var(--foreground)] hover:text-[var(--primary)] text-lg" />
                    </Link>

                    <Link href="/cart" className="relative">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-[var(--foreground)] hover:text-[var(--primary)] text-lg" />
                        <span className="absolute -top-2 -right-2 bg-[var(--alert)] text-[var(--background)] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            2
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/signin"
                            className="text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="text-[var(--background)] bg-[var(--primary)] px-6 py-2 rounded-full transition-all hover:opacity-60"
                        >
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
