"use client";
import { fetchItembyid } from "@/redux/slice/Item-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Singleitemdetail = ({ ItemId }) => {
  const dispatch = useDispatch();
  const { singleItem, loading } = useSelector((s) => s.item);

  useEffect(() => {
    if (ItemId) {
      dispatch(fetchItembyid({ ItemId }));
    }
  }, [dispatch, ItemId]);

  const data = singleItem?.data ? singleItem.data : singleItem;

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">No Data Found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6 space-y-6">

      {/* 🔹 MAIN ITEM BASIC DETAILS */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-black mb-4">
          Item Details
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-black">

          <div>
            <p className="text-gray-500">Product Name</p>
            <p className="font-semibold">{data.productName}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-semibold">
              {data.category?.category || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Subcategory</p>
            <p className="font-semibold">
              {data.subcategory?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Unit Price</p>
            <p className="font-semibold">₹ {data.unitPrice}</p>
          </div>

          <div>
            <p className="text-gray-500">Symbol</p>
            <p className="font-semibold">{data.symbol || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Product Code</p>
            <p className="font-semibold">{data.productCode || "-"}</p>
          </div>

        </div>
      </div>

      {/* 🔹 COMPOSITION TABLE (Only if exists) */}
      {data.compositions?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Compositions</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Raw Material</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Subcategory</th>
                  <th className="px-4 py-2 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {data.compositions.map((comp) => (
                  <tr key={comp._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {comp.item?.productName}
                    </td>
                    <td className="px-4 py-2">
                      {comp.item?.category?.category || "-"}
                    </td>
                    <td className="px-4 py-2">
                      {comp.item?.subcategory?.name || "-"}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {comp.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Singleitemdetail;