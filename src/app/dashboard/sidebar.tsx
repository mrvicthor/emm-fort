import Link from "next/link";
import React from "react";
import Image from "next/image";
import salesLogo from "../../../public/sales-logo.jpeg";
const Sidebar = () => {
  const links = [
    { label: "Tier", icon: "account_balance_wallet" },
    { label: "Transaction", icon: "universal_currency_alt" },
    { label: "Monthly target", icon: "target" },
    { label: "Total earned", icon: "money_bag" },
    { label: "Downlines", icon: "list_alt" },
    { label: "Settings", icon: "settings" },
    { label: "Referrals", icon: "share" },
  ];
  return (
    <aside className="bg-white h-[94vh] rounded-xl hidden">
      <nav className="px-3 flex flex-col gap-6 relative h-full">
        <Link href="#" className="flex justify-center mt-2">
          <Image alt="sales logo" src={salesLogo} width={74} height={74} />
        </Link>
        <Link
          href="/"
          className="h-14 w-[13.375rem] bg-gradient-to-r from-[#ff5c00] to-[#FFD700] flex justify-center items-center rounded-lg capitalize font-bold text-white"
        >
          dashboard
        </Link>
        {/* {links.map((link, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Link href="/" className="flex items-center hover:text-[#ff5c00]">
              <span className="material-symbols-outlined block">
                {link.icon}
              </span>
              <span className="pl-2 block">{link.label}</span>
            </Link>
          </div>
        ))} */}

        <button className="absolute bottom-16 flex items-center">
          <span className="material-symbols-outlined block">logout</span>{" "}
          <span className="pl-2 block">Sign out</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
