"use client";

import SellerHeader from "@/components/ui/SellerHeader";
import { faArrowRight, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

import Chart from "chart.js/auto";

export default function Dashboard() {
    useEffect(() => {
        const ctx = document.getElementById("salesChart") as HTMLCanvasElement;
        if (!ctx) return;
        if (Chart.getChart("salesChart")) {
            Chart.getChart("salesChart")?.destroy();
        }

        new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                datasets: [
                    {
                        label: "Revenue",
                        data: [
                            12000, 15000, 14000, 18000, 20000, 22000,
                            21000, 23000, 25000, 27000, 30000, 32000
                        ],
                        borderColor: "#2940d5",
                        backgroundColor: "rgba(41, 64, 213, 0.2)",
                        fill: true,
                        tension: 0.3,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: "#3a4db7",
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: "#3a4db7",
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: "#e5e7eb"
                        }
                    },
                    y: {
                        ticks: {
                            color: "#3a4db7",
                            font: {
                                size: 12
                            },
                            callback: function (tickValue: string | number) {
                                return "Rp " + Number(tickValue).toLocaleString();
                            }
                        },
                        grid: {
                            color: "#e5e7eb"
                        }
                    }
                }
            }
        });
    }, []);

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <SellerHeader title='Dashboard' icon={faChartBar} />

            <div className="flex flex-col overflow-auto w-full gap-6">
                <div className="grid grid-cols-4 gap-6">
                    {[
                        { title: "Total Orders", value: "1,245" },
                        { title: "Total Customers", value: "532" },
                        { title: "Total Products", value: "128" },
                        { title: "Revenue", value: "$45,230" },
                    ].map((item, index) => (
                        <div className="w-full col-span-1 bg-[var(--secondary)] text-[var(--primary)] p-6 rounded-xl flex flex-col items-start justify-center gap-2" key={index}>
                            <div className="text-md flex flex-row items-center gap-2">{item.title}<FontAwesomeIcon icon={faArrowRight} className="-rotate-45 text-md" /></div>
                            <div className="text-3xl font-bold">{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-[var(--background)] border-2 border-[var(--primary)] rounded-md p-6 text-[var(--foreground)] flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">Sales Analysis</h2>
                    <canvas id="salesChart" aria-label="Sales analysis chart" role="img"></canvas>
                </div>
            </div>
        </section>
    );
};