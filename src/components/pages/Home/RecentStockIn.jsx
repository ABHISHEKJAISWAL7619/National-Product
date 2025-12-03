"use client";
import { fetchincomings } from "@/redux/slice/incoming-slice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RecentStockIn = () => {
  const dispatch = useDispatch();
  const { incomingList = [] } = useSelector((state) => state.incoming);

  useEffect(() => {
    dispatch(fetchincomings({ filters: {} }));
  }, [dispatch]);

  return (
    <div className="flex justify-center px-3 sm:px-6 lg:px-1 w-full">
      <div className="w-full max-w-[1220px] bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border border-gray-200">
          <h2 className="font-archivo font-bold md:text-[25px]  sm:text-[20px] leading-[28px] text-gray-800">
            Recent Stock In Transactions
          </h2>
        </div>

        {/* Table for medium+ screens */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 font-inter font-medium py-3 text-left w-[15%]">
                  invoiceNo
                </th>
                <th className="px-4 font-inter font-medium py-3 text-left w-[25%]">
                  Item(s)
                </th>
                <th className="px-4 font-inter font-medium py-3 text-left w-[15%]">
                  Quantity
                </th>
                <th className="px-4 font-inter font-medium py-3 text-left w-[20%]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incomingList.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-gray-50 font-inter transition"
                >
                  <td className="px-4 py-2 text-gray-700 font-medium">
                    {tx.invoiceNo}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {tx.products
                      .map((p) => p.item?.productName || p.item?.name)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-2 text-left text-gray-700">
                    {tx.products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
                  </td>
                  <td className="px-4 py-2 text-left text-gray-700">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col space-y-3">
            {incomingList.map((tx) => (
              <div
                key={tx._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">ID:</span>
                  <span className="text-gray-700 font-semibold">
                    {tx.invoiceNo}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500 font-medium">Item(s):</span>
                  <span className="text-gray-700">
                    {tx.products
                      .map((p) => p.item?.productName || p.item?.name)
                      .join(", ")}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500 font-medium">Quantity:</span>
                  <span className="text-gray-700">
                    {tx.products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500 font-medium">Date:</span>
                  <span className="text-gray-700">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="p-4 sm:px-6 flex justify-center border-t border-gray-200">
          <Link href={"/incoming/stock-in"}>
            <button className="text-center cursor-pointer text-gray-600 w-full md:w-auto font-medium lg:px-125 text-sm py-2 px-6 border border-gray-300 hover:bg-gray-100 transition duration-150">
              View All Stock In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentStockIn;
