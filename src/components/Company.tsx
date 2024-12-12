"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useInView, motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  order?: string;
  title: string;
  content: string;
  children: React.ReactNode;
  imgPath: string | StaticImport;
};

const Company = ({ order, title, content, children, imgPath }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.section ref={ref} className="overflow-hidden">
      <div
        className={`container ${
          order ? order : "company--box"
        } bg-white rounded-3xl grid overflow-hidden`}
      >
        <div className="">{children}</div>
        <div
          className={`${
            order ? "md:order-first" : ""
          } company--box-article py-[4.5rem] md:py-[8.5rem] md:px-[3.375rem]`}
        >
          <article className="space-y-4 md:space-y-[1.3125rem]">
            <div className="flex gap-4">
              <div className="relative">
                <Image
                  alt={title + " logo"}
                  width={100}
                  height={100}
                  src={imgPath}
                />
              </div>
              <h2
                style={{
                  transform: isInView ? "none" : "translateY(30px)",
                  opacity: isInView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
                className="font-semibold uppercase text-[2rem] leading-[2.5rem] tracking-[3.3px] w-[19.875rem] md:text-[2.5rem] md:leading-[3rem] md:tracking-[4.17px]"
              >
                {title}
              </h2>
            </div>
            <p
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
              className="font-normal text-[#101010]  text-[0.9375rem] leading-[1.5625rem]"
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
            className="hover:bg-[#ff5c00] hover:text-white w-[9.625rem] h-[2.875rem] rounded-3xl border text-[#ff5c00] border-[#ff5c00] font-bold mt-12"
          >
            Get started now
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Company;
