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
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchinventory();
  }, []);

  if (!data)
    return <p className="p-5 font-semibold text-gray-600">Loading...</p>;

  return (
    <>
      <div className="w-full bg-white  shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="font-semibold text-xl text-gray-900">
            Item: #{data.itemId} ({data.productName})
          </h1>

          <ul className="flex gap-6 font-medium text-gray-600">
            <li className="px-4 py-1 rounded-md bg-blue-900 text-white">
              General
            </li>
            <li className="hover:text-blue-900 cursor-pointer">Stock</li>
            <li className="hover:text-blue-900 cursor-pointer">Tracking</li>
            <li className="hover:text-blue-900 cursor-pointer">Financial</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6">
        <h2 className="font-semibold text-lg mb-3">General</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoRow label="Name" value={data.productName} />
          <InfoRow label="UID" value={data.itemId} />
          <InfoRow label="Category" value={data.itemCategory} />
        </div>
      </div>

      <div className="bg-white p-6 -t">
        <h2 className="font-semibold text-lg mb-3">Stock</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoRow label="Quantity In Hand" value={data.quantity} />
          <InfoRow label="Total Value" value={`₹${data.totalValue}`} />
        </div>

        <div className="mt-5">
          <h3 className="font-semibold text-md mb-2">Unit</h3>
          <div className="flex items-center gap-8">
            <p className="font-medium">Kg</p>
            <Check className="text-white bg-blue-900" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6">
        <h2 className="font-semibold text-lg mb-4">Lifecycle & Tracking</h2>

        <table className="min-w-full  divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Time Stamp",
                "Type",
                "Percentage Used",
                "Qty In",
                "Qty Out",
              ].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-sm font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.transactions?.map((tx, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  {new Date(tx.timeStamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{tx.type}</td>
                <td className="px-6 py-3">{tx.percentageUsed}</td>
                <td className="px-6 py-3">{tx.qtyIn}</td>
                <td className="px-6 py-3">{tx.qtyOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 -t">
        <h2 className="font-semibold text-lg mb-3">Financial</h2>

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
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium text-gray-900">{value || "-"}</p>
  </div>
);

export default Productdetail;
