"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const CustomersPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const customers = [
    { name: "Jane Doe", email: "janedoe@example.com", phone: "+1 555-1234", location: "New York, USA", date: "2022-01-15" },
    { name: "John Smith", email: "johnsmith@example.com", phone: "+1 555-5678", location: "Los Angeles, USA", date: "2021-11-30" },
    { name: "Emily Clark", email: "emilyclark@example.com", phone: "+1 555-8765", location: "Chicago, USA", date: "2023-03-10" },
    { name: "Michael Brown", email: "michaelbrown@example.com", phone: "+1 555-4321", location: "Houston, USA", date: "2022-07-22" },
    { name: "Linda Johnson", email: "lindajohnson@example.com", phone: "+1 555-9876", location: "Phoenix, USA", date: "2021-09-05" },
    { name: "David Wilson", email: "davidwilson@example.com", phone: "+1 555-6543", location: "Philadelphia, USA", date: "2023-01-18" },
    { name: "Sarah Lee", email: "sarahlee@example.com", phone: "+1 555-3210", location: "San Antonio, USA", date: "2022-05-12" },
    { name: "James Taylor", email: "jamestaylor@example.com", phone: "+1 555-7890", location: "San Diego, USA", date: "2021-12-01" },
    { name: "Patricia Martinez", email: "patriciamartinez@example.com", phone: "+1 555-2468", location: "Dallas, USA", date: "2023-04-05" },
    { name: "Robert Anderson", email: "robertanderson@example.com", phone: "+1 555-1357", location: "San Jose, USA", date: "2022-08-19" },
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
          className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#f5f6f8] border-r border-[#c3c9e8] flex flex-col text-[#3a4db7] select-none transform transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:flex-shrink-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#c3c9e8] font-semibold text-[#3a4db7]">
            <i className="fas fa-user-circle text-sm" />
            <span>Admin</span>
          </div>
          <nav className="flex flex-col mt-4 space-y-1 text-sm">
            {[
              { label: "Dashboard", icon: "tachometer-alt", href: "/seller" },
              { label: "Products", icon: "box-open", href: "/seller/product" },
              { label: "Orders", icon: "shopping-cart", href: "/seller/order" },
              { label: "Customers", icon: "users", href: "/seller/customer", active: true },
              { label: "Reviews", icon: "star", href: "/seller/review" },
              { label: "Settings", icon: "cog", href: "/seller/setting" },
            ].map(({ label, icon, href, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-5 py-3 ${
                  active
                    ? "bg-[#1a2ad8] text-white font-semibold rounded-r-md"
                    : "text-[#3a4db7] hover:bg-[#dbf066]"
                }`}
                onClick={closeSidebar}
              >
                <i className={`fas fa-${icon} text-xs`} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20"
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col pt-10 px-6 overflow-auto max-w-5xl mx-auto w-full">
          <h1 className="text-[#3a4db7] font-semibold text-2xl mb-6">Customers</h1>
          <div className="table-container bg-white rounded-md border border-[#a3b0f7] shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#2940d5]">
                <tr>
                  {["No", "Name", "Email", "Phone", "Location", "Joined Date"].map((header, i) => (
                    <th
                      key={i}
                      className="text-[#dbf066] py-3 px-4 text-left text-sm border-b border-[#c3c9e8]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map(({ name, email, phone, location, date }, index) => (
                  <tr key={index} className="hover:bg-[#dbf066]">
                    <td className="py-3 px-4 text-sm text-[#3a4db7] border-b border-[#c3c9e8]">{index + 1}</td>
                    <td className="py-3 px-4 text-sm text-[#3a4db7] border-b border-[#c3c9e8]">{name}</td>
                    <td className="py-3 px-4 text-sm text-[#3a4db7] border-b border-[#c3c9e8]">{email}</td>
                    <td className="py-3 px-4 text-sm text-[#3a4db7] border-b border-[#c3c9e8]">{phone}</td>
                    <td className="py-3 px-4 text-sm text-[#3a4db7] border-b border-[#c3c9e8]">{location}</td>
                    <td className="py-3 px-4 text-sm text-[#3a4db7] border-b border-[#c3c9e8]">{date}</td>
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

export default CustomersPage;
