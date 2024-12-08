import React from "react";

const Banner = () => {
  return (
    <section className="h-[25rem] banner">
      <div className="container flex flex-col gap-6 banner-wrapper items-center h-full justify-center">
        <h1 className="font-semibold text-3xl  text-center">
          Introducing EMM-Fort Group of Companies <br />A Global Conglomerate
          Driving Innovation and Growth
        </h1>
        <p className="text-[#1f1f1f] banner-wrapper_text text-center font-normal">
          our diverse portfolio of companies is transforming industries and
          improving lives worldwide. Meet our dynamic subsidiaries
        </p>
        <button className="bg-black text-white w-[9.625rem] h-[2.875rem] rounded-3xl hover:border hover:text-black hover:bg-white hover:border-black">
          Ask me{" "}
        </button>
      </div>
    </section>
  );
};

export default Banner;
