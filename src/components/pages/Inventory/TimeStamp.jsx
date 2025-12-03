"use client";
import React, { useState } from "react";
import { ledgerData } from "../../../../public/db/Table.json";

const TimeStamp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = ledgerData.filter(
    (item) =>
      item.transaction_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batch.includes(searchTerm) ||
      item.item.includes(searchTerm)
  );
  const tableHeaders = [
    { key: "time_stamp", label: "Time Stamp" },
    { key: "transaction_type", label: "Transaction Type" },
    { key: "batch", label: "Batch" },
    { key: "item", label: "Item" },
    { key: "percent_used", label: "% Used" },
    { key: "qty_in", label: "Qty In" },
    { key: "qty_out", label: "Qty Out" },
    { key: "balance", label: "Balance" },
  ];

  return (
    <div className="w-full font-inter">
      <div className="w-full bg-white rounded-xl">
        <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-inter font-medium text-[14px] leading-[21px] tracking-[0px] whitespace-nowrap"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50/50 transition duration-150"
                  >
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.time_stamp}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.transaction_type}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.batch}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.item}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.percent_used}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.qty_in}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.qty_out}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-inter font-medium text-[14px] leading-[21px] text-[#003566] whitespace-nowrap">
                      {item.balance}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8} 
                    className="px-6 py-8 text-center text-gray-500 text-base"
                  >
                    No transactions found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeStamp;
