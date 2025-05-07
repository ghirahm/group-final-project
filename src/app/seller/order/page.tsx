
import SellerHeader from '@/components/ui/SellerHeader';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

export default function Orders() {
    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <SellerHeader title='Order List' icon={faClipboardList} />

            <div className="flex flex-col overflow-auto w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-600">
                                <th className="px-4 py-6">No</th>
                                <th className="px-4 py-6">Order ID</th>
                                <th className="px-4 py-6">Customer</th>
                                <th className="px-4 py-6">Date</th>
                                <th className="px-4 py-6">Status</th>
                                <th className="px-4 py-6">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    no: 1,
                                    id: '#1001',
                                    customer: 'Jane Doe',
                                    date: '2023-04-01',
                                    status: 'Completed',
                                    total: '$120.00',
                                },
                                {
                                    no: 2,
                                    id: '#1002',
                                    customer: 'John Smith',
                                    date: '2023-04-03',
                                    status: 'Pending',
                                    total: '$75.50',
                                },
                                {
                                    no: 3,
                                    id: '#1003',
                                    customer: 'Emily Clark',
                                    date: '2023-04-05',
                                    status: 'Cancelled',
                                    total: '$200.00',
                                },
                                {
                                    no: 4,
                                    id: '#1004',
                                    customer: 'Michael Brown',
                                    date: '2023-04-07',
                                    status: 'Completed',
                                    total: '$150.00',
                                },
                                {
                                    no: 5,
                                    id: '#1005',
                                    customer: 'Linda Johnson',
                                    date: '2023-04-10',
                                    status: 'Pending',
                                    total: '$90.00',
                                }
                            ].map(({ no, id, customer, date, status, total }) => {
                                const statusClass = {
                                    Completed: 'bg-[var(--primary)] text-[var(--background)]',
                                    Pending: 'bg-gray-400 text-[var(--background)]',
                                    Cancelled: 'bg-[var(--alert)] text-[var(--background)]',
                                }[status];

                                return (
                                    <tr key={id} className="border-b border-gray-100 hover:bg-[var(--secondary)]">
                                        <td className="px-4 py-6">{no}</td>
                                        <td className="px-4 py-6">{id}</td>
                                        <td className="px-4 py-6">{customer}</td>
                                        <td className="px-4 py-6">{date}</td>
                                        <td className="px-4 py-6">
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${statusClass}`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-6">{total}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};