'use client';

import { useState } from 'react';

/* Icon Libraries */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSave, faEdit } from "@fortawesome/free-solid-svg-icons";
import CustomerHeader from '@/components/ui/CustomerHeader';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: 'Ghirah Madani',
        surname: 'Ghirah',
        username: 'ghirah123',
        email: 'ghirah@example.com'
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <CustomerHeader title='Profile' icon={faUser} />

            <div className="grid grid-cols-2 gap-6">
                {/* Name */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Name</p>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formData.name}</p>
                    )}
                </div>

                {/* Surname */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Surname</p>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.surname}
                            onChange={(e) => handleChange('surname', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formData.surname}</p>
                    )}
                </div>

                {/* Username */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Username</p>
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formData.username}</p>
                    )}
                </div>

                {/* Email */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Email</p>
                    {isEditing ? (
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formData.email}</p>
                    )}
                </div>
            </div>
            <div className='w-full flex flex-row items-center justify-end'>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-fit bg-[var(--primary)] text-sm font-medium flex flex-row items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60 cursor-pointer"
                >
                    <FontAwesomeIcon icon={isEditing ? faSave : faEdit} className='text-xl' />
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
        </section >
    );
}