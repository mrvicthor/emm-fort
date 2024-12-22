"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import salesLogo from "../../../public/sales-logo.jpeg";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [notification, setNewNotification] = useState(true);
  // const date = new Date();
  // const presentYear = date.getFullYear();
  // const presentDay = date.getDate();

  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const presentMonth = months[date.getMonth()];

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  console.log(setNewNotification);

  return (
    <header className=" flex items-center justify-between gap-4">
      <div className="flex gap-4">
        <Link href="#" className="flex justify-center md:hidden">
          <Image alt="sales logo" src={salesLogo} width={40} height={40} />
        </Link>

        <h1 className="font-bold text-lg">Dashboard</h1>
      </div>
      <div className="border border-slate flex items-center gap-2 px-4 py-2 rounded-xl w-[20rem]">
        <span className="material-symbols-outlined block text-[#ff5c00]">
          search
        </span>
        <input
          type="search"
          placeholder="Search"
          className="outline-none h-full"
        />
      </div>
      <div className="flex gap-4 items-center">
        <span className="material-symbols-outlined block cursor-pointer">
          {notification ? "notifications_unread" : "notifications"}
        </span>
        <span className="material-symbols-outlined block">account_circle</span>
        <div className="flex flex-col">
          <span className="block font-semibold">Maureen</span>
          <span className="block text-sm opacity-40">Silver</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
