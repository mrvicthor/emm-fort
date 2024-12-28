"use client";
import React, { useActionState } from "react";
import Link from "next/link";
import { login } from "../actions/auth";
import { LoginActionResponse } from "../lib/definitions";

const initialState: LoginActionResponse = {
  success: false,
  message: "",
};
const LoginForm = () => {
  const [state, action, pending] = useActionState(login, initialState);
  return (
    <form action={action} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter email address"
          className={`border py-3 px-4 rounded-lg ${
            state.errors?.email && "border-red-500"
          }`}
          required
        />
      </div>
      {state.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className={`border py-3 px-4 rounded-lg ${
            state.errors?.password && "border-red-500"
          }`}
          placeholder="Enter your password"
          required
        />
      </div>
      {state.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

      {state?.message && (
        <div
          className={`${
            state.success ? "border-green-500" : "border-red-500"
          } border py-3 px-4 rounded-lg `}
        >
          {state.success && (
            <span className="material-symbols-outlined text-green-500 flex">
              check_circle
            </span>
          )}
          <p className="text-red-500">{state.message}</p>
        </div>
      )}
      <div className="text-right">
        <Link href="/forgot-password" className="text-[#ff5c00]">
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="py-3 w-full bg-[#ff5c00] text-white capitalize rounded-lg hover:opacity-40"
      >
        {pending ? "submitting..." : "login"}
      </button>
    </form>
  );
};

export default LoginForm;
