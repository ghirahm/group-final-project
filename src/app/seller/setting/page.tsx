"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const AdminSettings = () => {
  const [username, setUsername] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [profileImage, setProfileImage] = useState(
    "https://storage.googleapis.com/a1aa/image/12596988-1c8e-46e6-4903-6bd2a9522e2e.jpg"
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.type = input.type === "password" ? "text" : "password";
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (username.length < 3 || username.length > 30) {
      newErrors.username = "Please enter a valid username (3-30 characters).";
    }

    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (currentPassword && !passwordPattern.test(currentPassword)) {
      newErrors.currentPassword =
        "Password must be at least 6 characters, including uppercase, lowercase, number, and symbol.";
    }

    if (newPassword && !passwordPattern.test(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 6 characters, including uppercase, lowercase, number, and symbol.";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      alert("Changes saved successfully!");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex" style={{ paddingTop: "150px" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#f5f6f8] border-r border-[#c3c9e8] flex flex-col text-[#3a4db7] select-none transform transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:flex-shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#c3c9e8] font-semibold text-[#3a4db7]">
          <i className="fas fa-user-circle text-sm"></i>
          <span>Admin</span>
        </div>
        <nav className="flex flex-col mt-4 space-y-1 text-sm">
          {[
            { icon: "tachometer-alt", label: "Dashboard", href: "/dashboard-seller" },
            { icon: "box-open", label: "Products", href: "/dashboard-seller/product" },
            { icon: "shopping-cart", label: "Orders", href: "/dashboard-seller/order" },
            { icon: "users", label: "Customers", href: "/dashboard-seller/customer" },
            { icon: "star", label: "Reviews", href: "/dashboard-seller/review" },
            { icon: "cog", label: "Settings", href: "/dashboard-seller/setting" , active: true},
          ].map(({ icon, label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 ${
                active ? "bg-[#1a2ad8] text-white font-semibold rounded-r-md" : "text-[#3a4db7] hover:bg-[#dbf066]"
              }`}
              onClick={closeSidebar}
            >
              <i className={`fas fa-${icon} text-xs`}></i>
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl w-full bg-white p-6 rounded-md border border-[#2940d5] text-[#3a4db7] text-xs"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16">
              <img
                src={profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-[#3a4db7] object-cover"
              />
              <label
                htmlFor="photo-input"
                className="absolute bottom-[-4px] right-[-4px] w-5 h-5 bg-[#1a2ad8] text-white flex items-center justify-center rounded-full border-2 border-white cursor-pointer"
              >
                <i className="fas fa-camera text-xs"></i>
              </label>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{username}</p>
              <p className="text-xs text-[#a3b0f7]">{email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-semibold mb-2">Account Settings</p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="username" className="font-semibold mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`px-3 py-1 rounded-md border ${
                      errors.username ? "border-red-600" : "border-[#2940d5]"
                    } focus:ring-2 focus:ring-[#2940d5]`}
                  />
                  {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username}</p>}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`px-3 py-1 rounded-md border ${
                      errors.email ? "border-red-600" : "border-[#2940d5]"
                    } focus:ring-2 focus:ring-[#2940d5]`}
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Password</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "currentPassword", label: "Current Password", value: currentPassword, setValue: setCurrentPassword },
                  { id: "newPassword", label: "New Password", value: newPassword, setValue: setNewPassword },
                  { id: "confirmPassword", label: "Confirm Password", value: confirmPassword, setValue: setConfirmPassword },
                ].map(({ id, label, value, setValue }) => (
                  <div key={id} className="flex flex-col relative">
                    <label htmlFor={id} className="font-semibold mb-1">
                      {label}
                    </label>
                    <input
                      id={id}
                      type="password"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={`input-with-icon px-3 py-1 rounded-md border ${
                        errors[id] ? "border-red-600" : "border-[#2940d5]"
                      } focus:ring-2 focus:ring-[#2940d5]`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(id)}
                      className="eye-button absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3a4db7]"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    {errors[id] && <p className="text-red-600 text-xs mt-1">{errors[id]}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Notifications</p>
              <div className="flex flex-col space-y-2">
                {[
                  "Email me when new orders are placed",
                  "Email me when a product is out of stock",
                  "Send me promotional offers",
                ].map((text, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input type="checkbox" className="border-2 border-[#2940d5] rounded-md w-4 h-4" defaultChecked={index === 0} />
                    <span>{text}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#d6e94f] text-[#3a4db7] font-semibold px-4 py-1 rounded-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminSettings;
