import React from "react";

const CreateItem = () => {
  return (
    <div className="w-full bg-white border  border-gray-100 shadow">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 md:px-10 py-3 gap-3">
        <div className="w-full md:w-auto">
          <h1 className="font-archivo font-semibold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[0px] text-gray-800">
            Item Name: #12345 (Tin)
          </h1>
        </div>

        <div className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-between md:justify-end gap-3 sm:gap-8 font-inter text-[14px] sm:text-[16px] leading-[21px]">
            <li className="bg-blue-950 text-white px-3 py-1 rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-blue-900">
              General
            </li>
            <li className="text-gray-700 font-medium mt-1 cursor-pointer hover:text-blue-900 transition-all duration-200">
              Stock
            </li>
            <li className="text-gray-700 font-medium mt-1 cursor-pointer hover:text-blue-900 transition-all duration-200">
              Tracking
            </li>
            <li className="text-gray-700 font-medium cursor-pointer hover:text-blue-900 transition-all mt-1 duration-200">
              Financial
            </li>
            <li className="text-white px-3 rounded-md py-1 bg-blue-950 font-medium cursor-pointer hover:text-blue-900 transition-all duration-200">
              Save
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
