import SellerHeader from '@/components/ui/SellerHeader';
import { faPlusCircle, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function Products() {

    const products = [
        {
            id: 1,
            image: '/product/book1.jpg',
            name: 'Book',
            category: 'Book',
            price: '25.000',
            stock: 120,
        },
        {
            id: 2,
            image: '/product/book1.jpg',
            name: 'Book',
            category: 'Books',
            price: '150.000',
            stock: 45,
        },
        {
            id: 3,
            image: '/product/book1.jpg',
            name: 'Book',
            category: 'Books',
            price: '12.500',
            stock: 200,
        },
        {
            id: 4,
            image: '/product/book1.jpg',
            name: 'Book',
            category: 'Books',
            price: '85.000',
            stock: 60,
        },
        {
            id: 5,
            image: '/product/book1.jpg',
            name: 'Book',
            category: 'Books',
            price: '220.000',
            stock: 30,
        }
    ];

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <SellerHeader title='Product List' icon={faShop} />

            <div className="flex flex-col overflow-auto w-full">
                <div className="flex justify-end mb-6">
                    <button className="bg-[var(--secondary)] text-[var(--primary)] text-sm font-medium px-6 py-2 rounded-lg flex flex-row gap-2 items-center cursor-pointer">
                        <FontAwesomeIcon icon={faPlusCircle} className='text-sm' />Add Product
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-600">
                                <th className="px-4 py-6">No</th>
                                <th className="px-4 py-6">Image</th>
                                <th className="px-4 py-6">Name</th>
                                <th className="px-4 py-6">Category</th>
                                <th className="px-4 py-6">Price</th>
                                <th className="px-4 py-6">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className="border-b border-gray-100 hover:bg-[var(--secondary)]">
                                    <td className="px-4 py-6">{index + 1}</td>
                                    <td className="px-4 py-6">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={96}
                                            height={96}
                                            className="rounded-md object-cover border border-gray-200"
                                        />
                                    </td>
                                    <td className="px-4 py-6">{product.name}</td>
                                    <td className="px-4 py-6">{product.category}</td>
                                    <td className="px-4 py-6">Rp {product.price.toLocaleString()}</td>
                                    <td className="px-4 py-6">{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    );
};