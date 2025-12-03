"use client";

import { fetchalldispatch } from "@/redux/slice/dispatch-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getStatusClasses = (status) => {
  switch (status) {
    case "Completed":
      return "font-inter text-green-600 font-semibold";
    case "Pending":
      return "font-inter text-yellow-500 font-semibold";
    case "In Transit":
      return "font-inter text-blue-500 font-semibold";
    default:
      return "font-inter text-gray-700";
  }
};

const Dispatch = () => {
  const dispatch = useDispatch();
  const { dispatchList } = useSelector((state) => state.dispatch);

  useEffect(() => {
    dispatch(fetchalldispatch({ filters: {} }));
  }, [dispatch]);

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-1 py-6 bg-gray-50">
      <div className="w-full max-w-[1300px] bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6">
          <h2 className="font-archivo font-bold text-[25px] leading-[28px] text-gray-800">
            Recent Dispatch Logs
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-md">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 font-inter font-medium py-3 text-left w-[15%]">
                  INVOICENO
                </th>
                <th className="px-4 font-inter font-medium py-3 text-left w-[25%]">
                  Customer
                </th>
                <th className="px-4 font-inter font-medium py-3 text-left w-[15%]">
                  Items
                </th>

                <th className="px-4 font-inter font-medium py-3 text-left w-[20%]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dispatchList?.slice(0, 5).map((log) => (
                <tr
                  key={log._id}
                  className="hover:bg-gray-50 transition duration-100"
                >
                  <td className="px-4 py-2 font-inter font-medium text-gray-700">
                    {log.invoiceNo}
                  </td>
                  <td className="px-4 py-2 font-inter text-gray-700">
                    {log.customer
                      ? `${log.customer.firstName} ${log.customer.lastName}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 font-inter text-gray-700">
                    {log.items?.length} {/* first 5 items count */}
                  </td>
                  <td className="px-4 py-2 font-inter text-gray-700">
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col space-y-3 px-4 pb-4">
          {dispatchList?.map((log) => (
            <div
              key={log._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">ID:</span>
                <span className="text-gray-700 font-semibold">
                  {log.invoiceNo}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 font-medium">Customer:</span>
                <span className="text-gray-700">
                  {log.customer
                    ? `${log.customer.firstName} ${log.customer.lastName}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 font-medium">Items:</span>
                <span className="text-gray-700">
                  {log.items?.slice(0, 5).length}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 font-medium">Status:</span>
                <span className={getStatusClasses(log.status || "Pending")}>
                  {log.status || "Pending"}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 font-medium">Date:</span>
                <span className="text-gray-700">
                  {new Date(log.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
