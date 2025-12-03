import React from "react";
import { Check } from "lucide-react";
import Generalinput from "@/components/atoms/Generalinput";
import Geninput from "@/components/atoms/Geninput";

const General = () => {
  const arr = [
    { title: "Name", placeholder: "Tin" },
    { title: "UID", placeholder: "12345" },
    { title: "Category", placeholder: "Raw" },
    { title: "Composition", placeholder: "No" },
  ];

  return (
    <div className="bg-white border-l border-r border-gray-100">
      <div className="flex  flex-col md:flex-col lg:flex-row ml-5 pt-5 gap-5 lg:gap-0 lg:w-[671px]">
        {/* Left Side - General Inputs */}
        <div className="flex flex-col gap-2">
          <h1 className="font-inter font-semibold text-[18px] leading-[100%] mb-5 tracking-[0.3px]">
            General
          </h1>
          {arr.map((item, i) => (
            <Geninput
              key={i}
              title={item.title}
              placeholder={item.placeholder}
            />
          ))}
        </div>

        {/* Right Side - Item Type */}
        <div className="w-full lg:w-[210px] h-[210px] lg:ml-[7.5rem] gap-[15px] mt-5 lg:mt-1 flex-none">
          <h1 className="font-inter font-semibold text-[18px] leading-[100%] tracking-[0.3px]">
            Item Type
          </h1>

          <div className="flex items-center gap-12 mt-7">
            <p className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
              Inventory Item
            </p>
            <Check className="bg-blue-950 text-white" />
          </div>

          <div className="flex items-center gap-12 mt-5">
            <p className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
              Purchase Item
            </p>
            <Check className="bg-blue-950 text-white" />
          </div>

          <div className="flex items-center gap-12 mt-5">
            <p className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
              Sales Item
            </p>
            <div className="h-[25px] w-[25px] border border-gray-300 ml-7"></div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <p className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
              Production Item
            </p>
            <div className="h-[25px] w-[25px] border border-gray-300 ml-7"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
