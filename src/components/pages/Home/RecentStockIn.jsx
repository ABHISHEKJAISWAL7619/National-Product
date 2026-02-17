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
    <div className="flex justify-center  px-3 sm:px-6 lg:px-1 w-full">
      <div className="w-full max-w-full bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6  ">
          <h2 className="font-bold text-[20px] md:text-[25px] text-gray-800">
            Recent Stock In Transactions
          </h2>
        </div>

        {/* SCROLL TABLE LIKE BATCH */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-[700px] w-full ">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-black text-left font-semibold ">
                  Invoice No
                </th>
                <th className="px-4 py-3 text-left text-black font-semibold ">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-black font-semibold ">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-black font-semibold ">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {incomingList.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-50 text-gray-700">
                  <td className="px-4 py-3  font-semibold">{tx.invoiceNo}</td>

                  <td className="px-4 py-3 ">
                    {tx.products
                      .map((p) => p.item?.productName || p.item?.name)
                      .join(", ")}
                  </td>

                  <td className="px-4 py-3 ">
                    {tx.products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
                  </td>

                  <td className="px-4 py-3 ">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button */}
        <div className="p-4 sm:px-6 text-black flex  justify-center border-t border-gray-200">
          <Link href={"/incoming/stock-in"}>
            {/* <button className="cursor-pointer w-full text-gray-600 font-medium px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"> */}
            View All Stock In
            {/* </button> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentStockIn;
