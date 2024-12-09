import React from "react";
// import Image from "next/image";
// import chatIcon from "../../public/comment-icon.png";

const Banner = () => {
  return (
    <section className="h-[35rem] md:h-screen banner">
      <div className="container flex flex-col gap-8 md:gap-16 banner-wrapper items-center h-full justify-center">
        <h1 className="font-bold text-3xl md:text-5xl  text-center md:leading-[3.5rem]">
          Introducing EMM-Fort Group of Companies <br />A Global Conglomerate
          Driving Innovation and Growth
        </h1>
        <p className="text-[#1f1f1f] banner-wrapper_text text-center font-normal text-lg">
          Our diverse portfolio of companies is transforming industries and
          improving lives worldwide. Meet our dynamic subsidiaries
        </p>
        <button className="bg-black text-white w-[9.625rem] h-[2.875rem] rounded-3xl hover:border hover:text-black hover:bg-white hover:border-black">
          Ask me
        </button>
      </div>
    </section>
  );
};

export default Banner;
