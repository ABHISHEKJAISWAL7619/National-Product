import React from "react";
import { Check } from "lucide-react";
import Generalinput from "@/components/atoms/Generalinput";
import Geninput from "@/components/atoms/Geninput";

const Stock = () => {
  const arr = [
    { title: "Quanitity In Hand", placeholder: "1200" },
    { title: "Minimum Stock Level", placeholder: "120" },
    { title: "Maximum Stock Level", placeholder: "1500" },
  ];

  return (
   <div className="bg-white border-l border-r border-gray-100">
     <div className="flex  flex-col md:flex-col lg:flex-row ml-5 pt-5 gap-5 lg:gap-0 lg:w-[571px]">
      {/* Left Side - Stock Inputs */}
      <div className="flex flex-col gap-2">
        <h1 className="font-inter font-semibold mb-5 text-[18px] leading-[100%] tracking-[0.3px]">
          Stock
        </h1>
         {arr.map((item, i) => (
        <Geninput
          key={i}
          title={item.title}
          placeholder={item.placeholder}
        />
      ))}
      </div>

      {/* Right Side - Unit Section */}
      <div className="w-full lg:w-[210px] lg:flex-none h-[210px] lg:ml-30 gap-[15px] mt-5 lg:mt-1">
        <h1 className="font-inter font-semibold text-[18px] leading-[100%] tracking-[0.3px]">
          Unit
        </h1>

        <div className="flex items-center gap-12 mt-7">
          <p className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
            Kg
          </p>
          <Check className="bg-blue-950 text-white ml-21" />
        </div>

        <div className="flex items-center gap-12 mt-5">
          <p className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
            Pcs
          </p>
          <div className="h-[25px] w-[25px] border border-gray-300 ml-19"></div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Stock;
