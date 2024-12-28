import { getUser } from "@/app/lib/dal";
import Tier from "../_components/Tiers";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  const userTier = user._doc.tier;

  if (userTier) {
    redirect("/dashboard");
  }

  return <Tier />;
}
