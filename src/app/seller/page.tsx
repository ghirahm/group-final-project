"use client";

import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

const Dashboard: React.FC = () => {
  useEffect(() => {
    const ctx = document.getElementById("salesChart") as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
          ],
          datasets: [
            {
              label: "Revenue",
              data: [
                12000, 15000, 14000, 18000, 20000, 22000,
                21000, 23000, 25000, 27000, 30000, 32000,
              ],
              borderColor: "#2940d5",
              backgroundColor: "rgba(41, 64, 213, 0.2)",
              fill: true,
              tension: 0.3,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#3a4db7",
                font: {
                  size: 14,
                  weight: 600,
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#3a4db7",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#e5e7eb",
              },
            },
            y: {
              ticks: {
                color: "#3a4db7",
                font: {
                  size: 12,
                },
                callback: function (value: any) {
                  return "$" + value.toLocaleString();
                },
              },
              grid: {
                color: "#e5e7eb",
              },
            },
          },
        },
      });
    }
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar?.classList.toggle("-translate-x-full");
    overlay?.classList.toggle("hidden");
  };

  const closeSidebar = () => {
    document.getElementById("sidebar")?.classList.add("-translate-x-full");
    document.getElementById("overlay")?.classList.add("hidden");
  };

  return (
    <div className="bg-[#f5f6f8] min-h-screen flex flex-col font-[Inter,sans-serif]" style={{ paddingTop: "150px" }}>
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
        <aside
          id="sidebar"
          className="fixed inset-y-0 left-0 z-30 w-56 bg-[#f5f6f8] border-r border-[#c3c9e8] flex flex-col text-[#3a4db7] select-none transform -translate-x-full transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:flex-shrink-0"
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#c3c9e8] font-semibold text-[#3a4db7]">
            <i className="fas fa-user-circle text-sm"></i>
            <span>Admin</span>
          </div>
          <nav className="flex flex-col mt-4 space-y-1 text-sm">
            <Link href="/dashboard-seller" className="flex items-center gap-3 px-5 py-3 bg-[#1a2ad8] text-white font-semibold rounded-r-md">
              <i className="fas fa-tachometer-alt text-xs"></i>Dashboard
            </Link>
            <Link href="/dashboard-seller/product" className="flex items-center gap-3 px-5 py-3 text-[#3a4db7] hover:bg-[#dbf066]">
              <i className="fas fa-box-open text-xs"></i>Products
            </Link>
            <Link href="/dashboard-seller/order" className="flex items-center gap-3 px-5 py-3 text-[#3a4db7] hover:bg-[#dbf066]">
              <i className="fas fa-shopping-cart text-xs"></i>Orders
            </Link>
            <Link href="/dashboard-seller/customer" className="flex items-center gap-3 px-5 py-3 text-[#3a4db7] hover:bg-[#dbf066]">
              <i className="fas fa-users text-xs"></i>Customers
            </Link>
            <Link href="/dashboard-seller/review" className="flex items-center gap-3 px-5 py-3 text-[#3a4db7] hover:bg-[#dbf066]">
              <i className="fas fa-star text-xs"></i>Reviews
            </Link>
            <Link href="/dashboard-seller/setting" className="flex items-center gap-3 px-5 py-3 text-[#3a4db7] hover:bg-[#dbf066]">
              <i className="fas fa-cog text-xs"></i>Settings
            </Link>
          </nav>
        </aside>

        <div id="overlay" className="fixed inset-0 bg-black bg-opacity-30 z-20 hidden" onClick={closeSidebar}></div>

        <main className="flex-1 flex flex-col pt-10 px-6 overflow-auto max-w-5xl mx-auto w-full">
          <h1 className="text-[#3a4db7] font-semibold text-2xl mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Orders", value: "1,245" },
              { title: "Total Customers", value: "532" },
              { title: "Total Products", value: "128" },
              { title: "Revenue", value: "$45,230" },
            ].map((item, index) => (
              <div className="card" key={index}>
                <div className="card-title font-semibold text-lg mb-2">{item.title}</div>
                <div className="card-value text-3xl font-bold">{item.value}</div>
              </div>
            ))}
          </div>

          <section className="analysis-section bg-white border border-[#a3b0f7] rounded-md p-6 text-[#3a4db7] mt-8">
            <h2 className="analysis-title font-semibold text-xl mb-4">Sales Analysis</h2>
            <canvas id="salesChart" aria-label="Sales analysis chart" role="img"></canvas>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
