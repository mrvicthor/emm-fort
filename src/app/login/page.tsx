import Link from "next/link";
import LoginForm from "./form";

export default function Page() {
  return (
    <section className="flex items-center h-screen w-screen justify-center gap-6 px-4">
      <div className="bg-white w-[30rem] rounded-lg px-4 py-6 space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="material-symbols-outlined text-[#ff5c00]">
              chevron_backward
            </span>
          </Link>
          <h1 className="font-bold text-3xl capitalize">login</h1>
        </div>
        <p className="text-[#101010] opacity-40">
          Add your details below to log in to the app
        </p>
        <LoginForm />

        <p className="text-center">
          Don&apos;t have an account?
          <Link className="text-[#ff5c00] pl-1" href="/signup">
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}
