import React from "react";
import Link from "next/link";
import Image from "next/image";
import emmfortLogo from "../../public/emm-fort-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#101010]">
      <div className="container py-4">
        <div>
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
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
            <div className="md:ml-auto space-y-4">
              <h4 className="text-white text-lg capitalize">our companies</h4>
              <div className="text-[#BCBCBB] flex flex-col gap-3">
                <Link href="#" className="hover:text-[#ff5c00]">
                  EMM-Fort Nigeria
                </Link>
                <Link href="#" className="hover:text-[#ff5c00]">
                  EMM-Fort Affiliate Sales
                </Link>
                <Link href="#" className="hover:text-[#ff5c00]">
                  EMM-Fort Consulting
                </Link>
                <Link href="#" className="hover:text-[#ff5c00]">
                  EMM-Fort Advertising
                </Link>
                <Link href="#" className="hover:text-[#ff5c00]">
                  EMM-Fort Logistics
                </Link>
                <Link href="#" className="hover:text-[#ff5c00]">
                  EMM-Fort Realty
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white text-lg">EMM-Fort Group</h4>
              <div className="text-[#BCBCBB]  flex flex-col gap-3">
                <Link href="/" className="capitalize hover:text-[#ff5c00]">
                  home
                </Link>
                <Link href="#" className="capitalize hover:text-[#ff5c00]">
                  about us
                </Link>
                <Link href="#" className="capitalize hover:text-[#ff5c00]">
                  ask me
                </Link>
                <Link href="#" className="capitalize hover:text-[#ff5c00]">
                  contact us
                </Link>
              </div>
            </div>
          </div>
          <div className="text-[#BCBCBB] flex flex-col md:flex-row md:justify-between mt-8 md:items-center gap-4">
            <small>Copyright 2024 EMM-Fort. All rights reserved.</small>
            <div className="flex gap-4">
              <Link href="#">Privacy policy</Link>
              <Link href="#">Terms and condition</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
