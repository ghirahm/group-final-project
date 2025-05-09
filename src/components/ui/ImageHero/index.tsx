/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"

export default function ImageHero() {
    const images = [
        "/hero/book1.webp",
        "/hero/book2.webp",
        "/hero/book3.webp"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);

            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsVisible(true);
            }, 2000);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <div className="order-2 col-span-1 flex justify-center items-center relative w-full h-[400px] overflow-hidden">
            {/* Circle Background */}
            <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[36rem] h-[36rem] bg-[var(--secondary)] rounded-full z-0 pointer-events-none"></div>

            {/* Image */}
            <img
                src={images[currentImageIndex]}
                alt="Book Image"
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-full object-contain rotate-12 transition-opacity duration-500 ease-in-out z-10 ${isVisible ? "opacity-100" : "opacity-0"}`}
            />
        </div>

    )
}