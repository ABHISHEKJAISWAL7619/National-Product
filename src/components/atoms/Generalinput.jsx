import React from "react";

const Generalinput = ({ title, type = "text", placeholder }) => {
  return (
    <div className="w-full">
      <div
        className="
          flex flex-col sm:flex-row sm:items-center sm:justify-between
          gap-2 sm:gap-3 mt-3
        "
      >
        {/* Label */}
        <span
          className="
            font-inter font-medium text-[13px] sm:text-[14px] md:text-[14px]
            leading-[100%] tracking-[0.3px] text-gray-800
            w-full sm:w-[180px] md:w-[262px]
            text-left sm:text-left
          "
        >
          {title}
        </span>

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          className="
            font-inter font-medium text-[13px] sm:text-[14px] md:text-[14px]
            leading-[100%] tracking-[0.3px] text-center
            border border-gray-300 rounded-md
            h-[32px] sm:h-[35px] md:h-[35px]
            w-full sm:w-[100px] md:w-[86px]
            mt-1 sm:mt-0
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>
    </div>
  );
};

export default Generalinput;


