"use client";

import { useState } from "react";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        quantity: 0,
        price: 0,
        description: "",
        discount_percent: 0,
        image_url_1: "",
        image_url_2: "",
        image_url_3: "",
        author_id: 0,
        publisher_id: 0,
        category_ids: [] as number[],
    });

    const handleChange = (field: string, value: string | number | number[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const res = await fetch("https://finalprojectbackend-production-9a18.up.railway.app/api/v1/books/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Book added!");
                onClose();
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add product.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className=" lex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full overflow-y-auto space-y-6">
                <h2 className="text-xl font-bold">Add New Product</h2>

                {[
                    { label: "Title", field: "title", type: "text" },
                    { label: "Quantity", field: "quantity", type: "number" },
                    { label: "Price", field: "price", type: "number" },
                    { label: "Description", field: "description", type: "textarea" },
                    { label: "Discount Percent", field: "discount_percent", type: "number" },
                    { label: "Image URL 1", field: "image_url_1", type: "text" },
                    { label: "Image URL 2", field: "image_url_2", type: "text" },
                    { label: "Image URL 3", field: "image_url_3", type: "text" },
                    { label: "Author ID", field: "author_id", type: "number" },
                    { label: "Publisher ID", field: "publisher_id", type: "number" },
                ].map(({ label, field, type }) => (
                    <div key={field}>
                        <p className="text-sm font-semibold text-[var(--primary)]">{label}</p>
                        {type === "textarea" ? (
                            <textarea
                                value={formData[field as keyof typeof formData] as string}
                                onChange={(e) => handleChange(field, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        ) : (
                            <input
                                type={type}
                                value={formData[field as keyof typeof formData] as string | number}
                                onChange={(e) =>
                                    handleChange(field, type === "number" ? Number(e.target.value) : e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        )}
                    </div>
                ))}

                <div>
                    <p className="text-sm font-semibold text-[var(--primary)]">Category IDs (comma separated)</p>
                    <input
                        type="text"
                        placeholder="e.g. 1, 2, 3"
                        onChange={(e) =>
                            handleChange(
                                "category_ids",
                                e.target.value
                                    .split(",")
                                    .map((id) => parseInt(id.trim()))
                                    .filter((id) => !isNaN(id))
                            )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        onClick={onClose}
                        className="w-fit bg-white border-2 border-[var(--primary)] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-lg text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-fit bg-[var(--primary)] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-lg text-white hover:opacity-80"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
