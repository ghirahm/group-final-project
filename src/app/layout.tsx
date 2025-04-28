import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import { Poppins } from 'next/font/google';
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
})


export const metadata: Metadata = {
	title: "Semesta Kata | Online Book Store",
	description: "Semesta Kata adalah toko buku online terpercaya yang menyediakan berbagai pilihan buku berkualitas untuk memperluas wawasanmu. Temukan buku favoritmu di sini!",
	authors: [{ name: "Semesta Kata Team" }],
	creator: "Semesta Kata",
	viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`} cz-shortcut-listen="true">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
