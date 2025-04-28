export default function Footer() {
    return (
        <footer className="w-full bg-[var(--background-secondary)] text-[var(--foreground)] py-8 px-4 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left - Logo and Tagline */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-2xl font-bold">Semesta Kata</h1>
                    <p className="text-sm text-gray-500 mt-2">Expanding your universe, one book at a time.</p>
                </div>

                {/* Center - Navigation Links */}
                <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                    <a href="/about" className="hover:text-[var(--primary)] transition">About Us</a>
                    <a href="/shop" className="hover:text-[var(--primary)] transition">Shop</a>
                    <a href="/contact" className="hover:text-[var(--primary)] transition">Contact</a>
                </div>

                {/* Right - Copyright */}
                <div className="text-xs text-gray-400 text-center md:text-right">
                    © {new Date().getFullYear()} Semesta Kata. All rights reserved.
                </div>
            </div>
        </footer>

    )
}