"use client";
import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";

type Props = {
  order?: string;
  title: string;
  content: string;
  children: React.ReactNode;
};

const Company = ({ order, title, content, children }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.section ref={ref}>
      <div
        className={`container ${
          order ? order : "company--box"
        } bg-white rounded-3xl grid overflow-hidden`}
      >
        <div>{children}</div>
        <div
          className={`${
            order ? "md:order-first" : ""
          } company--box-article py-[4.5rem] pr-6 pl-[2.0625rem] md:py-[8.5rem] md:px-[3.375rem]`}
        >
          <article className="space-y-4 md:space-y-[1.3125rem]">
            <h2
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
              className="font-semibold uppercase text-[2rem] leading-[2.5rem] tracking-[3.3px] w-[19.875rem] md:text-[2.5rem] md:leading-[3rem] md:tracking-[4.17px]"
            >
              {title}
            </h2>
            <p
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
              className="font-normal opacity-60 text-[0.9375rem] leading-[1.5625rem]"
            >
              {content}
            </p>
          </article>
          <button
            style={{
              transform: isInView ? "none" : "translateY(20px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
            className="bg-black text-white w-[9.625rem] h-[2.875rem] rounded-3xl hover:border hover:text-black hover:bg-white hover:border-black mt-[1.4375rem] md:mt-12"
          >
            Get started now
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Company;