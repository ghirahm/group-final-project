'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* Icon Libraries */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClipboardList, faCartShopping, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons/faMoneyCheckDollar";

const sidebar = [
    { name: "Favorites", icon: faHeart, href: "/profile/wishlist" },
    { name: "Carts", icon: faCartShopping, href: "/profile/cart" },
    { name: "Orders", icon: faClipboardList, href: "/profile/order" }
];

export default function Costumer({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="max-w-8xl mx-auto min-h-screen bg-[var(--background)] mt-24 py-12 px-12 grid grid-cols-4 gap-12">
            <aside className="w-full h-full col-span-1 bg-[var(--background)] rounded-3xl p-6 text-[var(--foreground)] border-2 border-[var(--primary)]">
                <nav className="w-full h-full  flex flex-col justify-between items-center">
                    <div className="w-full h-full flex flex-col gap-6">
                        <div className="w-full flex flex-col items-center gap-6">
                            <div className="w-36 h-36 rounded-full overflow-hidden relative">
                                <Image
                                    src="/product/book1.jpg"
                                    alt="User Profile"
                                    fill
                                    className="object-cover"
                                    sizes="144px"
                                    priority
                                />
                            </div>
                            <h2 className="text-xl font-semibold px-6 py-2 border-2 border-[var(--primary)] rounded-full">Ghirah Madani</h2>
                            <p className="text-sm flex flex-row items-center gap-2"><FontAwesomeIcon icon={faMoneyCheckDollar} className="text-sm" />Balance: <span className="font-bold">150.000</span></p>
                        </div>

                        <div className="w-full flex flex-col items-start gap-2">
                            {sidebar.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`w-full flex items-center gap-6 px-4 py-2 rounded-lg text-md font-semibold transition group 
                                    ${pathname === item.href
                                            ? "bg-[var(--primary)] text-[var(--background)]"
                                            : "text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)]"}`}
                                >
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg
                                    ${pathname === item.href
                                            ? "bg-[var(--background)]"
                                            : "bg-[var(--secondary)] group-hover:bg-[var(--background)]"}`}>
                                        <FontAwesomeIcon icon={item.icon} className="text-[var(--primary)]" />
                                    </div>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">

                        <Link
                            href='/signout'
                            className="w-full flex items-center gap-6 px-4 py-2 rounded-lg text-md font-semibold transition group text-[var(--foreground)] hover:bg-[var(--alert)] hover:text-[var(--background)]"
                        >
                            <div className="w-8 h-8 bg-[var(--secondary)] group-hover:bg-[var(--background)] flex items-center justify-center rounded-lg">
                                <FontAwesomeIcon icon={faDoorOpen} className="text-[var(--primary)] group-hover:text-[var(--alert)]" />
                            </div>
                            Sign Out
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="col-span-3">{children}</main>
        </div>
    );
}
