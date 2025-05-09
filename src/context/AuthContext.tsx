'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

interface AuthContextType {
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    status: 'success' | 'error' | null;
    setStatus: React.Dispatch<React.SetStateAction<'success' | 'error' | null>>;
    alertMessage: string | null;
    setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
    clearAlert: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    login: async () => { },
    logout: () => { },
    isAuthenticated: false,
    status: null,
    setStatus: () => { },
    alertMessage: null,
    setAlertMessage: () => { },
    clearAlert: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const loginTime = localStorage.getItem('loginTime');

        if (token && loginTime) {
            setAccessToken(token);

            const oneHour = 60 * 60 * 1000;
            const timePassed = Date.now() - parseInt(loginTime, 10);
            const timeLeft = oneHour - timePassed;

            if (timeLeft <= 0) {
                logout();
            } else {
                const timer = setTimeout(() => logout(), timeLeft);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('accessToken', data.data.access_token);
                localStorage.setItem('refreshToken', data.data.refresh_token);
                localStorage.setItem('loginTime', Date.now().toString());
                setAccessToken(data.data.access_token);
                setStatus('success');
                setAlertMessage('Login successful!');
                router.push('/');
            } else {
                setStatus('error');
                setAlertMessage(data.message || 'Login failed');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setStatus('error');
            setAlertMessage(err.message || 'Server error');
        }
    };

    const logout = async () => {
        const token = localStorage.getItem('accessToken');

        try {
            if (token) {
                await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.warn({ error });
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('loginTime');
            setAccessToken(null);
            window.location.href = '/auth/signin';
        }
    };

    const clearAlert = () => {
        setStatus(null);
        setAlertMessage(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout,
                isAuthenticated: !!accessToken,
                status,
                setStatus,
                alertMessage,
                setAlertMessage,
                clearAlert,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
