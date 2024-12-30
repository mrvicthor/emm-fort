"use client";
import React, { useActionState } from "react";
import { signup } from "../actions/auth";
import { SignupActionResponse } from "../lib/definitions";

const initialState: SignupActionResponse = {
  success: false,
  message: "",
};

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2 md:space-y-4 overflow-y-scroll max-h-80">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="uppercase">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={state.inputs?.name}
            placeholder="Enter full name"
            className={`border py-3 px-4 rounded-lg ${
              state.errors?.name && "border-red-500"
            }`}
            required
          />
        </div>
        {state.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="uppercase">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={state.inputs?.username}
            placeholder="Enter username"
            className={`border py-3 px-4 rounded-lg ${
              state.errors?.name && "border-red-500"
            }`}
            required
          />
        </div>
        {state.errors?.username && (
          <p className="text-red-500">{state.errors.username}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="uppercase">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            defaultValue={state.inputs?.email}
            placeholder="Enter email address"
            className={`border py-3 px-4 rounded-lg ${
              state.errors?.name && "border-red-500"
            }`}
            required
          />
        </div>
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="uppercase">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            defaultValue={state.inputs?.phoneNumber}
            placeholder="Enter phone number"
            className={`border py-3 px-4 rounded-lg ${
              state.errors?.name && "border-red-500"
            }`}
            required
          />
        </div>
        {state.errors?.phoneNumber && (
          <p className="text-red-500">{state.errors.phoneNumber}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="referral" className="uppercase">
            referral (optional)
          </label>
          <input
            id="referral"
            name="referral"
            type="text"
            defaultValue={state.inputs?.referral}
            placeholder="Enter referral"
            className="border py-3 px-4 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="uppercase">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            defaultValue={state.inputs?.password}
            className={`border py-3 px-4 rounded-lg ${
              state.errors?.password && "border-red-500"
            }`}
            placeholder="Enter your password"
          />
        </div>
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

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
          <p>{state.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="py-3 w-full bg-[#ff5c00] text-white capitalize rounded-lg hover:opacity-40"
      >
        {pending ? "submitting..." : "signup"}
      </button>
    </form>
  );
};

export default SignupForm;
