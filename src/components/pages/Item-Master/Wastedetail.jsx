"use client";

import { wasteitems } from "@/redux/slice/Item-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Wastedetail = ({ itemId }) => {
  const dispatch = useDispatch();
  const { wasteItemDetails } = useSelector((state) => state.item);

  useEffect(() => {
    if (itemId) {
      dispatch(wasteitems({ ItemId: itemId }));
    }
  }, [dispatch, itemId]);

  const data = wasteItemDetails || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Waste Item Details
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data found</p>
      ) : (
        <div className="space-y-6">
          {data.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              {/* Product Info */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-blue-900">
                  {product.productName}
                </h3>

                <p className="text-sm text-gray-600">
                  Code: {product.productCode}
                </p>
              </div>

              {/* Waste Summary */}
              <div className="flex gap-6 mb-4 text-sm">
                <span className="text-red-600 font-medium">
                  Waste: {product.waste}
                </span>

                <span className="text-green-600 font-medium">
                  Reusable: {product.reusable}
                </span>

                <span className="text-blue-600 font-medium">
                  Final: {product.final}
                </span>
              </div>

              {/* Composition Table */}
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left text-gray-700">S.No</th>
                    <th className="p-2 text-left text-gray-700">Item Name</th>
                    <th className="p-2 text-left text-gray-700">Symbol</th>
                    <th className="p-2 text-left text-gray-700">Percentage</th>
                  </tr>
                </thead>

                <tbody>
                  {product.compositions?.map((comp, i) => (
                    <tr key={comp._id} className="border-t hover:bg-gray-50">
                      <td className="p-2 text-gray-700">{i + 1}</td>

                      <td className="p-2 text-blue-900">
                        {comp.item?.productName}
                      </td>

                      <td className="p-2 text-gray-700">{comp.item?.symbol}</td>

                      <td className="p-2 text-gray-700">{comp.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wastedetail;
