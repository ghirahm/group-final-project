"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Orders: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="bg-[#f5f6f8] min-h-screen flex flex-col" style={{ paddingTop: "150px" }}>
      {/* Mobile Header */}
      <header className="bg-[#f5f6f8] border-b border-[#c3c9e8] flex items-center justify-between px-4 py-3 text-[#3a4db7] sm:hidden">
        <div className="flex items-center gap-2 font-semibold">
          <i className="fas fa-user-circle text-sm"></i>
          <span>Admin</span>
        </div>
        <button
          aria-label="Toggle menu"
          className="text-[#3a4db7] focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#f5f6f8] border-r border-[#c3c9e8] flex flex-col text-[#3a4db7] select-none transform transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:flex-shrink-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#c3c9e8] font-semibold text-[#3a4db7]">
            <i className="fas fa-user-circle text-sm"></i>
            <span>Admin</span>
          </div>
          <nav className="flex flex-col mt-4 space-y-1 text-sm">
            {[
              { icon: 'tachometer-alt', label: 'Dashboard', href: '/dashboard-seller' },
              { icon: 'box-open', label: 'Products', href: '/dashboard-seller/product' },
              { icon: 'shopping-cart', label: 'Orders', href: '/dashboard-seller/order', active: true },
              { icon: 'users', label: 'Customers', href: '/dashboard-seller/customer' },
              { icon: 'star', label: 'Reviews', href: '/dashboard-seller/review' },
              { icon: 'cog', label: 'Settings', href: '/dashboard-seller/setting' },
            ].map(({ icon, label, href, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-5 py-3 ${
                  active
                    ? 'bg-[#1a2ad8] text-white font-semibold rounded-r-md'
                    : 'text-[#3a4db7] hover:bg-[#dbf066]'
                }`}
                onClick={closeSidebar}
              >
                <i className={`fas fa-${icon} text-xs`}></i>
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20 sm:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col pt-10 px-6 overflow-auto max-w-5xl mx-auto w-full">
          <h1 className="text-[#3a4db7] font-semibold text-2xl mb-6">Orders</h1>

          <div className="table-container bg-white rounded-md border border-[#a3b0f7] shadow-sm overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#2940d5]">
                <tr>
                  <th className="text-[#dbf066] px-4 py-3 text-left border-b text-sm">No</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left border-b text-sm">Order ID</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left border-b text-sm">Customer</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left border-b text-sm">Date</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left border-b text-sm">Status</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left border-b text-sm">Total</th>
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
                  },
                  {
                    no: 6,
                    id: '#1006',
                    customer: 'David Wilson',
                    date: '2023-04-12',
                    status: 'Completed',
                    total: '$110.00',
                  },
                  {
                    no: 7,
                    id: '#1007',
                    customer: 'Sarah Lee',
                    date: '2023-04-15',
                    status: 'Pending',
                    total: '$130.00',
                  },
                  {
                    no: 8,
                    id: '#1008',
                    customer: 'James Taylor',
                    date: '2023-04-18',
                    status: 'Completed',
                    total: '$85.00',
                  },
                  {
                    no: 9,
                    id: '#1009',
                    customer: 'Patricia Martinez',
                    date: '2023-04-20',
                    status: 'Cancelled',
                    total: '$95.00',
                  },
                  {
                    no: 10,
                    id: '#1010',
                    customer: 'Robert Anderson',
                    date: '2023-04-22',
                    status: 'Completed',
                    total: '$140.00',
                  },
                ].map(({ no, id, customer, date, status, total }) => {
                  const statusClass = {
                    Completed: 'bg-green-100 text-green-800',
                    Pending: 'bg-yellow-100 text-yellow-800',
                    Cancelled: 'bg-red-100 text-red-800',
                  }[status];

                  return (
                    <tr key={id} className="hover:bg-[#dbf066]">
                      <td className="px-4 py-3 text-sm border-b text-[#3a4db7]">{no}</td>
                      <td className="px-4 py-3 text-sm border-b text-[#3a4db7]">{id}</td>
                      <td className="px-4 py-3 text-sm border-b text-[#3a4db7]">{customer}</td>
                      <td className="px-4 py-3 text-sm border-b text-[#3a4db7]">{date}</td>
                      <td className="px-4 py-3 text-sm border-b">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${statusClass}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm border-b text-[#3a4db7]">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
