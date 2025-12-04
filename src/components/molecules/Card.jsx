"use client";
import Image from "next/image";

export default function Card({
  title = "Title",
  value = 0,
  total = "",
  progressColor = "bg-yellow-500",
  bgColor = "bg-gray-200",
  footerText = "",
  footerIconColor = "text-success",
  customProgressWidth = "0%",
}) {
  return (
    <div className="w-full shadow-sm bg-white border text-black border-gray-100 p-5 rounded-md flex flex-col gap-5">
      <h2 className="font-inter font-medium text-[18px] flex items-center gap-2">
        {title}
      </h2>

      <div>
        <p className="font-archivo font-bold text-black text-[36px] leading-[40px] tracking-[1px]">
          {value.toLocaleString()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: customProgressWidth }}
        />
      </div>

      {/* Hide Footer if empty */}
      {footerText && (
        <div
          className={`flex items-center gap-1 ${footerIconColor} text-sm font-medium`}
        >
          <Image src="/img/arrow.png" height={9} width={15} alt="arrow.png" />
          <span className="font-inter text-[14px] text-green-500">
            {footerText}
          </span>
        </div>
      )}
    </div>
  );
}
