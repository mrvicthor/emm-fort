import { formatCurrency, TierDetails as TierProps } from "@/helpers";

const TierDetails = ({ fee, directBenefit, referralBenefit }: TierProps) => {
  return (
    <ul className="space-y-3 list-disc text-white opacity-50 px-4">
      <li className="font-light text-sm">
        Fee: {fee === "Free" ? fee : formatCurrency(Number(fee))}
      </li>
      <li className="font-light text-sm">Direct Benefit: {directBenefit}</li>
      <li className="font-light text-sm">
        Referral Benefit: {referralBenefit}
      </li>
    </ul>
  );
};

export default TierDetails;
