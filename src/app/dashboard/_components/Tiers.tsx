"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import TierForm from "./form";

import { getTierDetails } from "@/helpers";
import Loading from "@/components/Loading";

// import Dashboard from "@/components/Dashboard";
type TierProps = {
  email: string;
};
const Tier = ({ email }: TierProps) => {
  const [selectTier, setSelectedTier] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const details = getTierDetails(selectTier);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;
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
          <Suspense fallback={<Loading />}>
            <TierForm
              selectTier={selectTier}
              handleSelect={setSelectedTier}
              details={details}
              email={email}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Tier;
