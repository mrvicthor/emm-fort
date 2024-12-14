import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter email address"
          className="border py-3 px-4 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border py-3 px-4 rounded-lg"
          placeholder="Enter your password"
        />
      </div>
      <div className="text-right">
        <Link href="/forgot-password" className="text-[#ff5c00]">
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="py-3 w-full bg-[#ff5c00] text-white capitalize rounded-lg hover:opacity-40"
      >
        login
      </button>
    </form>
  );
};

export default LoginForm;
