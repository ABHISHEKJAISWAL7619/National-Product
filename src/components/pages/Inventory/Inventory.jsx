"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchinventorys } from "@/redux/slice/inventory-slice";
import Link from "next/link";
import { RiFileList2Line } from "react-icons/ri";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FilePlus } from "lucide-react";
const Inventory = ({ page, searchQuery }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { inventoryList, documentCount, loading, totalAmount } = useSelector(
    (state) => state.inventory,
  );
  // console.log(documentCount);

  useEffect(() => {
    dispatch(
      fetchinventorys({ filters: { limit: 10, page, search: searchQuery } }),
    );
  }, [dispatch, page, searchQuery]);
  const handleExport = async () => {
    try {
      const res = await dispatch(
        fetchinventorys({
          filters: {
            limit: documentCount, // full data
            page: 1,
            search: searchQuery,
          },
        }),
      ).unwrap();

      const data = res?.data || [];

      if (!data.length) return;

      const excelData = data.map((item, index) => ({
        "S.No": index + 1,
        "Item Name": item.productName,
        Category: item.itemCategory,
        Code: item.productCode || "-",
        "Quantity (Kg)": item.quantity,
        Pieces: item.pieces,
        "Unit Price": item.unitPrice,
        "Total Value": item.totalValue,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory List");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(blob, "Inventory_List.xlsx");
    } catch (error) {
      console.error("Export failed", error);
    }
  };
  const tableHeaders = [
    "Item Name",
    "Category",
    "Code",
    "Quantity(Kg)",
    "Pieces",
    "Unit Price",
    "Total Value",
    "View",
  ];

  return (
    <div className="w-full font-inter">
      <div className="w-full bg-white shadow-xl rounded-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between">
          <h2 className="text-2xl  text-black font-bold">
            Total Amount ₹{(totalAmount ?? 0).toFixed(2)}
          </h2>

          <div className="flex mt-4 sm:mt-0 space-x-2 items-center">
            <SearchBox
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              iconLeft="search-line"
              placeholder="Search here..."
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center  cursor-pointer gap-2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <FilePlus size={18} />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((head, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-gray-800 font-semibold text-sm"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : inventoryList?.length > 0 ? (
                inventoryList?.map((item) => (
                  <tr
                    key={item.itemId}
                    className="hover:bg-blue-50 text-black cursor-pointer transition"
                  >
                    <td className="px-6 text-black py-4">{item.productName}</td>
                    <td className="px-6 text-black py-4">
                      {item.itemCategory}
                    </td>
                    <td className="px-6 text-black py-4">
                      {item.productCode || "-"}
                    </td>
                    <td className="px-6 py-4 text-blue-800 font-semibold">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-blue-800 font-semibold">
                      {item.pieces}
                    </td>
                    <td className="px-6 text-black py-4">
                      ₹{Number(item.unitPrice || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4 font-semibold text-blue-600">
                      ₹{Number(item.totalValue || 0).toLocaleString()}
                    </td>

                    {/* View Button */}
                    <td className="px-6 py-4">
                      <Link
                        href={`/inventory/product-detail/${item.itemId}`}
                        className="text-blue-600 hover:text-blue-900 flex gap-1"
                      >
                        <RiFileList2Line size={20} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    No inventory found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end p-4">
            <Pagination pageSize={10} total={documentCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
