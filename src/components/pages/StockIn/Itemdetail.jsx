"use client";
import { fetchincomingbyid } from "@/redux/slice/incoming-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Itemdetail = ({ incomingId }) => {
  const dispatch = useDispatch();
  const { loading, singleincoming } = useSelector(
    (state) => state.incoming
  );

  useEffect(() => {
    if (incomingId) {
      dispatch(fetchincomingbyid({ incomingId }));
    }
  }, [dispatch, incomingId]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (!singleincoming) {
    return <div className="p-6 text-gray-500">No Data Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl space-y-6">

      {/* Header Section */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-black">
          Invoice: {singleincoming.invoiceNo}
        </h2>
        <p className="text-gray-600">
          Date: {new Date(singleincoming.date).toLocaleDateString("en-IN")}
        </p>
        <p className="text-gray-800 font-semibold">
          Total Price: ₹ {singleincoming.price}
        </p>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-right">Qty (Kg)</th>
              <th className="px-4 py-2 text-right">Pieces</th>
              <th className="px-4 py-2 text-right">Available Qty</th>
              <th className="px-4 py-2 text-right">Available Pieces</th>
            </tr>
          </thead>
          <tbody>
            {singleincoming.products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50 text-black"
              >
                <td className="px-4 py-2">
                  {p.item?.productName || "-"}
                </td>
                <td className="px-4 py-2 text-right">
                  {p.quantity}
                </td>
                <td className="px-4 py-2 text-right">
                  {p.pieces}
                </td>
                <td className="px-4 py-2 text-right text-blue-600 font-semibold">
                  {p.availableQty}
                </td>
                <td className="px-4 py-2 text-right text-blue-600 font-semibold">
                  {p.availablePieces}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Itemdetail;