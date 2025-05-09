"use client";

import { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Alert from "@/components/ui/Alert";
import ErrorText from "@/components/ui/ErrorText.tsx";

import { emailPattern } from "@/app/utils/validation";

import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const { login, status, alertMessage, setStatus, setAlertMessage } = useAuth();

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!emailPattern.test(email.trim())) newErrors.email = "Please enter a valid email address.";
        if (password.trim().length < 6) newErrors.password = "Password must be at least 6 characters.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);

        try {
            await login(email, password);
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Login failed", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-[var(--primary)] min-h-screen grid grid-cols-2 mt-24 py-12 px-12 overflow-hidden">
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

            {/* LEFT SIDE */}
            <div className="relative w-full min-h-screen overflow-hidden flex px-12 items-start justify-start">
                <div className="text-left">
                    <h1 className="font-black text-[var(--background)] text-7xl">
                        FIND<br />
                        A BOOK<br />
                        <span className="text-[var(--secondary)]">UNLOCK</span><br />
                        A NEW<br />
                        WORLD
                    </h1>
                </div>
                <div className="absolute bottom-20 left-48 w-64 z-10 md:w-80">
                    <Image src="/wallpaper.png" alt="Hero" width={500} height={500} className="w-full h-auto object-contain" priority />
                </div>
            </div>

            {/* LOGIN PANEL */}
            <div className="col-span-1 bg-[var(--background)] shadow-xl rounded-3xl w-full max-w-2xl h-fit p-12 z-10 flex flex-col gap-2">
                <p className="max-w-xl text-[var(--foreground)] text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faBook} className="text-[var(--foreground)] size-4" />
                    Please, Fill This Form
                </p>
                <h1 className="text-6xl font-bold mb-6 text-[var(--foreground)]">Welcome Back, Readers!</h1>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailError"
                    />
                    {errors.email && <ErrorText message={errors.email} />}

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-12"
                            aria-describedby="passwordError"
                            id="password"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {errors.password && <ErrorText message={errors.password} />}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? "Processing..." : "Sign In"}
                    </button>
                </form>

                <p className="text-sm text-[var(--foreground)] mt-4 text-center">
                    New Here? <a href="/signup" className="text-[var(--primary)] font-semibold cursor-pointer">Sign Up</a>
                </p>
            </div>
        </section>
    );
}
