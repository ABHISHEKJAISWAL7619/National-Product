"use client";

import { fetchalldispatch } from "@/redux/slice/dispatch-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dispatch = () => {
  const dispatch = useDispatch();
  const { dispatchList } = useSelector((state) => state.dispatch);

  useEffect(() => {
    dispatch(fetchalldispatch({ filters: {} }));
  }, [dispatch]);

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-1 py-6 bg-gray-50">
      <div className="w-full max-w-[1300px] bg-white rounded-lg shadow-sm  -gray-100">
        {/* HEADER */}
        <div className="p-4 sm:p-6">
          <h2 className="font-archivo font-bold text-[25px] leading-[28px] text-gray-800">
            Recent Dispatch Logs
          </h2>
        </div>

        {/* ✔ SCROLLABLE TABLE FOR ALL DEVICES (NO CARDS) */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-[750px] w-full -collapse text-sm sm:text-[15px]">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3  font-medium text-left">Invoice No</th>
                <th className="px-4 py-3  font-medium text-left">Customer</th>
                <th className="px-4 py-3  font-medium text-left">Items</th>
                <th className="px-4 py-3  font-medium text-left">Status</th>
                <th className="px-4 py-3  font-medium text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {dispatchList?.slice(0, 10).map((log) => (
                <tr key={log._id} className="hover:bg-gray-50 transition -b">
                  <td className="px-4 py-3  font-medium text-gray-700">
                    {log.invoiceNo}
                  </td>

                  <td className="px-4 py-3  text-gray-700">
                    {log.customer
                      ? `${log.customer.firstName} ${log.customer.lastName}`
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3  text-gray-700">
                    {log.items?.length}
                  </td>

                  <td
                    className={`px-4 py-3  font-semibold ${
                      log.status === "Completed"
                        ? "text-green-600"
                        : log.status === "Pending"
                        ? "text-yellow-500"
                        : log.status === "In Transit"
                        ? "text-blue-500"
                        : "text-gray-600"
                    }`}
                  >
                    {log.status || "Pending"}
                  </td>

                  <td className="px-4 py-3  text-gray-700">
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
