'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { Book } from '@/types/book';

interface Category {
    id: number;
    name: string;
}

interface BookContextType {
    books: Book[];
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    refreshBooks: () => Promise<void>;
    fetchMyBooks: () => Promise<void>;
}

const BookContext = createContext<BookContextType>({
    books: [],
    categories: [],
    loading: true,
    error: null,
    fetchCategories: async () => { },
    refreshBooks: async () => { },
    fetchMyBooks: async () => { },
});

export const useBooks = () => useContext(BookContext);

export function BookProvider({ children }: { children: React.ReactNode }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        try {
            const res = await fetch("https://finalprojectbackend-production-9a18.up.railway.app/api/v1/books");
            const json = await res.json();
            setBooks(json.data.books);
        } catch (err) {
            setError("Failed to load books");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`https://finalprojectbackend-production-9a18.up.railway.app/api/v1/categories/`);
            if (!res.ok) throw new Error('Failed to fetch categories');
            const json = await res.json();
            setCategories(json.data.categories);
        } catch (err) {
            setError("Failed to load categories");
            console.error(err);
        }
    };

    const fetchMyBooks = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('No access token found');

            const res = await fetch("https://finalprojectbackend-production-9a18.up.railway.app/api/v1/books/me", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) throw new Error('Failed to fetch your books');

            const json = await res.json();
            console.log(json)
            return json.data.books;
        } catch (err) {
            setError("Failed to load books");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    return (
        <BookContext.Provider
            value={{ books, categories, loading, error, refreshBooks: fetchBooks, fetchCategories, fetchMyBooks }}
        >
            {children}
        </BookContext.Provider>
    );
}
