"use client";
import React from "react";

const InputCate = ({ label, id, placeholder, readOnly }) => {
  return (
    <div className="flex flex-col mb-4 w-full md:w-[448px]">
      <label htmlFor={id} className="text-sm text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        readOnly={readOnly}
        className={`border border-gray-300 rounded-md px-3 py-2 w-full h-[56px] focus:outline-none ${
          readOnly ? "bg-gray-100" : "focus:ring-2 focus:ring-blue-500"
        }`}
      />
    </div>
  );
};

export default InputCate;
