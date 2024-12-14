import React from "react";

const SignupForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2 md:space-y-4 overflow-y-scroll max-h-80">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="uppercase">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter full name"
            className="border py-3 px-4 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="uppercase">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            className="border py-3 px-4 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="uppercase">
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
          <label htmlFor="phoneNumber" className="uppercase">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            className="border py-3 px-4 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="referral" className="uppercase">
            referral (optional)
          </label>
          <input
            id="referral"
            name="referral"
            type="text"
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
            className="border py-3 px-4 rounded-lg"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <button
        type="submit"
        className="py-3 w-full bg-[#ff5c00] text-white capitalize rounded-lg hover:opacity-40"
      >
        signup
      </button>
    </form>
  );
};

export default SignupForm;
