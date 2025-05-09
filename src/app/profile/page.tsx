/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';

/* Icon Libraries */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSave, faEdit, faLocation, faStar, faPlus, faClipboard } from "@fortawesome/free-solid-svg-icons";
import CustomerHeader from '@/components/ui/CustomerHeader';

interface City {
    id: number;
    name: string;
    state_name: string;
    country_name: string;
}

interface Referral {
    "full_name": string
    "referral_code": string
    "referred_by": string
    "referred_users": string[],
    "referrer_info": string
    "total_referrals": number
    "user_id": number
}

export interface User {
    id: number;
    full_name: string;
    email: string;
    balance: number;
    city_name: string;
    location_id: number;
    referral_code: string;
    role: string;
    is_active: boolean;
    total_referred: number;
}

export default function ProfilePage() {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [cities, setCities] = useState<City[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [referral, setReferral] = useState<Referral | null>(null);

    const [formData, setFormData] = useState({
        full_name: user?.full_name || "",
        email: user?.email || "",
    });

    const [formLocation, setFormLocation] = useState({
        city_id: 0,
        name: "",
        address: "",
        zip_code: "",
    });

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


    useEffect(() => {
        const fetchReferral = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('No access token found');

                console.log(token);

                const res = await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/users/referral', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const error = await res.json().catch(() => ({}));
                    console.error("Error Response:", error);
                    throw new Error(error.message || 'Failed to fetch referral');
                }

                const data = await res.json();

                setReferral(data.data)

            } catch (err) {
                console.error("Fetch referral error:", err);
            }
        };

        fetchReferral();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('No access token found');

                const res = await fetch('https://finalprojectbackend-production-9a18.up.railway.app/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const error = await res.json().catch(() => ({}));
                    console.error("Error Response:", error);
                    throw new Error(error.message || 'Failed to fetch referral');
                }

                const data = await res.json();
                console.log("Me: ", data)

                setUser(data.data)

            } catch (err) {
                console.error("Fetch referral error:", err);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user?.location_id) {
            const fetchLocationById = async () => {
                try {
                    const token = localStorage.getItem("accessToken");
                    const res = await fetch(`/api/locations/${user.location_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!res.ok) throw new Error("Failed to fetch location");

                    const data = await res.json();
                    setFormLocation({
                        city_id: data.data.city_id ?? 0,
                        name: data.data.name ?? "",
                        address: data.data.address ?? "",
                        zip_code: data.data.zip_code ?? "",
                    });
                } catch (err) {
                    console.error("Failed to load location:", err);
                }
            };

            fetchLocationById();
        } else {
            setFormLocation({
                city_id: 0,
                name: "",
                address: "",
                zip_code: "",
            });
        }
    }, [user?.location_id]);


    useEffect(() => {
        if (user) {
            setFormData({ full_name: user.full_name, email: user.email });
        }
    }, [user]);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeLocation = (field: string, value: string | number) => {
        setFormLocation((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdateUser = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const res = await fetch("https://finalprojectbackend-production-9a18.up.railway.app/api/v1/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("User updated successfully.");
                setIsEditingProfile(false);
            } else {
                alert("Update failed: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong while updating user.");
        }
    };

    const handleSaveLocation = async () => {
        const token = localStorage.getItem("accessToken");
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

    const [copied, setCopied] = useState(false);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <div className='flex flex-col gap-2'>
                <CustomerHeader title='Profile' icon={faUser} />
                <div className="grid grid-cols-2 gap-6">
                    {/* Name */}
                    <div className='w-full space-y-2'>
                        <p className="text-sm font-semibold text-[var(--primary)]">Name</p>
                        {isEditingProfile ? (
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => handleChange('full_name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        ) : (
                            <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{user?.full_name}</p>
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
                            <p className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[var(--foreground)]">{user?.email}</p>
                        )}
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-end'>
                    <button
                        onClick={isEditingProfile ? handleUpdateUser : () => setIsEditingProfile(true)}
                        className="w-fit bg-[var(--primary)] text-sm font-medium flex flex-row items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={isEditingProfile ? faSave : faEdit} className="text-xl" />
                        {isEditingProfile ? "Save" : "Edit"}
                    </button>
                </div>
            </div>
            {referral &&
                <div className='flex flex-col gap-6'>
                    <CustomerHeader title='Referral' icon={faStar} />
                    <div className="w-full max-w-fulll mx-auto border border-gray-200 rounded-xl shadow-md p-6 bg-white space-y-6">
                        <div className="grid grid-cols-2 gap-6 text-[var(--foreground)]">
                            <div className='space-y-2'>
                                <p className="font-bold text-[var(--primary)] text-sm">Full Name</p>
                                <p>{referral?.full_name}</p>
                            </div>

                            <div className='space-y-2'>
                                <p className="font-bold text-[var(--primary)] text-sm">Referral Code</p>
                                <div className="flex flex-row items-center gap-2">
                                    <p>{referral?.referral_code}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(referral?.referral_code || "")}
                                        className="text-sm text--[var(--foreground)] hover:underline hover:text-[var(--primary)]"
                                    >
                                        <FontAwesomeIcon icon={faClipboard} />
                                    </button>
                                    {copied && <span className="text-sm text-[var(--foreground)]">Copied!</span>}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <p className="font-bold text-[var(--primary)] text-sm">Referred By</p>
                                <p>{referral.referred_by || "—"}</p>
                            </div>

                            <div className='space-y-2'>
                                <p className="font-bold text-[var(--primary)] text-sm">Referrer Info</p>
                                <p>{referral.referrer_info || "—"}</p>
                            </div>

                            <div className='space-y-2'>
                                <p className="font-bold text-[var(--primary)] text-sm">Total Referrals</p>
                                <p>{referral.total_referrals}</p>
                            </div>

                            <div className='space-y-2'>
                                <p className="font-bold text-[var(--primary)] text-sm">User ID</p>
                                <p>{referral.user_id}</p>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <p className="font-bold text-sm text-[var(--primary)]">Referred Users</p>
                            {referral.referred_users.length > 0 ? (
                                <ul className="list-disc list-inside text-sm text-[var(--foreground)]">
                                    {referral.referred_users.map((user, idx) => (
                                        <li key={idx}>{user}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[var(--foreground)] text-sm">No referred users</p>
                            )}
                        </div>
                    </div>
                </div>
            }
            <div className='flex flex-col gap-2'>
                <CustomerHeader title='Address*' icon={faLocation} />
                {
                    user?.location_id == null ?
                        <div className="col-span-2 w-full flex justify-end">
                            <button
                                type="submit"
                                className="w-fit bg-[var(--primary)] text-sm font-medium flex items-center gap-2 px-6 py-2 rounded-lg text-[var(--background)] hover:opacity-60"
                                onClick={() => setIsEditingLocation(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-xl" />
                                Create Location
                            </button>
                        </div> :
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

            </div>
        </section >
    );
}