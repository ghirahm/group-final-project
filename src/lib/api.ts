
const BASE_URL = 'https://finalprojectbackend-production-9a18.up.railway.app';

export async function getBooks() {
    const res = await fetch(`${BASE_URL}/api/v1/books/`);

    if (!res.ok) throw new Error('Failed to fetch books');
    const result = await res.json();
    return result.data.books;
}

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/api/v1/categories/`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const result = await res.json();
    return result.data.categories;
}

export async function getBooksByCategory(category: string) {
    const url = `${BASE_URL}/api/v1/books/?
    category=${encodeURIComponent(category)}&publisher_name=&author_name=&seller_name=&city_name=&min_rating=&min_price=&max_price=&sort_by=&order=`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch books by category');
    const result = await res.json();
    return result.data.books;
}

function getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

export async function getUserProfile() {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Failed to fetch user data');
    return res.json();
}

export async function getUserBalance() {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No access token found');

    const res = await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/users/balance', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        console.error("Error Response:", error);
        throw new Error(error.message || 'Failed to fetch user balance');
    }

    return res.json();
}

export async function getUserReferral() {
    const res = await fetch(`${BASE_URL}/api/v1/users/referral`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch referral info');
    return res.json();
}