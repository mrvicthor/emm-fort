import React from "react";
import Header from "./header";
import { formatCurrency, getTierMatch } from "@/helpers";
import Image from "next/image";
import SalesByTime from "./_components/salesByTime";

export default function DashboardPage() {
  const tier = getTierMatch("Silver");
  return (
    <section className="bg-white h-[94vh] rounded-xl px-4 py-2 space-y-4">
      <Header />
      <section className=" rounded-xl py-4 px-4 flex justify-between dashboard-shadow ">
        <div className="flex flex-col justify-between">
          <article className="space-y-1">
            <h2 className="font-medium">Tier</h2>
            <p className="text-2xl font-bold">Silver</p>
          </article>
          <button className="bg-gradient-to-r from-[#ff5c00] to-[#FFD700] py-2 px-4 rounded-lg text-white capitalize font-semibold">
            upgrade tier
          </button>
        </div>
        <div className="h-28 w-28">
          <Image src={tier} alt="tier logo" />
        </div>
      </section>
      <section className="flex justify-between gap-4 py-4 px-4 rounded-xl capitalize dashboard-shadow ">
        <div className="space-y-2">
          <h3>available balance</h3>
          <p className="font-bold text-xl">{formatCurrency(250000)}</p>
        </div>
        <div className="flex flex-col gap-4">
          <button className="bg-[#06CC17] text-white w-[9.125rem] rounded-lg h-[2rem] font-bold hover:opacity-40">
            Withdraw
          </button>
          <button className="bg-[#191382] text-white h-8 w-[9.125rem] rounded-lg font-bold hover:opacity-40">
            Save
          </button>
        </div>
      </section>
      <section className="py-4 px-4 space-y-3 rounded-xl dashboard-shadow ">
        <p className="capitalize font-semibold text-lg">monthly target</p>
        <SalesByTime />
      </section>
    </section>
  );
}
