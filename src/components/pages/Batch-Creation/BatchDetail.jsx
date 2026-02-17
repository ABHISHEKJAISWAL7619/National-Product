"use client"
import { fetchbatchbyid } from '@/redux/slice/batch-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const BatchDetail = ({batchId}) => {
  const dispatch = useDispatch();
  const { singlebatch, loading } = useSelector((state) => state.batch);

  useEffect(() => {
    if (batchId) {
      dispatch(fetchbatchbyid({ batchId }));
    }
  }, [dispatch, batchId]);

  if (loading) return <div className="p-4">Loading batch...</div>;
  if (!singlebatch) return <div className="p-4 text-red-600">No batch found</div>;

  const batch = singlebatch?.data || singlebatch;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg space-y-6">

      <h1 className="text-2xl font-bold text-center">Batch Details</h1>

      <div className="grid grid-cols-2 gap-4">
        <p><b>Batch No:</b> {batch.batchNo}</p>
        <p><b>Date:</b> {batch.date?.split("T")[0]}</p>
        <p><b>Type:</b> {batch.type}</p>
        <p><b>Quantity:</b> {batch.quantity}</p>
        <p><b>Pieces:</b> {batch.pieces}</p>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Output Item</h2>
        <p><b>Name:</b> {batch.outputItem?.productName}</p>
        <p><b>Category:</b> {batch.outputItem?.category?.category}</p>
        <p><b>Subcategory:</b> {batch.outputItem?.subcategory?.name}</p>

        <ul className="list-disc ml-6 mt-2">
          {batch.outputItem?.compositions?.map((c, i) => (
            <li key={i}>
              {c.item?.productName || "N/A"} — {c.percentage}%
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Input Items</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Reuseable</th>
            </tr>
          </thead>
          <tbody>
            {batch.inputItem?.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">
                  {item.itemId?.productName || "N/A"}
                </td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-center">{item.reuseableQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default BatchDetail;
