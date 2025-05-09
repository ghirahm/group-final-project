"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* Font Libraries */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faCircleCheck,
    faCircleXmark,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

/* Components */
import Alert from "@/components/ui/Alert";
import ErrorText from "@/components/ui/ErrorText.tsx";

/* Utils */
import {
    emailPattern,
    referralPattern,
    passwordPattern,
} from "@/app/utils/validation";

export default function RegistrationForm() {
    /* Form Data */
    const [formData, setFormData] = useState({
        email: "",
        fullname: "",
        role: "",
        referral: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        /* Checkbox Handler */
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!emailPattern.test(formData.email))
            newErrors.email = "Please enter a valid email address.";
        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full name is required.";
        } else if (
            formData.fullname.length < 3 ||
            formData.fullname.length > 24
        ) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        try {
            const res = await fetch(`https://finalprojectbackend-production-9a18.up.railway.app/api/v1/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    full_name: formData.fullname,
                    password: formData.password,
                    role: formData.role,
                    referred_by: formData.referral,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setAlertMessage("Registration Successful!");
                setFormData({
                    email: "",
                    fullname: "",
                    role: "",
                    referral: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    router.push('/auth/signin');
                }, 1000);
            } else {
                setStatus("error");
                setAlertMessage(data.message || "Registration Failed");
            }
        } catch (error: any) {
            setStatus("error");
            setAlertMessage(error.message || "Server Error");
        } finally {
            setIsLoading(false);
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
        <section className="relative bg-[var(--primary)] min-h-screen grid grid-cols-2 mt-24 py-12 px-12 overflow-hidden">
            {status && alertMessage && (
                <Alert
                    type={status}
                    message={alertMessage}
                    onClose={() => {
                        setStatus(null);
                        setAlertMessage(null);
                    }}
                />
            )}

            {/* LEFT SIDE TEXT + IMAGE */}
            <div className="relative w-full min-h-screen overflow-hidden px-12 py-24 flex items-start justify-start">
                <div className="text-left">
                    <h1 className="font-black text-[var(--background)] text-8xl">
                        FIND
                        <br />
                        A BOOK
                        <br />
                        <span className="text-[var(--secondary)]">UNLOCK</span>
                        <br />
                        A NEW
                        <br />
                        WORLD
                    </h1>
                </div>
                <div className="absolute bottom-20 left-48 w-64 z-10 md:w-80">
                    <Image
                        src="/wallpaper.png"
                        alt="Hero"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>

            {/* FORM SECTION */}
            <div className="col-span-1 bg-[var(--background)] shadow-xl rounded-3xl w-full max-w-2xl h-fit p-12 z-10 flex flex-col gap-2">
                <p className="max-w-xl text-[var(--foreground)] text-sm flex items-center gap-2">
                    <FontAwesomeIcon
                        icon={faBook}
                        className="text-[var(--foreground)] size-4"
                    />
                    Please, Fill This Form
                </p>
                <h1 className="text-6xl font-bold mb-6 text-[var(--foreground)]">
                    Create New Account Here!
                </h1>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.email && <ErrorText message={errors.email} />}

                    {/* Full Name */}
                    <input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.fullname && <ErrorText message={errors.fullname} />}

                    {/* Role */}
                    <label className="text-[var(--primary)] font-semibold text-xs">
                        Select Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                        <option value=""></option>
                        <option value="seller">Seller</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && <ErrorText message={errors.role} />}

                    {/* Referral */}
                    <input
                        name="referral"
                        value={formData.referral}
                        placeholder="Kode Referal (Optional)"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.referral && <ErrorText message={errors.referral} />}

                    {/* Password */}
                    <div className="relative w-full">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Kata Sandi"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.password && <ErrorText message={errors.password} />}

                    {/* Confirm Password */}
                    <div className="relative w-full">
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Konfirmasi Kata Sandi"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <ErrorText message={errors.confirmPassword} />
                    )}

                    {/* Password Checklist */}
                    <ul className="text-xs text-[var(--foreground)] flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={
                                    checkPasswordCriteria("length")
                                        ? faCircleCheck
                                        : faCircleXmark
                                }
                                className={
                                    checkPasswordCriteria("length")
                                        ? "text-[var(--primary)]"
                                        : "text-[var(--alert)]"
                                }
                            />
                            Minimum 8 characters.
                        </li>
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={
                                    checkPasswordCriteria("capital")
                                        ? faCircleCheck
                                        : faCircleXmark
                                }
                                className={
                                    checkPasswordCriteria("capital")
                                        ? "text-[var(--primary)]"
                                        : "text-[var(--alert)]"
                                }
                            />
                            Include uppercase & lowercase letters.
                        </li>
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon
                                icon={
                                    checkPasswordCriteria("number")
                                        ? faCircleCheck
                                        : faCircleXmark
                                }
                                className={
                                    checkPasswordCriteria("number")
                                        ? "text-[var(--primary)]"
                                        : "text-[var(--alert)]"
                                }
                            />
                            Include numbers & symbols.
                        </li>
                    </ul>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? "Processing..." : "Sign Up"}
                    </button>

                    <p className="text-sm text-[var(--foreground)] mt-4 text-center">
                        Have an account?{" "}
                        <a href="#" className="text-[var(--primary)] font-semibold cursor-pointer">
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </section>
    );
};