import React from "react";

const FinancialInputField = ({ title, type, placeholder, description }) => {
  return (
    <div className="flex  flex-col md:flex-row md:items-start mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:w-[150px] md:mr-8 mb-2 md:mb-0">
        <span className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px] whitespace-nowrap mb-1 md:mb-0">
          {title}
        </span>

        <span className="md:hidden text-red-500 font-inter font-medium text-[12px] leading-[100%] tracking-[0.3px]">
          ( {description} )
        </span>
      </div>

      <input
        type={type}
        defaultValue={placeholder}
        className="w-full h-[35px] md:w-[140px] rounded-[2px] border px-2 text-sm text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
      />

      <span className="hidden md:block ml-4 mt-2 text-red-500 font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px] whitespace-nowrap">
        ( {description} )
      </span>
    </div>
  );
};

export default FinancialInputField;
