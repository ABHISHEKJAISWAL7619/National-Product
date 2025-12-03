"use client";
import React from "react";

const Input = ({ leftLabel, rightLabel }) => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-4 mb-4 w-full">
      {/* Left Metal */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2 w-full md:w-1/2 mb-2 md:mb-0">
        <label className="font-inter font-medium text-[16px] leading-[24px] tracking-[0px] md:w-36">
          {leftLabel}
        </label>
        <div className="flex items-center border border-gray-300 shadow bg-gray-100 px-2  rounded-sm w-full md:w-[160px] h-[56px] lg:ml-5 mb-2 md:mb-0">
          <input
            type="text"
            defaultValue="0.00"
            className="w-full h-full text-[#5C738A]  px-3 text-left focus:outline-none focus:border-blue-500"
          />
          <span className="flex items-center justify-center w-12 h-full  text-gray-700 text-sm">
            %
          </span>
        </div>
        <div className="flex items-center border border-gray-300 shadow bg-gray-100 px-2 lg:ml-10 rounded-sm w-full md:w-[160px] h-[56px]">
          <input
            type="text"
            defaultValue="0.00"
            className="w-full h-full text-[#5C738A] px-3 text-left focus:outline-none focus:border-blue-500"
          />
          <span className="flex items-center justify-center w-[64px] h-full   text-[#5C738A] text-sm font-medium">
            Value
          </span>
        </div>
      </div>

      {/* Right Metal */}
      {rightLabel && (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 w-full md:w-1/2">
          <label className="font-inter font-medium text-[16px] leading-[24px] tracking-[0px] md:w-36">
            {rightLabel}
          </label>
          <div className="flex items-center border border-gray-300 rounded-sm shadow bg-gray-100 w-full md:w-[160px] h-[56px] px-2 mb-2  lg:ml-5 md:mb-0">
            <input
              type="text"
              defaultValue="0.00"
              className="w-full h-full text-[#5C738A]  px-3 text-left focus:outline-none focus:border-blue-500"
            />
            <span className="flex items-center justify-center w-12 h-full  text-[#5C738A] text-sm">
              %
            </span>
          </div>
          <div className="flex items-center border border-gray-300 rounded-sm shadow px-2 lg:ml-10 bg-gray-100 w-full md:w-[160px] h-[56px]">
            <input
              type="text"
              defaultValue="0.00"
              className="w-full h-full text-[#5C738A] px-3 text-left focus:outline-none"
            />
            <span className="flex items-center justify-center w-[64px] h-full  text-[#5C738A] text-sm font-medium">
              Value
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
