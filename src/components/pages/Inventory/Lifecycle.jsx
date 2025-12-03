import React from "react";
import Lifecyleinput from "@/components/atoms/Lifecyleinput";

const Lifecycle = () => {
  const arr = [
    { label: "Item Status", placeholder: "Active" },
    { label: "Date Added", placeholder: "12/10/2024" },
    { label: "Last Updated", placeholder: "06/08/2025" },
  ];

  return (
    <div className="bg-white">
      <div className="ml-5  flex flex-col lg:flex-row gap-5">
      {/* Left Column */}
      <div className="flex-1">
        <h1 className="font-inter font-semibold text-[18px] leading-[100%] tracking-[0.3px] mb-5">
          Lifecycle & Tracking
        </h1>
        <div className="flex flex-col">
          {arr.map((item, i) => (
            <Lifecyleinput
              key={i}
              label={item.label}
              placeholder={item.placeholder}
              bordercolor="border-gray-300"
            />
          ))}
        </div>
      </div>
      <div className="flex-1 w-full lg:w-auto"></div>
    </div>
    </div>
  );
};

export default Lifecycle;
