"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const CustomersPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const customers = [
    { name: "Jane Doe", email: "janedoe@example.com", phone: "+1 555-1234", location: "New York, USA", date: "2022-01-15" },
    { name: "John Smith", email: "johnsmith@example.com", phone: "+1 555-5678", location: "Los Angeles, USA", date: "2021-11-30" },
    { name: "Emily Clark", email: "emilyclark@example.com", phone: "+1 555-8765", location: "Chicago, USA", date: "2023-03-10" },
    { name: "Michael Brown", email: "michaelbrown@example.com", phone: "+1 555-4321", location: "Houston, USA", date: "2022-07-22" },
    { name: "Linda Johnson", email: "lindajohnson@example.com", phone: "+1 555-9876", location: "Phoenix, USA", date: "2021-09-05" },
  ];
