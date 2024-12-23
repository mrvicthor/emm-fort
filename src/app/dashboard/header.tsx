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
    <header className=" flex items-center justify-between gap-2 md:gap-4 overflow-hidden h-14">
      <div className="flex gap-4">
        <Link href="#" className="flex justify-center">
          <Image alt="sales logo" src={salesLogo} width={24} height={24} />
        </Link>
        <h1 className="font-bold sm:text- md:text-lg">Dashboard</h1>
      </div>
      <div className="dashboard-shadow hidden  md:flex items-center gap-2 px-4 py-2 rounded-xl w-[20rem]">
        <span className="material-symbols-outlined block opacity-40">
          search
        </span>
        <input
          type="search"
          placeholder="Search"
          className="outline-none h-full"
        />
      </div>
      <div className="h-8 w-8 rounded-full dashboard-shadow flex items-center justify-center md:hidden ml-auto">
        <span className="material-symbols-outlined block opacity-40">
          search
        </span>
      </div>
      <div className="flex gap-1 md:gap-4 items-center">
        <span className="material-symbols-outlined block cursor-pointer">
          {notification ? "notifications_unread" : "notifications"}
        </span>
        <span className="material-symbols-outlined block">account_circle</span>
        <div className="hidden md:flex flex-col">
          <span className="block font-semibold sm:text-sm">Maureen</span>
          <span className="block sm:text-xs text-sm opacity-40 ">Silver</span>
        </div>
        <button className="">
          <span className="block text-xs">Sign out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
