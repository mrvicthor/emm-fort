import { formatCurrency } from "@/helpers";
import React from "react";

type Downlines = {
  name: string;
  tier: string;
  benefits: number;
};
type DownlineProps = {
  data: Downlines[];
};
const Downlines = ({ data }: DownlineProps) => {
  return (
    <div className="py-4 px-4 space-y-3 rounded-xl dashboard-shadow ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Downline</h3>
        <h3 className="font-bold text-lg">Benefit</h3>
      </div>
      <ul className="flex flex-col gap-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-[#F4F4F4] px-3 rounded-lg py-2"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm opacity-40">{item.tier}</p>
            </div>
            <p className="font-bold">{formatCurrency(item.benefits)}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <button className="bg-[#ff5c00] text-white hover:opacity-40 py-2 px-4 rounded-xl font-bold">
          Add down lines
        </button>
        <button className="font-bold">See more</button>
      </div>
    </div>
  );
};

export default Downlines;
