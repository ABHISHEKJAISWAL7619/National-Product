"use client";
import { fetchproduction2 } from "@/redux/slice/production2-slice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Edit3 } from "lucide-react";

const Detail = ({ productionId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const fetchsingledata = async () => {
    let res = await dispatch(
      fetchproduction2({ filters: { productionId } })
    ).unwrap();
    setData(res?.data || []);
  };

  useEffect(() => {
    fetchsingledata();
  }, []);

  // Total Available
  const totalAvailable = data.reduce(
    (acc, item) => acc + (item.available || 0),
    0
  );

  return (
    <div className="p-5">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded">
        <h2 className="text-xl font-semibold text-gray-800">
          Production Level 2 Details
        </h2>
        <span className="text-lg font-bold text-green-600">
          Available Qty: {totalAvailable}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Date",
                "Product",
                "Qty",
                "Gauge",
                "Flux %",
                "Flux Qty",
                "Gulla (Kg)",
                "Semi-Finish (Kg)",
                "Short/Access",
                "Waste",
                "Reusable Waste",
                "Status",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-sm font-semibold text-gray-700 ${
                    [
                      "Qty",
                      "Gauge",
                      "Flux %",
                      "Flux Qty",
                      "Gulla (Kg)",
                      "Semi-Finish (Kg)",
                      "Short/Access",
                      "Waste",
                      "Reusable Waste",
                    ].includes(header)
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.productName || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.quantity || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.gauge ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.flux ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.fluxQty ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.gula ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.semiFinishedKg ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.shortAndAccess ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.waste ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 text-right text-sm">
                    {item.reusableWaste ?? "-"}
                  </td>
                  <td className="px-4 py-3  text-sm capitalize text-gray-800">
                    {item.status}
                  </td>

                  <td className="px-4 cursor-pointer py-3 text-center">
                    <Link href={`/production/production-level2/${item._id}`}>
                      <button className="text-blue-600 cursor-pointer p-1 rounded hover:bg-blue-50">
                        <Edit3 size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={13}
                  className="py-6 text-center text-gray-500 text-base"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
