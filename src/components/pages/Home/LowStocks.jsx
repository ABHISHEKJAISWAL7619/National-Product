"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { fetchlowstock } from "@/redux/slice/dashboard-slice";
import Pagination from "@/components/common/Pagination";

const LowStocks = ({ page }) => {
  const dispatch = useDispatch();

  const [low, setLow] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(
          fetchlowstock({ filters: { limit: 10, page } }),
        ).unwrap();

        setLow(res?.data || []);
        setCount(res?.count || 0);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch, page]);

  return (
    <div className="w-full flex justify-center mt-8 px-2 sm:px-4">
      <div className="w-full max-w-full">
        <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm p-4 sm:p-5 flex flex-col gap-4">
          <h3 className="font-bold text-black text-[22px] sm:text-[25px] tracking-normal">
            Low Stock Alerts
          </h3>

          {/* TABLE WRAPPER */}
          <div className="w-full overflow-x-auto custom-scroll border border-gray-200 rounded-lg">
            <table className="min-w-[700px] w-full border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Symbol
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {low?.length > 0 ? (
                  low.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {i + 1}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-800 capitalize">
                        {item.productName}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-800 uppercase">
                        {item.symbol}
                      </td>

                      <td className="px-4 py-3 text-sm font-semibold text-red-600">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-red-600 font-medium">
                          Low
                          <Image
                            src="/img/Icon.png"
                            height={14}
                            width={14}
                            alt="alert"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No low stock items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="mt-4 flex justify-end">
            <Pagination total={count} pageSize={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowStocks;
