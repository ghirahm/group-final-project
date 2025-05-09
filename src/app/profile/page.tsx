'use client';

import { useState, useEffect } from 'react';

/* Icon Libraries */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSave, faEdit, faLocation, faStar } from "@fortawesome/free-solid-svg-icons";
import CustomerHeader from '@/components/ui/CustomerHeader';

interface City {
    id: number;
    name: string;
    state_name: string;
    country_name: string;
}

export default function ProfilePage() {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);

    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await fetch("https://cors-anywhere.herokuapp.com/https://finalprojectbackend-production-9a18.up.railway.app/api/v1/cities", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const json = await res.json();
                setCities(json.data.cities);
            } catch (err) {
                console.error("Failed to fetch cities:", err);
            }
        };

        fetchCities();
    }, []);

    const handleCityChange = (cityName: string) => {
        const selected = cities.find((c) => c.name === cityName);
        if (selected) {
            handleChangeLocation("city", selected.name);
            handleChangeLocation("state", selected.state_name);
            handleChangeLocation("country", selected.country_name);
        } else {
            handleChangeLocation("city", "");
            handleChangeLocation("state", "");
            handleChangeLocation("country", "");
        }
    };
    console.log(cities)

    const [formData, setFormData] = useState({
        name: 'Ghirah Madani',
        surname: 'Ghirah',
        username: 'ghirah123',
        email: 'ghirah@example.com'
    });

    const [formLocation, setFormLocation] = useState({
        country: '',
        state: '',
        city: '',
        name: '',
        address: '',
        zip_code: ''
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeLocation = (field: string, value: string) => {
        setFormLocation((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <CustomerHeader title='Profile' icon={faUser} />

            <div className="grid grid-cols-2 gap-6">
                {/* Name */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Name</p>
                    {isEditingProfile ? (
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

                {/* Email */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Email</p>
                    {isEditingProfile ? (
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
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="w-fit bg-[var(--primary)] text-sm font-medium flex flex-row items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60 cursor-pointer"
                >
                    <FontAwesomeIcon icon={isEditingProfile ? faSave : faEdit} className='text-xl' />
                    {isEditingProfile ? 'Save' : 'Edit'}
                </button>
            </div>

            <CustomerHeader title='Address*' icon={faLocation} />
            <div className="grid grid-cols-2 gap-6">
                {/* City */}
                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">City</p>
                    {isEditingLocation ? (
                        <select
                            value={formLocation.city}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">
                            {formLocation.city || "—"}
                        </p>
                    )}
                </div>

                {formLocation.state && (
                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">State</p>
                        {isEditingLocation ? (
                            <p
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            >{formLocation.state}</p>
                        ) : (
                            <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formLocation.state || "-"}</p>
                        )}
                    </div>
                )}

                {formLocation.country && (
                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">Country</p>
                        {isEditingLocation ? (
                            <p
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            >{formLocation.country}</p>
                        ) : (
                            <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formLocation.country || "—"}</p>
                        )}
                    </div>
                )}

                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Name</p>
                    {isEditingLocation ? (
                        <input
                            type="text"
                            value={formLocation.name}
                            onChange={(e) => handleChangeLocation('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formLocation.name || "—"}</p>
                    )}
                </div>

                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Address</p>
                    {isEditingLocation ? (
                        <input
                            type="text"
                            value={formLocation.address}
                            onChange={(e) => handleChangeLocation('address', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formLocation.address || "—"}</p>
                    )}
                </div>

                <div className='w-full space-y-2'>
                    <p className="text-sm font-semibold text-[var(--primary)]">Zip Code</p>
                    {isEditingLocation ? (
                        <input
                            type="text"
                            value={formLocation.zip_code}
                            onChange={(e) => handleChangeLocation('zip_code', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    ) : (
                        <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{formLocation.zip_code || "—"}</p>
                    )}
                </div>
            </div>
            <div className='w-full flex flex-row items-center justify-end'>
                <button
                    onClick={() => setIsEditingLocation(!isEditingLocation)}
                    className="w-fit bg-[var(--primary)] text-sm font-medium flex flex-row items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60 cursor-pointer"
                >
                    <FontAwesomeIcon icon={isEditingLocation ? faSave : faEdit} className='text-xl' />
                    {isEditingLocation ? 'Save' : 'Edit'}
                </button>
            </div>

            <CustomerHeader title='Referral' icon={faStar} />
        </section >
    );
}