import Link from "next/link";
import LoginForm from "./form";

export default function Page() {
  return (
    <section className="container flex items-center justify-center mt-16 gap-6">
      <div className="bg-white w-[30rem] rounded-lg px-4 py-6 space-y-4">
        <h1 className="font-bold text-3xl capitalize">login</h1>
        <p className="text-[#101010]">
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
