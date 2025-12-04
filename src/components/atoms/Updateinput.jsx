import React from "react";
import clsx from "clsx";

const Updateinput = ({
  label,
  type,
  placeholder,
  options = [],
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2 mb-8 w-full sm:w-full md:w-full lg:w-[448px]">
      {/* Label */}
      {label && (
        <span className="text-md text-black font-semibold mb-1">{label}</span>
      )}

      {/* Select Input */}
      {type === "select" ? (
        <select
          {...rest}
          className={clsx(
            "h-[56px] w-full font-inter font-normal rounded-lg text-[16px] leading-6 tracking-[0px] px-3",
            "bg-gray-100 text-black placeholder-black",
            "transition-all duration-200 ease-in-out outline-none",
            error
              ? "border border-red-400 ring-2 ring-red-300 focus:ring-red-500"
              : "border border-gray-300 focus:ring-2 focus:ring-gray-200",
            className
          )}
          defaultValue=""
        >
          <option value="" disabled className="text-black">
            {placeholder}
          </option>

          {options.map((option, idx) => (
            <option key={idx} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
      ) : (
        // Regular Input
        <input
          {...rest}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "h-[56px] w-full rounded-lg font-sans font-normal shadow text-base leading-6 tracking-normal px-3",
            "bg-gray-100 text-black placeholder-black",
            "transition-all duration-200 ease-in-out outline-none",
            error
              ? "border border-red-400 ring-2 ring-red-300 focus:ring-red-500"
              : "border border-gray-300 focus:ring-2 focus:ring-gray-200",
            className
          )}
        />
      )}

      {/* Error Message */}
      {error && (
        <span className="text-sm text-red-500 font-medium mt-1">{error}</span>
      )}
    </div>
  );
};

export default Updateinput;
