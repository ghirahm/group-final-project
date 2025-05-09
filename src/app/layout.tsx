import type { Metadata } from "next";
import "./globals.css";

import { BookProvider } from "@/context/BookContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Poppins } from 'next/font/google';
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
})

export const metadata: Metadata = {
	title: "Semesta Kata | Online Book Store",
	description: "Semesta Kata adalah toko buku online terpercaya yang menyediakan berbagai pilihan buku berkualitas untuk memperluas wawasanmu. Temukan buku favoritmu di sini!",
	authors: [{ name: "Semesta Kata Team" }],
	creator: "Semesta Kata"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`} cz-shortcut-listen="true">
				<AuthProvider>
					<BookProvider >
						<Header />
						{children}
						<Footer />
					</BookProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
