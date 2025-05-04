import React, { useState } from 'react';

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    stock: '',
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    productName: false,
    category: false,
    price: false,
    stock: false,
    image: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      productName:
        formData.productName.trim().length < 2 ||
        formData.productName.trim().length > 100,
      category: formData.category === '',
      price: parseFloat(formData.price) <= 0 || isNaN(parseFloat(formData.price)),
      stock:
        parseInt(formData.stock) < 0 ||
        !Number.isInteger(Number(formData.stock)),
      image: formData.image === null,
    };

    setErrors(newErrors);

    const formIsValid = Object.values(newErrors).every((err) => !err);

    if (formIsValid) {
      alert('Product added successfully!');
      setFormData({
        productName: '',
        category: '',
        price: '',
        stock: '',
        image: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col">
      <header className="bg-[#f5f6f8] border-b border-[#c3c9e8] flex items-center justify-between px-4 py-3 text-[#3a4db7]">
        <h1 className="text-lg font-semibold">Add Product</h1>
      </header>
      <main className="flex-1 p-6">
        <form
          onSubmit={handleSubmit}
          className="form-container max-w-xl mx-auto bg-white border border-[#a3b0f7] rounded-md p-8 text-[#3a4db7]"
          noValidate
        >
          <div className="mb-4">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              minLength={2}
              maxLength={100}
              className="w-full px-3 py-2 border border-[#2940d5] rounded-md text-sm"
            />
            {errors.productName && (
              <p className="text-red-600 text-xs mt-1">
                Please enter a valid product name (2-100 characters).
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#2940d5] rounded-md text-sm"
            >
              <option value="" disabled>
                Select category
              </option>
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Kitchen</option>
              <option>Footwear</option>
              <option>Accessories</option>
              <option>Sports</option>
              <option>Home</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-xs mt-1">
                Please select a category.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="price">Price (Rp)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0.01"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-[#2940d5] rounded-md text-sm"
            />
            {errors.price && (
              <p className="text-red-600 text-xs mt-1">
                Please enter a valid price greater than 0.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              step="1"
              required
              className="w-full px-3 py-2 border border-[#2940d5] rounded-md text-sm"
            />
            {errors.stock && (
              <p className="text-red-600 text-xs mt-1">
                Please enter a valid stock quantity (0 or more).
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-3 py-2 border border-[#2940d5] rounded-md text-sm"
            />
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please upload a product image.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#dbf066] text-[#2940d5] font-semibold text-sm px-4 py-2 rounded border-2 border-[#2940d5] hover:bg-[#c4db4f] hover:border-[#1f2e8a] transition"
          >
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProductForm;
