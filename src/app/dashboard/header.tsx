"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import salesLogo from "../../../public/sales-logo.jpeg";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const date = new Date();
  const presentYear = date.getFullYear();
  const presentDay = date.getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const presentMonth = months[date.getMonth()];

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  console.log(date.getMonth());

  return (
    <header className=" flex items-center justify-between gap-4">
      <div className="flex gap-4">
        <Link href="#" className="flex justify-center">
          <Image alt="sales logo" src={salesLogo} width={40} height={40} />
        </Link>
        <div>
          <p className="text-black opacity-20 text-xs">
            {presentMonth} {presentDay}, {presentYear}
          </p>
          <h1 className="font-bold text-lg">Dashboard</h1>
        </div>
      </div>
      <div className="border border-slate flex items-center gap-2 px-4 py-2 rounded-xl">
        <span className="material-symbols-outlined block">search</span>
        <input
          type="search"
          placeholder="Search"
          className="outline-none h-full"
        />
      </div>
    </header>
  );
};

export default Header;
