/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';

/* Icon Libraries */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSave, faEdit, faLocation, faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
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
                const res = await fetch("/api/cities", {
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

    /* const handleCityChange = (cityId: number) => {
        const selected = cities.find((c) => c.id === cityId);
        if (selected) {
            handleChangeLocation("city_id", selected.id);
            handleChangeLocation("city", selected.name);
            handleChangeLocation("state", selected.state_name);
            handleChangeLocation("country", selected.country_name);
        } else {
            handleChangeLocation("city_id", null);
            handleChangeLocation("city", "");
            handleChangeLocation("state", "");
            handleChangeLocation("country", ""); 
        }
    }; */
    console.log(cities)

    const [formData, setFormData] = useState({
        name: 'Ghirah Madani',
        surname: 'Ghirah',
        username: 'ghirah123',
        email: 'ghirah@example.com'
    });

    const [formLocation, setFormLocation] = useState<{
        city_id: number;
        name: string;
        address: string;
        zip_code: string;
    }>({
        city_id: 0,
        name: "",
        address: "",
        zip_code: "",
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeLocation = (field: string, value: string | number) => {
        setFormLocation((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveLocation = async () => {
        const token = localStorage.getItem("accessToken");
        console.log(formLocation);
        try {
            const res = await fetch("/api/locations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formLocation),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Location saved!");
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save location.");
        }
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await fetch("/api/location", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log(data)
                if (res.ok) {
                    setFormLocation(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch location:", err);
            }
        };

        fetchLocation();
    }, []);




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
            <div className="col-span-2 w-full flex justify-end">
                <button
                    type="submit"
                    className="w-fit bg-[var(--primary)] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-xl" />
                    Create Location
                </button>
            </div>
            {
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveLocation();
                    }}
                    className="grid grid-cols-2 gap-6"
                >
                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">City</p>
                        <select
                            value={formLocation.city_id}
                            onChange={(e) => handleChangeLocation('city_id', Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">Name</p>
                        <input
                            type="text"
                            value={formLocation.name}
                            onChange={(e) => handleChangeLocation('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>

                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">Address</p>
                        <input
                            type="text"
                            value={formLocation.address}
                            onChange={(e) => handleChangeLocation('address', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>

                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">Zip Code</p>
                        <input
                            type="text"
                            value={formLocation.zip_code}
                            onChange={(e) => handleChangeLocation('zip_code', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-end">
                        <button
                            type="submit"
                            className="w-fit bg-[var(--primary)] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            }

            <CustomerHeader title='Referral' icon={faStar} />
        </section >
    );
}