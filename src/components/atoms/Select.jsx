"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  label = "",
  options = [],
  optionValue = "value",
  text = "label",
  value = "",
  placeholder = "Select",
  onChange,
  error = "",
  className = "",
  id,
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={`text-dark h-[45px] w-full rounded-sm px-3 pr-10 text-sm 
            transition-all duration-300 ease-in-out outline-none cursor-pointer 
            ${
              error
                ? "border border-red-400 ring-2 ring-red-300 focus:ring-red-500"
                : "border border-gray-200 focus:ring-2 focus:ring-gray-200"
            }
            ${className}`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((opt, i) => (
            <option key={i} value={opt[optionValue] ?? opt}>
              {opt[text] ?? opt}
            </option>
          ))}
        </select>

        {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown size={18} />
        </div> */}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
