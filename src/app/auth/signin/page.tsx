"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const validateForm = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (password.trim().length < 6) {
            setPasswordError('Please enter a valid Password.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            alert('Account created successfully!');
            setEmail('');
            setPassword('');
            setPasswordStrength('');
        }
    };

    return (
        <section className="relative bg-[var(--primary)] h-screen flex items-center justify-center mt-24 py-12 px-12 overflow-hidden">
            <Image
                src="/wallpaper.jpg"
                alt="Illustration"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute inset-0 z-0"
            />

            {/* Login Form Floating Panel */}
            <div className="absolute top-[40%] right-12 transform -translate-y-1/2 bg-[var(--background)] shadow-xl rounded-3xl w-full max-w-2xl p-12 z-10 flex flex-col gap-2">
                <p className="max-w-xl text-[var(--foreground)] text-sm flex flex-row items-center gap-2"><FontAwesomeIcon icon={faBook} className='text-[var(--foreground)] size-4' />Please, Fill This Form</p>
                <h1 className="text-6xl font-bold mb-6 text-[var(--foreground)]">Welcome Back, Readers!</h1>
                <form className="flex flex-col gap-6" onSubmit={validateForm} noValidate>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailError"
                    />
                    {emailError && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{emailError}</p>
                    )}
                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
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
                            tabIndex={-1}
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{passwordError}</p>
                    )}
                    {passwordStrength && (
                        <p className="text-[var(--alert)] text-xs flex flex-row items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className='text-[var(--alert)]' />{passwordStrength}</p>
                    )}
                    <button type="submit" className="text-[var(--foreground)] border-2 border-[var(--primary)] px-6 py-2 rounded-full transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]">
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-[var(--foreground)] mt-4 text-center">
                    New Here? <a href="#" className="text-[var(--primary)] font-semibold">Sign Up</a>
                </p>
            </div>
        </section>
    );
}
