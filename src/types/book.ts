interface Category {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    title: string;
    author_name: string;
    publisher_name: string;
    image_url_1: string;
    price: number;
    discount_percent: number;
    description: string;
    stock: number;
    categories?: Category[];
}
