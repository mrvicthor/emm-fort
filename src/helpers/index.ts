import { StaticImageData } from "next/image";
import platinumLogo from "../../public/platinum-tier.jpeg";
import goldLogo from "../../public/gold-tier.jpeg";
import silverLogo from "../../public/silver-tier.jpeg";
import bronzeLogo from "../../public/bronze-tier.jpeg";
import basicLogo from "../../public/basic-tier.jpeg";

export const getTierMatch = (value: string) => tiers[value];

const tiers: Record<string, StaticImageData> = {
  Platinum: platinumLogo,
  Gold: goldLogo,
  Silver: silverLogo,
  Bronze: bronzeLogo,
  Basic: basicLogo,
};

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return formatter.format(value);
};

export interface TierDetails {
  fee: string;
  directBenefit: string;
  referralBenefit: string;
}

const platinumDetails: TierDetails = {
  fee: "100000",
  directBenefit: "5% Commission",
  referralBenefit: "2% Commission",
};

const goldDetails: TierDetails = {
  fee: "50000",
  directBenefit: "4% Commission",
  referralBenefit: "2% Commission",
};

const silverDetails: TierDetails = {
  fee: "25000",
  directBenefit: "2% Commission",
  referralBenefit: "1% Commission",
};

const bronzeDetails: TierDetails = {
  fee: "10000",
  directBenefit: "1% Commission",
  referralBenefit: "1% Commission",
};

const basicDetails: TierDetails = {
  fee: "Free",
  directBenefit: "1% Commission",
  referralBenefit: "None",
};

const details: Record<string, TierDetails> = {
  Platinum: platinumDetails,
  Gold: goldDetails,
  Silver: silverDetails,
  Bronze: bronzeDetails,
  Basic: basicDetails,
};

export const getTierDetails = (value: string) => details[value];

const tierPrice: Record<string, number> = {
  Platinum: 10000000,
  Gold: 5000000,
  Silver: 2500000,
  Bronze: 1000000,
  Basic: 0,
};

export const getTierPrice = (value: string) => tierPrice[value];

export const tierList = [
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
