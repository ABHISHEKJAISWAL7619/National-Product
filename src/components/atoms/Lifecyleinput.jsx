import React from "react";
import clsx from "clsx";

const Lifecyleinput = ({
  label,
  type = "text",
  placeholder,
  bordercolor = "border-gray-300",
 
}) => {
  return (
    <div className="w-full mb-5">
      
      <div
        className="
          flex flex-col sm:flex-row sm:items-center sm:justify-between 
          gap-2 sm:gap-6 md:gap-10
          w-full sm:w-[300px] md:w-[316px]
        "
      >
        {/* Label */}
        <span
          className="
            font-inter font-medium text-[13px] sm:text-[14px] md:text-[14px]
            leading-[100%] tracking-[0.3px] text-gray-800
            w-full sm:w-[110px] md:w-[120px]
            mt-2  
            text-left
          "
        >
          {label}
        </span>

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(
            "font-inter font-medium text-[13px] sm:text-[14px] md:text-[14px]",
            "leading-[100%] tracking-[0.3px] text-left",
            "border  rounded-md",
            "  h-[35px] sm:h-[35px] md:h-[35px]",
            "   w-full sm:w-[130px] md:w-[140px]",
            " pl-2 mt-1",
            " focus:outline-none focus:ring-2 focus:ring-blue-500",
            bordercolor
          )}
        />
      </div>
    </div>
  );
};

export default Lifecyleinput;
