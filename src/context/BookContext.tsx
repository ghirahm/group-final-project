'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
    originalPrice: number;
    discountedPercent: number;
    description: string;
}

interface BookContextType {
    books: Book[];
    loading: boolean;
    error: string | null;
    refreshBooks: () => Promise<void>;
}

const BookContext = createContext<BookContextType>({
    books: [],
    loading: true,
    error: null,
    refreshBooks: async () => { },
});

export const useBooks = () => useContext(BookContext);

export function BookProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        try {
            const res = await fetch("https://finalprojectbackend-production-9a18.up.railway.app/api/v1/books");
            const json = await res.json();
            setBooks(json.data); // adjust if needed
        } catch (err) {
            setError('Failed to load books');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <BookContext.Provider value={{ books, loading, error, refreshBooks: fetchBooks }}>
            {children}
        </BookContext.Provider>
    );
}
