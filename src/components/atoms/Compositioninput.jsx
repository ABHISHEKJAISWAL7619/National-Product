"use client";
import React from "react";

const Compositioninput = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  actionIcon: ActionIconComponent,
  value,
  onChange,
  showCheckbox = false,
  checked = false,
  onCheckboxChange,
  error,
  ...props
}) => {
  const hasActionIcon = !!ActionIconComponent;
  const hasLeftIcon = !!icon;

  return (
    <div className="flex flex-col gap-2 mb-2 w-full">
      {label && (
        <div className="flex items-center gap-2">
          <label
            className="text-sm font-inter font-medium text-gray-700"
            htmlFor={name}
          >
            {label}
          </label>

          {showCheckbox && (
            <input
              type="checkbox"
              checked={checked}
              onChange={onCheckboxChange}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          )}
        </div>
      )}

      <div className="relative flex items-center w-full rounded-md bg-white focus-within:ring-2 focus-within:ring-gray-200">
        {hasLeftIcon && (
          <i
            className={`${icon} absolute left-2 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none`}
          ></i>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-[448px] h-[56px] rounded-md font-poppins font-medium shadow border border-gray-200 placeholder-gray-400 focus:outline-none
            ${hasLeftIcon ? "pl-8" : "pl-4"}
            ${hasActionIcon ? "pr-8" : "pr-2"}
          `}
          {...props}
        />

        {hasActionIcon && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {typeof ActionIconComponent === "string" ? (
              <img src={ActionIconComponent} alt="icon" className="w-6 h-6" />
            ) : (
              <ActionIconComponent />
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Compositioninput;
