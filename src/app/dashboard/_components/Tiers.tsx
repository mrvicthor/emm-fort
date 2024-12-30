"use client";
import Link from "next/link";
import React, { useState } from "react";
import TierForm from "./form";

import { getTierDetails } from "@/helpers";

// import Dashboard from "@/components/Dashboard";

const Tier = () => {
  const [selectTier, setSelectedTier] = useState<string>("");

  const details = getTierDetails(selectTier);

  return (
    <>
      <section className="container py-12 flex justify-center">
        <div className="bg-white w-[30rem] py-8 px-4 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="material-symbols-outlined text-[#ff5c00]">
                chevron_backward
              </span>
            </Link>
            <h1 className="text-3xl font-semibold">Choose tier</h1>
          </div>
          <TierForm
            selectTier={selectTier}
            handleSelect={setSelectedTier}
            details={details}
          />
        </div>
      </section>
    </>
  );
};

export default Tier;
