"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircleCheck, faCircleXmark, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        fullname: "",
        role: "",
        referral: "",
        password: "",
        confirmPassword: ""
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
                confirmPassword: ""
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
        <section className="relative bg-[var(--primary)] min-h-screen flex items-center justify-center mt-24 py-12 px-12 overflow-hidden">
            <Image
                src="/wallpaper.jpg"
                alt="Illustration"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute inset-0 z-0"
            />
            <div className="absolute top-[40%] right-12 transform -translate-y-1/2 bg-[var(--background)] shadow-xl rounded-3xl w-full max-w-2xl p-12 z-10 flex flex-col gap-2">
                <p className="max-w-xl text-[var(--foreground)] text-sm flex flex-row items-center gap-2"><FontAwesomeIcon icon={faBook} className='text-[var(--foreground)] size-4' />Please, Fill This Form</p>
                <h1 className="text-6xl font-bold mb-6 text-[var(--foreground)]">Create New Account Here!</h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                    <input
                        type="email"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-describedby="emailError"
                    />
                    {errors.email && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{errors.email}</p>
                    )}
                    <input
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        placeholder="Full Name"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    {errors.fullname && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{errors.fullname}</p>
                    )}
                    <label className="text-[var(--primary)] font-semibold text-xs">Select Role</label>
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}>
                        <option value="seller">Seller</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{errors.role}</p>
                    )}
                    <input
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        name="referral"
                        value={formData.referral}
                        placeholder="Kode Referal (Optional)"
                        onChange={handleChange}
                    />
                    {errors.referal && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{errors.referral}</p>
                    )}
                    <div className="relative w-full">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Kata Sandi"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-12"
                            aria-describedby="passwordError"
                            id="password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            tabIndex={-1}
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{errors.password}</p>
                    )}
                    <div className="relative w-full">
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Konfirmasi Kata Sandi"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-12"
                            aria-describedby="passwordError"
                            id="password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            tabIndex={-1}
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{errors.confirmPassword}</p>
                    )}
                    <ul className="text-xs text-[var(--foreground)] flex flex-col gap-2">
                        <li className="flex flex-row items-center gap-2">
                            {checkPasswordCriteria("length") ? (
                                <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--primary)]" />
                            ) : (
                                <FontAwesomeIcon icon={faCircleXmark} className="text-[var(--alert)]" />
                            )}
                            Minimum 8 characters.
                        </li>
                        <li className="flex flex-row items-center gap-2">
                            {checkPasswordCriteria("capital") ? (
                                <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--primary)]" />
                            ) : (
                                <FontAwesomeIcon icon={faCircleXmark} className="text-[var(--alert)]" />
                            )}
                            Include uppercase & lowercase letters.
                        </li>
                        <li className="flex flex-row items-center gap-2">
                            {checkPasswordCriteria("number") ? (
                                <FontAwesomeIcon icon={faCircleCheck} className="text-[var(--primary)]" />
                            ) : (
                                <FontAwesomeIcon icon={faCircleXmark} className="text-[var(--alert)]" />
                            )}
                            Include numbers & symbols.
                        </li>
                    </ul>

                    <button type="submit" className="text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]">
                        Sign Up
                    </button>

                    <p className="text-sm text-[var(--foreground)] mt-4 text-center">
                        Have an account? <a href="#" className="text-[var(--primary)] font-semibold">Sign In</a>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default RegistrationForm;
