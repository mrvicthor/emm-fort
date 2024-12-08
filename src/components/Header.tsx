"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import emmfortLogo from "../../public/emm-fort-logo.png";

const Header = () => {
  const pathname = usePathname();
  const [mounted, setMouted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navLinks = [
    { label: "home", href: "/" },
    { label: "about us", href: "/about" },
    { label: "our companies", href: "/companies" },
    { label: "contact us", href: "/contact" },
  ];

  const handleShowMenu = () => {
    if (showMenu) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    setShowMenu(!showMenu);
  };

  const preventScroll = () => {
    console.log("triger");
    document.body.style.overflow = "auto";
    setShowMenu(false);
  };

  useEffect(() => {
    setMouted(true);
  }, []);
  if (!mounted) return null;
  const menuIcon = mounted ? (showMenu ? "close" : "menu") : "menu";
  return (
    <header className="relative bg-white h-16 w-screen">
      {showMenu && (
        <div
          onClick={preventScroll}
          className="h-screen absolute bg-[#000000] left-0 right-0 opacity-50 top-[64px] z-10 transition duration-500 ease-in-out md:hidden"
        />
      )}
      <nav className="container h-full flex justify-between items-center">
        <Link href="/" className="h-14">
          <Image
            src={emmfortLogo}
            alt="emm-fort logo"
            sizes="100vw"
            width={56}
            height={56}
            className="object-cover"
          />
        </Link>
        <div
          id="mobile-nav"
          data-visible={showMenu ? true : false}
          className="mobile-nav px-8 py-8 bg-[#ffffff] left-0 right-0 flex flex-col items-center gap-[1.25rem] h-[15.8125rem] z-10 md:static md:h-4 md:top-0 md:py-0 md:flex-row md:px-0 md:gap-[2.3125rem]"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={preventScroll}
              className={`${
                pathname === link.href ? "text-[#FC644C]" : "text-[#000000]"
              }  uppercase tracking-[2.5px] font-bold text-[0.9375rem] leading-[19.53px]  md:text-[0.75rem] cursor-pointer hover:text-[#FC644C]`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div
          onClick={handleShowMenu}
          aria-controls="mobile-nav"
          className="md:hidden"
        >
          <button>
            <span className="sr-only" role="menubar">
              Menu
            </span>
            <span className="material-symbols-outlined">{menuIcon}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
