"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    role: "",
    referral: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const referralPattern = /^[a-zA-Z0-9]*$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailPattern.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required.";
    } else if (formData.fullname.length < 3 || formData.fullname.length > 15) {
      newErrors.fullname = "Full name must be between 3 and 15 characters.";
    }
    if (!formData.role) newErrors.role = "Please select a role.";
    if (formData.referral && !referralPattern.test(formData.referral))
      newErrors.referral = "Invalid referral code.";
    if (!passwordPattern.test(formData.password))
      newErrors.password = "Password must meet the criteria.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.agreed) newErrors.agreed = "You must agree to the Privacy Policy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({
        email: "",
        fullname: "",
        role: "",
        referral: "",
        password: "",
        confirmPassword: "",
        agreed: false,
      });
    }
  };

  const checkPasswordCriteria = (criteria: string) => {
    switch (criteria) {
      case "length":
        return formData.password.length >= 8;
      case "capital":
        return /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
      case "number":
        return /(?=.*\d)(?=.*[\W_])/.test(formData.password);
      default:
        return false;
    }
  };

  return (
    <div style={{ paddingTop: "150px" }}>
      <main
        className="w-full max-w-6xl mx-auto rounded-xl shadow-md flex flex-col md:flex-row gap-6 p-4 md:p-6 border-8"
        style={{ borderColor: "var(--secondary)", backgroundColor: "var(--tertiary)" }}
      >
        {/* Left side */}
        <section
          className="left-side flex flex-col items-center px-10 py-25 md:w-1/2"
          style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
        >
          <Image
            alt="logo"
            src="/login.png"
            width={500}
            height={500}
            className="mb-10 w-full max-w-[400px] object-contain rounded-md"
            style={{ border: "4px solid var(--primary)" }}
          />
          <div className="w-full max-w-[400px] hidden md:block">
            <div className="flex space-x-6 mb-2 text-lg">
              {[FaFacebookF, FaInstagram, FaTiktok].map((Icon, i) => (
                <Icon key={i} className="hover:text-tertiary cursor-pointer" style={{ color: "var(--tertiary)" }} />
              ))}
            </div>
            <p className="text-xs mb-6" style={{ color: "var(--tertiary)" }}>customercare@semestakata.com</p>
          </div>
        </section>

        {/* Right side */}
        <section className="px-10 py-12 md:w-1/2 flex flex-col justify-between text-sm" style={{ color: "var(--secondary)" }}>
          <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <h1 className="font-semibold mb-6 text-base" style={{ color: "var(--secondary)" }}>Create Account</h1>
            <div className="mb-3">
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-3">
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                placeholder="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              />
              {errors.fullname && <p className="text-red-600 text-xs mt-1">{errors.fullname}</p>}
            </div>

            <label className="font-semibold text-xs mb-1 block" style={{ color: "var(--secondary)" }}>Select role</label>
            <div className="mb-3">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              >
                <option value="">Choose a role</option>
                <option value="seller">Seller</option>
                <option value="customer">Customer</option>
              </select>
              {errors.role && <p className="text-red-600 text-xs mt-1">{errors.role}</p>}
            </div>

            <div className="mb-3">
              <input
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                placeholder="Kode Referal (optional)"
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              />
              {errors.referral && <p className="text-red-600 text-xs mt-1">{errors.referral}</p>}
            </div>

            {/* Password input */}
            <div className="relative mb-3">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Kata Sandi"
                className="w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ color: "var(--secondary)" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="relative mb-3">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi Kata Sandi"
                className="w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                style={{ color: "var(--secondary)" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <ul className="text-xs mb-3 space-y-1" style={{ color: "var(--secondary)" }}>
              <li className="flex items-center">
                {checkPasswordCriteria("length") ? (
                  <FaCheck className="mr-1" style={{ color: "var(--secondary)" }} />
                ) : (
                  <FaTimes className="mr-1" style={{ color: "var(--secondary)" }} />
                )}
                Minimum 8 characters.
              </li>
              <li className="flex items-center">
                {checkPasswordCriteria("capital") ? (
                  <FaCheck className="mr-1" style={{ color: "var(--secondary)" }} />
                ) : (
                  <FaTimes className="mr-1" style={{ color: "var(--secondary)" }} />
                )}
                Include uppercase & lowercase letters.
              </li>
              <li className="flex items-center">
                {checkPasswordCriteria("number") ? (
                  <FaCheck className="mr-1" style={{ color: "var(--secondary)" }} />
                ) : (
                  <FaTimes className="mr-1" style={{ color: "var(--secondary)" }} />
                )}
                Include numbers & symbols.
              </li>
            </ul>

            <label className="flex items-start text-xs mb-6" style={{ color: "var(--secondary)" }}>
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="mt-1 mr-2 w-3 h-3"
              />
              <span>
                By registering, you agree to
                <a href="#" className="underline ml-1" style={{ color: "var(--foreground)" }}>Privacy Policy</a> SemestaKata
              </span>
            </label>
            {errors.agreed && <p className="text-red-600 text-xs mb-4">{errors.agreed}</p>}

            <button
              type="submit"
              className="btn-create font-semibold text-sm py-2 rounded-md w-full border border-blue-500 hover:bg-[#c0d63f] hover:text-[#1f2e9a] mb-6"
              style={{ backgroundColor: "var(--secondary)", color: "var(--tertiary)" }}
              >
              Create account
            </button>

            <p className="text-center text-xs" style={{ color: "var(--secondary)" }}>
              Already have an account?
              <a className="underline ml-1" href="#" style={{ color: "var(--secondary)" }}>
                Login
              </a>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default RegistrationForm;
