"use client";

import React, { useActionState, useEffect, useState } from "react";
import { motion } from "motion/react";
import { formatCurrency, TierDetails as TierInfoProps } from "@/helpers";
import { AddtierActionResponse } from "@/app/lib/definitions";
import { addTier } from "@/app/actions/user";
import TierDetails from "./TierInfo";

type TierProps = {
  selectTier: string;
  handleSelect: React.Dispatch<React.SetStateAction<string>>;
  details: TierInfoProps;
};

const initialState: AddtierActionResponse = {
  success: false,
  message: "",
};

const TierForm = ({ selectTier, handleSelect, details }: TierProps) => {
  const [state, action, pending] = useActionState(addTier, initialState);
  const [showDialog, setShowDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
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
    { label: "Platinum", price: 100000 },
    {
      label: "Gold",
      price: 50000,
    },
    {
      label: "Silver",
      price: 25000,
    },
    {
      label: "Bronze",
      price: 10000,
    },
    { label: "Basic", price: 0 },
  ];

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;
  return (
    <form action={action} className="flex flex-col gap-6">
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
            onClick={() => {
              handleSelect(tier.label);
              setShowDialog(!showDialog);
            }}
          >
            <label
              htmlFor={tier.label}
              className="wrapper"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {tier.label}
              <input
                type="radio"
                checked={selectTier === tier.label}
                onChange={(e) => {
                  handleSelect(e.target.value);
                  setShowDialog(true);
                }}
                value={tier.label}
                name="tier"
                id={tier.label}
              />
              <span
                className="checkmark"
                onClick={() => setShowDialog(true)}
              ></span>
            </label>
            <p className="ml-auto font-medium text-lg">
              {tier.price === 0 ? "FREE" : formatCurrency(tier.price)}
            </p>
          </motion.div>
        ))}
      </motion.div>
      {state?.message && (
        <div
          className={`${
            state.success ? "border-green-500" : "border-red-500"
          } border py-3 px-4 rounded-lg `}
        >
          {state.success && (
            <span className="material-symbols-outlined text-green-500 flex">
              check_circle
            </span>
          )}
          <p className="text-red-500">{state.message}</p>
        </div>
      )}

      {showDialog ? (
        <>
          <div
            className="bg-[#000000] opacity-50 z-40 fixed w-screen h-full left-0 right-0 top-0"
            onClick={() => setShowDialog(!showDialog)}
          />
          <div className="dashboard-shadow py-4 px-4 bg-[#000000] rounded-xl fixed z-50 top-[10rem] left-[50%] -translate-x-[50%] w-[25rem] space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl text-white">{selectTier}</h2>{" "}
              <div
                onClick={() => setShowDialog(!showDialog)}
                className="cursor-pointer"
              >
                <span className="material-symbols-outlined text-red-500">
                  close
                </span>
              </div>
            </div>
            <TierDetails
              directBenefit={details.directBenefit}
              fee={details.fee}
              referralBenefit={details.referralBenefit}
            />
          </div>
        </>
      ) : null}

      <button className="bg-[#ff5c00] text-white rounded-xl hover:opacity-40 font-bold py-3">
        {pending ? "Adding..." : "Pay with card"}
      </button>
    </form>
  );
};

export default TierForm;
