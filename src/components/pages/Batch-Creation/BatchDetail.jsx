"use client";
import { fetchbatchbyid } from "@/redux/slice/batch-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BatchDetail = ({ batchId }) => {
  const dispatch = useDispatch();
  const { singlebatch, loading } = useSelector((state) => state.batch);
  console.log("singlebatch detail", singlebatch);

  useEffect(() => {
    if (batchId) {
      dispatch(fetchbatchbyid({ batchId }));
    }
  }, [dispatch, batchId]);

  if (loading) return <div className="p-4">Loading batch...</div>;
  if (!singlebatch)
    return <div className="p-4 text-red-600">No batch found</div>;

  const batch = singlebatch?.data || singlebatch;
  const totalQty = batch.inputItem?.reduce((sum, item) => {
    return sum + (item.quantity || 0);
  }, 0);
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg space-y-6">
      <h1 className="text-2xl font-bold  text-black text-center">
        Batch Details
      </h1>

      <div className="grid text-gray-600 grid-cols-2 gap-4">
        <p>
          <b>Batch No:</b> {batch.batchNo}
        </p>
        <p>
          <b>Date:</b> {batch.date?.split("T")[0]}
        </p>
        <p>
          <b>Type:</b> {batch.type}
        </p>
        <p>
          <b>Available Quantity:</b> {batch.quantity.toFixed(2)}
        </p>
        <p>
          <b>Pieces:</b> {batch.pieces}
        </p>
      </div>

      <div className="border-t text-gray-600 pt-4">
        <h2 className="text-xl font-semibold mb-2">Output Item</h2>
        <p>
          <b>Name:</b> {batch.outputItem?.productName}
        </p>
        <p>
          <b>Category:</b> {batch.outputItem?.category?.category}
        </p>
        <p>
          <b>Subcategory:</b> {batch.outputItem?.subcategory?.name}
        </p>
        <p>
          <b>Waste:</b> {(batch.outputItem?.quantityUsed?.waste || 0).toFixed(2)}
        </p>
        <p>
          <b>Reusable:</b> {(batch.outputItem?.quantityUsed?.reuseable || 0).toFixed(2)}
        </p>{" "}
        <p>
          <b>Final:</b> {(batch.outputItem?.quantityUsed?.final || 0).toFixed(2)}
        </p>
        <ul className="list-disc ml-6 mt-2">
          {batch.outputItem?.compositions?.map((c, i) => (
            <li key={i}>
              {c.item?.productName || "N/A"} — {c.percentage}%
            </li>
          ))}
        </ul>
      </div>
      {/* Cost Summary */}
      <div className="border-t text-gray-600 pt-4">
        <h2 className="text-xl text-black font-semibold mb-2">Cost Summary</h2>

        <div className="grid  grid-cols-2 gap-4">
          <p>
            <b>Total Raw Material Cost:</b> ₹
            {batch.totalRawMaterialCost?.toLocaleString("en-IN")}
          </p>

          <p>
            <b>Factory Overhead (%):</b> {batch.factoryOverhead}%
          </p>

          <p>
            <b>Overhead Cost:</b> ₹{batch.overheadCost?.toLocaleString("en-IN")}
          </p>

          <p className="text-lg font-bold text-green-700">
            <b>Final Cost:</b> ₹{batch.finalCost?.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="border-t text-gray-600 pt-4">
        <h2 className="text-xl text-black font-semibold mb-2">Input Items</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Pieces</th>
            </tr>
          </thead>
          <tbody>
            {batch.inputItem?.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2 text-center">
                  {item.itemId?.productName || "N/A"}
                </td>
                <td className="border p-2 text-center">
                  {item?.quantity.toFixed(2)}
                </td>
                <td className="border p-2 text-center">{item?.pieces}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="border p-2 text-right">Total</td>

              <td className="border p-2 text-center">{totalQty.toFixed(2)}</td>

              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchDetail;
