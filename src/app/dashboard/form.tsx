"use client";

import React, { useState } from "react";

const TierForm = () => {
  const [selectTier, setSelectedTier] = useState<string>("");

  const tierList = [
    { label: "Platinum", price: "#100,000" },
    {
      label: "Gold",
      price: "#50,000",
    },
    {
      label: "Silver",
      price: "#25,000",
    },
    {
      label: "Bronze",
      price: "#10,000",
    },
  ];

  return (
    <form className="flex flex-col gap-6">
      {tierList.map((tier, index) => (
        <div
          key={index}
          className={`h-16 bg-[#f8f8f8] cursor-pointer rounded-xl flex items-center gap-4 px-4 border-2 tier ${
            tier.label === "Gold"
              ? "border-[#FBD968]"
              : tier.label === "Silver"
              ? "border-[#BCBBBC]"
              : tier.label === "Platinum"
              ? "border-[#E5E4E2]"
              : "border-[#DA7122]"
          }`}
          onClick={() => setSelectedTier(tier.label)}
        >
          <label htmlFor={tier.label} className="wrapper">
            {tier.label} tier
            <input
              type="radio"
              checked={selectTier === tier.label}
              onChange={(e) => setSelectedTier(e.target.value)}
              value={tier.label}
              name="tier"
              id={tier.label}
            />
            <span className="checkmark"></span>
          </label>
          <p className="ml-auto font-medium text-lg">{tier.price}</p>
        </div>
      ))}

      <button className="bg-[#ff5c00] text-white rounded-xl hover:opacity-40 font-bold py-3">
        Pay with card
      </button>
    </form>
  );
};

export default TierForm;
