import Link from "next/link";
import TierForm from "./form";

export default async function Page() {
  return (
    <section className="container py-12 flex justify-center">
      <div className="bg-white w-[30rem] py-8 px-4 rounded-lg space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="material-symbols-outlined text-[#ff5c00]">
              chevron_backward
            </span>
          </Link>
          <h1 className="text-3xl font-semibold">Choose tier</h1>
        </div>
        <TierForm />
      </div>
    </section>
  );
}
