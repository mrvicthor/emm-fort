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
