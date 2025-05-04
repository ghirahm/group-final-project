"use client";

import React, { useState } from "react";
import Link from "next/link";

const Reviews: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const reviews = [
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
      image:
        "https://storage.googleapis.com/a1aa/image/942202d2-2f3f-405c-0ee7-03650271cdcb.jpg",
      rating: 4,
      comment: "Great product! Really satisfied with the quality and delivery time.",
    },
    {
      name: "John Smith",
      email: "johnsmith@example.com",
      image:
        "https://storage.googleapis.com/a1aa/image/9f6f2e9f-e73c-430d-6c26-4bd47302fc50.jpg",
      rating: 4,
      comment: "Good value for money. Customer service was very helpful.",
    },
    {
      name: "Emily Clark",
      email: "emilyclark@example.com",
      image:
        "https://storage.googleapis.com/a1aa/image/a8f56789-6668-45df-9e2c-8925c6233d77.jpg",
      rating: 3,
      comment: "The product is okay but shipping took longer than expected.",
    },
  ];

  return (
    <div className="bg-[#f5f6f8] min-h-screen flex flex-col" style={{ paddingTop: "150px" }}>
      {/* Mobile header */}
      <header className="bg-[#f5f6f8] border-b border-[#c3c9e8] flex items-center justify-between px-4 py-3 text-[#3a4db7] sm:hidden fixed top-0 left-0 right-0 z-40">
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
          className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#f5f6f8] border-r border-[#c3c9e8] flex flex-col text-[#3a4db7] select-none transform transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:flex-shrink-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#c3c9e8] font-semibold">
            <i className="fas fa-user-circle text-sm" />
            <span>Admin</span>
          </div>
          <nav className="flex flex-col mt-4 space-y-1 text-sm">
            {[
              { icon: "tachometer-alt", label: "Dashboard" },
              { icon: "box-open", label: "Products" },
              { icon: "shopping-cart", label: "Orders" },
              { icon: "users", label: "Customers" },
              { icon: "star", label: "Reviews", active: true },
              { icon: "cog", label: "Settings" },
            ].map(({ icon, label, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center gap-3 px-5 py-3 ${
                  active
                    ? "bg-[#1a2ad8] text-white font-semibold rounded-r-md"
                    : "text-[#3a4db7] hover:bg-[#dbf066]"
                }`}
              >
                <i className={`fas fa-${icon} text-xs`} />
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20 sm:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col pt-10 px-6 overflow-auto max-w-4xl mx-auto w-full">
          <h1 className="text-[#3a4db7] font-semibold text-2xl mb-6">
            Reviews
          </h1>
          <section className="space-y-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

type Review = {
  name: string;
  email: string;
  image: string;
  rating: number;
  comment: string;
};

const ReviewCard: React.FC<Review> = ({ name, email, image, rating, comment }) => (
  <article className="bg-white rounded-md p-3 border border-[#a3b0f7] shadow-sm">
    <div className="flex items-center gap-3 mb-2">
      <img
        alt={`Profile picture of ${name}`}
        src={image}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full border-2 border-[#3a4db7]"
      />
      <div>
        <h2 className="text-[#3a4db7] font-semibold text-xs">{name}</h2>
        <p className="text-[#a3b0f7] text-[10px]">{email}</p>
      </div>
    </div>
    <div className="flex items-center mb-2 space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`star-svg ${i >= rating ? "empty" : ""}`}
          viewBox="0 0 24 24"
          stroke="#2940d5"
          strokeWidth={1.5}
          fill={i < rating ? "#dbf066" : "transparent"}
          width={14}
          height={14}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
      ))}
    </div>
    <p className="text-[#3a4db7] text-[12px] leading-relaxed">{comment}</p>
  </article>
);

export default Reviews;
