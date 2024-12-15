import TierForm from "./form";

export default async function Page() {
  return (
    <section className="container py-12 flex justify-center">
      <div className="bg-white w-[30rem] py-8 px-4 rounded-lg space-y-4">
        <h1 className="text-3xl font-semibold">Select a tier</h1>
        <TierForm />
      </div>
    </section>
  );
}
