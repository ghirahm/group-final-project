"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Products: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const products = [
    {
      id: 1,
      image: '',
      name: 'Book',
      category: 'Book',
      price: '$25.00',
      stock: 120,
    },
    {
      id: 2,
      image: '',
      name: 'Book',
      category: 'Books',
      price: '$150.00',
      stock: 45,
    },
    {
      id: 3,
      image: '',
      name: 'book',
      category: 'Books',
      price: '$12.50',
      stock: 200,
    },
    {
      id: 4,
      image: '',
      name: 'book',
      category: 'Books',
      price: '$85.00',
      stock: 60,
    },
    {
      id: 5,
      image: '',
      name: 'book',
      category: 'books',
      price: '$220.00',
      stock: 30,
    },
    {
      id: 6,
      image: '',
      name: 'book',
      category: 'books',
      price: '$45.00',
      stock: 80,
    },
    {
      id: 7,
      image: '',
      name: 'book',
      category: 'books',
      price: '$60.00',
      stock: 100,
    },
    {
      id: 8,
      image: '',
      name: 'book',
      category: 'books',
      price: '$1200.00',
      stock: 15,
    },
    {
      id: 9,
      image: '',
      name: 'Book',
      category: 'Books',
      price: '$18.00',
      stock: 150,
    },
    {
      id: 10,
      image: '',
      name: 'book',
      category: 'books',
      price: '$35.00',
      stock: 40,
    },
  ];

  return (
    <div className="bg-[#f5f6f8] min-h-screen flex flex-col font-[Inter,sans-serif]" style={{ paddingTop: "150px" }}>
      {/* Mobile Header */}
      <header className="bg-[#f5f6f8] border-b border-[#c3c9e8] flex items-center justify-between px-4 py-3 text-[#3a4db7] sm:hidden">
        <div className="flex items-center gap-2 font-semibold">
          <i className="fas fa-user-circle text-sm" />
          <span>Admin</span>
        </div>
        <button
          aria-label="Toggle menu"
          className="text-[#3a4db7] focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-xl" />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#f5f6f8] border-r border-[#c3c9e8] flex flex-col text-[#3a4db7] transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 sm:static sm:flex-shrink-0`}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#c3c9e8] font-semibold text-[#3a4db7]">
            <i className="fas fa-user-circle text-sm" />
            <span>Admin</span>
          </div>
          <nav className="flex flex-col mt-4 space-y-1 text-sm">
            <Link href="/dashboard-seller" className={`flex items-center gap-3 px-5 py-3 hover:bg-[#dbf066] ${false ? 'bg-[#1a2ad8] text-white font-semibold rounded-r-md' : 'text-[#3a4db7]'}`}>
              <i className="fas fa-tachometer-alt text-xs" />
              Dashboard
            </Link>
            <Link href="/dashboard-seller/product" className={`flex items-center gap-3 px-5 py-3 hover:bg-[#dbf066] ${true ? 'bg-[#1a2ad8] text-white font-semibold rounded-r-md' : 'text-[#3a4db7]'}`}>
              <i className="fas fa-box-open text-xs" />
              Products
            </Link>
            <Link href="/dashboard-seller/order" className={`flex items-center gap-3 px-5 py-3 hover:bg-[#dbf066] text-[#3a4db7]`}>
              <i className="fas fa-shopping-cart text-xs" />
              Orders
            </Link>
            <Link href="/dashboard-seller/customer" className={`flex items-center gap-3 px-5 py-3 hover:bg-[#dbf066] text-[#3a4db7]`}>
              <i className="fas fa-users text-xs" />
              Customers
            </Link>
            <Link href="/dashboard-seller/review" className={`flex items-center gap-3 px-5 py-3 hover:bg-[#dbf066] text-[#3a4db7]`}>
              <i className="fas fa-star text-xs" />
              Reviews
            </Link>
            <Link href="/dashboard-seller/setting" className={`flex items-center gap-3 px-5 py-3 hover:bg-[#dbf066] text-[#3a4db7]`}>
              <i className="fas fa-cog text-xs" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-20" onClick={closeSidebar}></div>}

        {/* Main Content */}
        <main className="flex-1 flex flex-col pt-10 px-6 overflow-auto max-w-5xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[#3a4db7] font-semibold text-2xl">Products</h1>
            <button className="bg-[#dbf066] text-[#2940d5] font-semibold text-xs px-4 py-2 rounded hover:bg-[#c4db4f] transition">
              <i className="fas fa-plus mr-2" />
              Add Product
            </button>
          </div>

          <div className="table-container bg-white rounded-md border border-[#a3b0f7] shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2940d5]">
                  <th className="text-[#dbf066] px-4 py-3 text-left text-sm">No</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left text-sm">Image</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left text-sm">Product Name</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left text-sm">Category</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left text-sm">Price</th>
                  <th className="text-[#dbf066] px-4 py-3 text-left text-sm">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#dbf066]">
                    <td className="px-4 py-3 text-sm text-[#3a4db7]">{product.id}</td>
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={`Product ${product.id} image`}
                        className="w-12 h-12 object-cover rounded-md border border-[#c3c9e8]"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#3a4db7]">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-[#3a4db7]">{product.category}</td>
                    <td className="px-4 py-3 text-sm text-[#3a4db7]">{product.price}</td>
                    <td className="px-4 py-3 text-sm text-[#3a4db7]">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
