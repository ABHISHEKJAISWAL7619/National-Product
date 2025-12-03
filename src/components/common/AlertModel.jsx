"use client";

import { Button } from "./Button";

export const AlertModal = ({
  icon = "ℹ️",
  title = "Confirmation",
  message = "Are you sure you want to proceed?",
  buttons = [
    {
      text: "Cancel",
      onClick: () => {},
      colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    },
    {
      text: "Delete",
      onClick: () => {},
      colorClass: "bg-red-600 text-white hover:bg-red-700",
    },
  ],
  width = "max-w-md",
  bgColor = "bg-white",
  iconColor = "text-gray-600 bg-grey-600 text-4xl",
}) => {
  return (
    <div
      className={`mx-auto w-[90%] ${width} rounded-2xl ${bgColor} p-6 shadow-xl md:w-full md:p-8`}
    >
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconColor} md:h-14 md:w-14`}
      >
        {icon}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
        {title}
      </h2>

      <p className="mt-2 text-xs text-gray-500 md:text-sm">{message}</p>

      {buttons.length > 0 && (
        <div
          className={`mt-6 grid gap-2`}
          style={{ gridTemplateColumns: `repeat(${buttons.length}, 1fr)` }}
        >
          {buttons.map((btn, index) => (
            <Button
              key={index}
              onClick={btn.onClick}
              className={`w-full rounded-full cursor-pointer border transition ${btn.colorClass}`}
            >
              {btn.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
