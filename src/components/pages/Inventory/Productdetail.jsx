"use client";
import { fetchsingleinventory } from "@/redux/slice/inventory-slice";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Productdetail = ({ itemId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const fetchinventory = async () => {
    const res = await dispatch(fetchsingleinventory({ id: itemId })).unwrap();
    setData(res.data);
  };

  useEffect(() => {
    fetchinventory();
  }, []);

  if (!data) return <p className="p-5 font-semibold text-black">Loading...</p>;

  return (
    <>
      <div className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="font-semibold text-xl text-black">
            Item: # ({data.productName})
          </h1>
        </div>
      </div>

      <div className="bg-white p-6">
        <h2 className="font-semibold text-lg mb-3 text-black">General</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoRow label="Name" value={data.productName} />
          {/* <InfoRow label="UID" value={data.itemId} /> */}
          <InfoRow label="Category" value={data.itemCategory} />
        </div>
      </div>

      <div className="bg-white p-6">
        <h2 className="font-semibold text-lg mb-3 text-black">Stock</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoRow label="Quantity In Hand" value={data.quantity} />
          <InfoRow label="Total Value" value={`₹${data.totalValue}`} />
        </div>

        <div className="mt-5">
          <h3 className="font-semibold text-md mb-2 text-black">Unit</h3>
          <div className="flex items-center gap-8">
            <p className="font-medium text-black">Kg</p>
            <Check className="text-white bg-blue-900 rounded-sm" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6">
        <h2 className="font-semibold text-lg mb-4 text-black">
          Lifecycle & Tracking
        </h2>

        <table className="min-w-full divide-y divide-gray-300 text-black">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Time Stamp",
                "Type",
                "Reference",
                "Qty In",
                "Qty Out",
                "piecesIn",
                "piecesOut",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-sm font-medium text-black"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.transactions?.map((tx, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-black">
                  {new Date(tx.timeStamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 text-black">{tx?.type || "-"}</td>
                <td className="px-6 py-3 text-black">{tx?.reference || "-"}</td>
                <td className="px-6 py-3 text-black">{tx?.qtyIn || "-"}</td>
                <td className="px-6 py-3 text-black">{tx?.qtyOut || "-"}</td>
                <td className="px-6 py-3 text-black">{tx?.piecesIn || "-"}</td>
                <td className="px-6 py-3 text-black">{tx?.piecesOut || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6">
        <h2 className="font-semibold text-lg mb-3 text-black">Financial</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoRow label="Unit Price" value={`₹${data.unitPrice}`} />
          <InfoRow
            label="Total Inventory Value"
            value={`₹${data.totalValue}`}
          />
        </div>
      </div>
    </>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-gray-700 text-sm">{label}</p>
    <p className="font-medium text-black">{value || "-"}</p>
  </div>
);

export default Productdetail;
