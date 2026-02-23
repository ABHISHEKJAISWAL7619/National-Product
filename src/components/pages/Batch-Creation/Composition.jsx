"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import newMockData from "../../../../public/db/CompositionTable";

const Dashboard = ({ size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const SquarePen = ({ size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
  </svg>
);

const TrashIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
  </svg>
);

const Composition = () => {
  const [items, setItems] = useState(newMockData.arr || []);

  const handleToggle = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === id
          ? {
              ...item,
              item04Status:
                item.item04Status === "Enabled" ? "Disabled" : "Enabled",
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete item ${id}?`)) {
      setItems((prev) => prev.filter((item) => item.productId !== id));
    }
  };

  return (
    <div className="w-full border-l border-r border-b border-gray-200 bg-white font-inter">
      <div className="flex mx-5  justify-between">
        <h1 className="font-inter font-semibold text-[18px] leading-[100%] tracking-[0.3px]">
          Composition
        </h1>
        <div className="bg-blue-950 px-3 py-2 flex gap-2 rounded-md text-white">
          <Dashboard />
          <button className="text-[]">Add Items</button>
        </div>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "SI No",
                "Category",
                "Sub Category",
                "Percentage",
                "Item 04",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.productId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-blue-950">{item.siNo}</td>

                <td className="px-6 py-4 text-sm text-blue-950">
                  {item.category}
                </td>

                <td className="px-6 py-4 text-sm text-blue-950">
                  {item.subCategory}
                </td>

                <td className="px-6 py-4 text-sm text-blue-950">
                  {item.percentage}
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="relative inline-block w-28">
                    <select
                      value={item.item04Status}
                      onChange={() => handleToggle(item.productId)}
                      className={`block w-full appearance-none border rounded-md py-1.5 pl-3 pr-8 text-sm leading-tight cursor-pointer ${
                        item.item04Status === "Enabled"
                          ? "bg-green-50 border-green-300 text-green-700"
                          : "bg-red-50 border-red-300 text-red-700"
                      }`}
                    >
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-950">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </td>

              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex justify-end mt-5 gap-5">
        <button className="bg-gray-200 px-2 py-1 rounded-md">Cancel</button>
        <button className="bg-blue-950 px-2 py-1 rounded-md text-white">Create Batch</button>
      </div> */}
    </div>
  );
};

export default Composition;
