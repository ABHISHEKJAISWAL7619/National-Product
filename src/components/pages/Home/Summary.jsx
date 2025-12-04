"use client";
import Image from "next/image";
import React from "react";

const Summary = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 w-full max-w-[1230px] border border-gray-200 rounded-md shadow-sm bg-white px-2 sm:px-6 py-3 mx-auto mt-8">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <p className="font-archivo text-black font-bold text-[25px] leading-[28px] tracking-normal">
          Summary Report
        </p>
        <Image
          src="/img/Summary.png"
          alt="Summary"
          width={22}
          height={20}
          className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
        />
      </div>

      {/* Right Section (Button) */}
      <button className="flex items-center justify-center gap-2 bg-[#002D62] hover:bg-[#003b85] text-white font-inter font-bold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] px-4 lg:px-6 sm:px-5 py-3 rounded-md transition-all duration-200 shadow-sm w-full sm:w-auto">
        <span className="tracking-[1px]">Download Report</span>
        <Image
          src="/img/download.png"
          alt="Download"
          width={20}
          height={20}
          className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
        />
      </button>
    </div>
  );
};

export default Summary;
