"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

const TierForm = () => {
  const [selectTier, setSelectedTier] = useState<string>("");
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const tierList = [
    { label: "Platinum", price: "₦100,000" },
    {
      label: "Gold",
      price: "₦50,000",
    },
    {
      label: "Silver",
      price: "₦25,000",
    },
    {
      label: "Bronze",
      price: "₦10,000",
    },
    { label: "Basic", price: "FREE" },
  ];

  return (
    <form className="flex flex-col gap-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {tierList.map((tier, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`h-16 bg-[#f8f8f8] cursor-pointer rounded-xl flex items-center gap-4 px-4 border-2 tier ${
              tier.label === "Gold"
                ? "border-[#FBD968]"
                : tier.label === "Silver"
                ? "border-[#BCBBBC]"
                : tier.label === "Platinum"
                ? "border-[#E5E4E2]"
                : tier.label === "Basic"
                ? "border-black"
                : "border-[#DA7122]"
            }`}
            onClick={() => setSelectedTier(tier.label)}
          >
            <label htmlFor={tier.label} className="wrapper">
              {tier.label}
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
          </motion.div>
        ))}
      </motion.div>

      <button className="bg-[#ff5c00] text-white rounded-xl hover:opacity-40 font-bold py-3">
        Pay with card
      </button>
    </form>
  );
};

export default TierForm;