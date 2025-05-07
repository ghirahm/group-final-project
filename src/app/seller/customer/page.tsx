"use client";

import SellerHeader from "@/components/ui/SellerHeader";
import { faUser } from "@fortawesome/free-solid-svg-icons";


export default function Customers() {


    const customers = [
        { name: "Jane Doe", email: "janedoe@example.com", phone: "+1 555-1234", location: "New York, USA", date: "2022-01-15" },
        { name: "John Smith", email: "johnsmith@example.com", phone: "+1 555-5678", location: "Los Angeles, USA", date: "2021-11-30" },
        { name: "Emily Clark", email: "emilyclark@example.com", phone: "+1 555-8765", location: "Chicago, USA", date: "2023-03-10" },
        { name: "Michael Brown", email: "michaelbrown@example.com", phone: "+1 555-4321", location: "Houston, USA", date: "2022-07-22" },
        { name: "Linda Johnson", email: "lindajohnson@example.com", phone: "+1 555-9876", location: "Phoenix, USA", date: "2021-09-05" },
        { name: "David Wilson", email: "davidwilson@example.com", phone: "+1 555-6543", location: "Philadelphia, USA", date: "2023-01-18" },
        { name: "Sarah Lee", email: "sarahlee@example.com", phone: "+1 555-3210", location: "San Antonio, USA", date: "2022-05-12" },
        { name: "James Taylor", email: "jamestaylor@example.com", phone: "+1 555-7890", location: "San Diego, USA", date: "2021-12-01" },
        { name: "Patricia Martinez", email: "patriciamartinez@example.com", phone: "+1 555-2468", location: "Dallas, USA", date: "2023-04-05" },
        { name: "Robert Anderson", email: "robertanderson@example.com", phone: "+1 555-1357", location: "San Jose, USA", date: "2022-08-19" },
    ];

    return (
        <section className='flex flex-col gap-6 min-h-screen'>
            <SellerHeader title='Dashboard' icon={faUser} />

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-600">
                            {["No", "Name", "Email", "Phone", "Location", "Joined Date"].map((header, i) => (
                                <th
                                    key={i}
                                    className="px-4 py-6"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(({ name, email, phone, location, date }, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-[var(--secondary)]">
                                <td className="px-4 py-6">{index + 1}</td>
                                <td className="px-4 py-6">{name}</td>
                                <td className="px-4 py-6">{email}</td>
                                <td className="px-4 py-6">{phone}</td>
                                <td className="px-4 py-6">{location}</td>
                                <td className="px-4 py-6">{date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
