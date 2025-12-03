import React from "react";

const Geninput = ({ title, type = "text", placeholder }) => {
  return (
    <div className="w-full">
      <div className="w-[262px] h-[35px] flex justify-between items-center opacity-100">
        {/* Label */}
        <span className="font-inter font-medium text-[14px] leading-[100%] tracking-[0.3px]">
          {title}
        </span>

        {/* Input */}
        <div className="w-[86px] h-[35px] opacity-100 border border-gray-300 rounded-[2px] flex items-center">
          <input
            type={type}
            placeholder={placeholder}
            className="w-full h-full font-inter  font-medium text-[14px] leading-[100%] tracking-[0.3px]  text-center  placeholder:text-center  outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Geninput;
