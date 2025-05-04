"use client";

import React, { useState } from 'react';

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
    <div className="bg-[#F4F4F4] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#2940D5] flex max-w-4xl w-full rounded-3xl border-8 border-[#2940d5] shadow-[0_10px_20px_rgba(0,0,0,0.15)] overflow-hidden flex-col md:flex-row">
        <div className="relative flex-shrink-0 w-full md:w-1/2 bg-[#dbf066] hidden md:block">
          <img
            alt="image"
            src="/login.png"
            className="w-full h-full object-cover"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2 bg--secandary rounded-tr-3xl rounded-br-3xl p-6 flex flex-col justify-center max-w-sm mx-auto">
          <div className="mb-6 ">
            <h1 className="text-xl font-semibold text-[#DBF066] leading-tight mb-4">Login</h1>
            <form className="space-y-2 " onSubmit={validateForm} noValidate>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dbf066]"
                  aria-describedby="emailError"
                />
                {emailError && (
                  <p className="text-red-600 text-[10px] mt-1">{emailError}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dbf066] pr-10"
                  aria-describedby="passwordError"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                {passwordError && (
                  <p className="text-red-600 text-[10px] mt-1">{passwordError}</p>
                )}
                {passwordStrength && (
                  <p className="text-xs mt-1 font-semibold">{passwordStrength}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#dbf066] rounded-full py-1.5 text-[#2940d5] font-extrabold text-xs hover:bg-[#c6d94f] transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
