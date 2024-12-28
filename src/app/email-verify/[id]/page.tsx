import { verifyEmail } from "@/app/actions/auth";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { user } = await verifyEmail(id);
  return (
    <section className="flex flex-col items-center mt-20">
      <div className="w-[30rem] flex flex-col gap-4">
        <div
          className={`${
            user ? "border-green-500" : "border-red-500"
          } border py-3 px-4 rounded-lg `}
        >
          {user ? (
            <span className="material-symbols-outlined text-green-500 flex">
              check_circle
            </span>
          ) : (
            <span className="material-symbols-outlined text-red-500">
              error
            </span>
          )}
          <p className={`${user ? "text-green-500" : "text-red-500"}`}>
            {user ? "Email verified." : "Invalid link or code may have expired"}
          </p>
        </div>
        <Link href="/" className="text-center text-white">
          Go back to home
        </Link>
      </div>
    </section>
  );
}
