import React from "react";
import Image from "next/image";
import Company from "./Company";
import shoppingCart from "../../public/shopping-cart.png";
import salesLogo from "../../public/sales-icon.png";
import consultingLogo from "../../public/consulting-icon.png";
import logisticsIcon from "../../public/logistics-icon.png";
import advertisingIcon from "../../public/advertising.png";
import realEstateIcon from "../../public/real-estate.png";

const Companies = () => {
  return (
    <section className="grid gap-16">
      <Company
        title="emm-fort nigeria"
        content="Pioneering e-commerce in Nigeria with a curated 
selection of quality grocery products, 
delivered swifty to your doorstep."
      >
        <Image
          alt="shooping-cart logo"
          src={shoppingCart}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </Company>
      <Company
        title="EMM-Fort Affiliate Sales"
        content="Unlocking new revenue streams for individuals and 
businesses through our innovative 
affiliate marketing programs."
        order="company--box-even"
      >
        <Image
          alt="sales logo"
          src={salesLogo}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </Company>
      <Company
        title="EMM-Fort Consulting"
        content="Expert advisors empowering businesses to achieve
remarkable growth, through strategic guidance
and tailored solutions."
      >
        <Image
          alt="consulting logo"
          src={consultingLogo}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </Company>
      <Company
        title="EMM-Fort Logistics"
        content="Streamlining global supply chains with efficient
reliable, and tech driven logistics solutions."
        order="company--box-even"
      >
        <Image
          alt="consulting logo"
          src={logisticsIcon}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </Company>
      <Company
        title="EMM-Fort Advertising"
        content="Crafting creative, impactful campaigns that drives
business success, through innovative story-telling
and strategic medial planning.
"
      >
        <Image
          alt="consulting logo"
          src={advertisingIcon}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </Company>
      <Company
        title="EMM-Fort Realty"
        content="Revolutionizing Nigeria’s property landscape with
innovative developments, flexible rental and lease 
options, and seamless purchase experience."
        order="company--box-even"
      >
        <Image
          alt="consulting logo"
          src={realEstateIcon}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </Company>
      <div className="container flex flex-col md:flex-row gap-4 justify-between pb-16">
        <p className="font-bold text-4xl">Ready to get started?</p>
        <button className="bg-black text-white w-[9.625rem] h-[2.875rem] rounded-3xl hover:border hover:text-black hover:bg-white hover:border-black">
          Contact us
        </button>
      </div>
    </section>
  );
};

export default Companies;