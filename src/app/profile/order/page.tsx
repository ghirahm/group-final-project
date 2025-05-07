'use client';

import Image from 'next/image';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import CustomerHeader from '@/components/ui/CustomerHeader';

const orderedItems = [
    {
        id: 1,
        name: 'Semesta Kata: Hidup dan Harapan',
        image: '/product/book1.jpg',
        price: 95000,
        quantity: 1,
        status: 'Completed',
    },
    {
        id: 2,
        name: 'Filosofi Teras',
        image: '/product/book1.jpg',
        price: 88000,
        quantity: 2,
        status: 'Delivered',
    },
];

export default function Order() {
    return (
        <section className="flex flex-col gap-6 min-h-screen">
            <CustomerHeader title="Ordered Items" icon={faClipboardList} />

            <div className="grid grid-cols-2 gap-4">
                {orderedItems.map((item) => (
                    <div
                        key={item.id}
                        className="w-full h-[320px] grid grid-cols-2 gap-6 p-2 border border-gray-200 rounded-2xl hover:shadow-md bg-[var(--background)]"
                    >
                        {/* Left: Image and Info */}
                        <div className="col-span-1">
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: Status and Buttons */}
                        <div className="w-full col-span-1 flex flex-col items-start justify-between gap-4 py-6">
                            <div className='flex flex-col items-start gap-2'>
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full 
                                ${item.status === 'Completed' && 'bg-green-100 text-green-600'}
                                ${item.status === 'Delivered' && 'bg-blue-100 text-blue-600'}
                                ${item.status === 'Payment Pending' && 'bg-yellow-100 text-yellow-600'}
                                `}
                                >
                                    {item.status}
                                </span>
                                <div className="flex flex-col gap-2 mt-2">
                                    <h3 className="font-semibold text-[var(--foreground)] text-lg text-balance">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">Jumlah: {item.quantity}</p>
                                    <p className="text-md font-bold text-[var(--primary)]">
                                        Rp {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full md:w-fit">
                                <button className="flex-1 px-4 py-2 rounded-full bg-[var(--primary)] text-[var(--background)] text-sm font-medium hover:opacity-60 transition cursor-pointer">
                                    Repurchase
                                </button>
                                <button className="flex-1 px-4 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--background)] transition cursor-pointer">
                                    Review
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
