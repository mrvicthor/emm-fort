import React from "react";
import Header from "./header";
import { formatCurrency, getTierMatch } from "@/helpers";
import Image from "next/image";
import SalesByTime from "./_components/salesByTime";
import Gauge from "./_components/gauge";
import Downlines from "./_components/downlines";
import { getUser } from "../lib/dal";

import { redirect } from "next/navigation";
export default async function Page() {
  const user = await getUser();
  // const userTier = user._doc.tier;
  const { tier: userTier, username, name, personalReferralCode } = user._doc;

  const fullName = name.split(" ");

  if (!userTier) {
    redirect("/dashboard/tier");
  }

  const tier = getTierMatch(userTier);

  const downlines = [
    { name: "Maureen", tier: "Silver", benefits: 2500 },
    { name: "Bright", tier: "Gold", benefits: 4500 },
    { name: "Jude", tier: "Bronze", benefits: 3000 },
  ];

  return (
    <section className="bg-white min-h-[95vh] md:h-[96vh] rounded-xl px-4 py-2 space-y-4 overflow-hidden">
      <Header username={username} name={fullName[0]} />
      <section className="md:grid md:grid-cols-2 gap-4">
        <div className="md:col-span-1 flex flex-col gap-3 ">
          <div className="rounded-xl py-4 px-4 flex justify-between dashboard-shadow">
            <div className="flex flex-col justify-between flex-1">
              <article className="space-y-1">
                <h2 className="font-bold sm:text-sm md:text-2xl">Tier</h2>
                <p className="text-md font-medium opacity-40 capitalize">
                  {userTier}
                </p>
                <small className="font-bold">
                  referal code: {personalReferralCode}
                </small>
              </article>
              <button className="bg-gradient-to-r from-[#ff5c00] to-[#FFD700] py-2 px-4 rounded-lg text-white capitalize font-semibold">
                upgrade tier
              </button>
            </div>
            <div className="flex-1 h-28 w-28">
              <Image
                src={tier}
                alt="tier logo"
                className="object-contain h-full w-full"
              />
            </div>
          </div>
          <div className=" py-4 px-4 rounded-xl dashboard-shadow">
            <div className="space-y-3">
              <h3 className="capitalize font-bold text-sm md:text-lg">
                available balance
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined block">
                  lock_open
                </span>
                <p className="font-medium text-md opacity-40">
                  {formatCurrency(250000)}
                </p>
                <button className="bg-[#06CC17] ml-auto text-white w-[9.125rem] rounded-lg h-[2rem] font-bold hover:opacity-40">
                  Withdraw
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined block">lock</span>
                <p className="font-medium text-md opacity-40">
                  {formatCurrency(850000)}
                </p>
                <button className="bg-[#191382] ml-auto text-white h-8 w-[9.125rem] rounded-lg font-bold hover:opacity-40">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 mt-3 md:mt-0">
          <div className="rounded-xl dashboard-shadow py-4 px-4 overflow-hidden space-y-8">
            <h3 className="font-bold text-sm md:text-lg">Total earned</h3>
            <Gauge value={250000} maxValue={5000000} textColor="#222" />
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="py-4 px-4 space-y-3 rounded-xl dashboard-shadow ">
            <p className="capitalize font-semibold text-sm md:text-lg">
              monthly target
            </p>
            <SalesByTime />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <Downlines data={downlines} />
        </div>
      </section>
    </section>
  );
}
