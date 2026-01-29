"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  FilePlus,
  Filter,
  LayoutDashboard,
  Edit3,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchitems } from "@/redux/slice/Item-slice";
import { successToast } from "@/utils/toastMessage";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import SearchBox from "@/components/common/SearchBox";
import Pagination from "@/components/common/Pagination";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Item = ({ searchQuery, currPage }) => {
  const [deleteItemData, setDeleteItemData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { itemList, documentCount } = useSelector((state) => state.item);

  const fetchallitems = () => {
    dispatch(
      fetchitems({
        filters: { search: searchQuery, page: currPage, limit: 10 },
      }),
    );
  };

  const confirmDelete = (item) => {
    setDeleteItemData(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteItemData) return;
    try {
      await dispatch(deleteItem({ ItemId: deleteItemData._id })).unwrap();
      successToast(`Item deleted successfully`);
      dispatch(
        fetchitems({
          filters: { search: searchQuery, page: currPage, limit: 10 },
        }),
      );
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setShowDeleteModal(false);
      setDeleteItemData(null);
    }
  };
  const handleExport = async () => {
    try {
      const res = await dispatch(
        fetchitems({
          filters: {
            search: searchQuery,
            page: 1,
            limit: documentCount, // 🔥 yahin magic hai
          },
        }),
      ).unwrap();

      const data = res?.data || [];

      if (!data.length) return;

      const excelData = data.map((item, index) => ({
        "S.No": index + 1,
        "Product Name": item.productName,
        "Product Code": item.productCode,
        Quantity: item.quantity,
        Pieces: item.piece,
        "Unit Price": item.unitPrice,
        Symbol: item.symbol,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(blob, "Items.xlsx");
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  useEffect(() => {
    fetchallitems();
  }, [dispatch, searchQuery, currPage]);

  return (
    <div className="w-full border border-gray-100 bg-white font-inter">
      {/* Header Section */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full md:w-auto">
          <h2 className="font-archivo font-bold text-[25px] leading-[28px]  text-black sm:text-3xl whitespace-nowrap">
            Item Master
          </h2>
          {/* <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lg:w-[400px] max-w-[400px] px-4 py-2 border border-gray-500 rounded-lg text-sm placeholder-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          /> */}
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Link href="/item-master/create-catgory">
            <button className="w-full cursor-pointer sm:w-auto bg-blue-950 text-white text-sm font-medium flex items-center justify-center gap-1 py-2.5 px-4 rounded-md hover:bg-blue-900 transition">
              <LayoutDashboard size={18} />
              <span>Create Category</span>
            </button>
          </Link>
          <Link href="/item-master/view-item/add-new">
            <button className="w-full cursor-pointer sm:w-auto bg-blue-700 text-white text-sm font-medium flex items-center justify-center gap-1 py-2.5 px-4 rounded-md hover:bg-blue-800 transition">
              <FilePlus size={18} />
              <span>Create Item</span>
            </button>
          </Link>
          <button
            onClick={handleExport}
            className="w-full cursor-pointer sm:w-auto bg-green-600 text-white text-sm font-medium flex items-center justify-center gap-1 py-2.5 px-4 rounded-md transition"
          >
            <FilePlus size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-start md:justify-between">
        <SearchBox
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft="search-line"
          placeholder="Search by productname,code..."
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                "S.No",
                "Product Name",
                "Product Code",
                "Quanity",
                "pieces",
                "Unitprice",
                "Symbol",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-4 sm:px-6 py-5 text-left bg-gray-100 font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {itemList.map((item, i) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {((Number(currPage) || 1) - 1) * 10 + i + 1}
                </td>
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {item?.productName}
                </td>
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {item?.productCode || "-"}
                </td>
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {item?.quantity || "-"}
                </td>
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {item?.piece || "-"}
                </td>
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {item?.unitPrice || "-"}
                </td>
                <td className="px-4 sm:px-6 py-3 text-blue-950">
                  {item?.symbol || "-"}
                </td>

                <td className="px-4 sm:px-6 py-3 text-right">
                  <div className="flex items-center space-x-2">
                    <Link href={`/item-master/view-item/${item._id}`}>
                      <button className="text-blue-600 p-1 cursor-pointer rounded-full hover:bg-blue-50 transition">
                        <Edit3 size={18} />
                      </button>
                    </Link>
                    <button
                      className="text-red-600 p-1 cursor-pointer rounded-full hover:bg-red-50 transition"
                      onClick={() => confirmDelete(item)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Pagination pageSize={10} total={documentCount} />
      </div>

      {/* Delete Confirmation Modal */}
      <OverlayModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <AlertModal
          icon="⚠️"
          title="Delete Confirmation"
          message={
            deleteItemData ? (
              <span className="text-sm text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-blue-500 text-base">
                  {deleteItemData.productName}
                </span>
                ? This action cannot be undone.
              </span>
            ) : (
              "Are you sure you want to delete this item?"
            )
          }
          buttons={[
            {
              text: "Cancel",
              onClick: () => setShowDeleteModal(false),
              colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
            },
            {
              text: "Delete",
              onClick: handleDelete,
              colorClass: "bg-red-600 text-white hover:bg-red-700",
            },
          ]}
        />
      </OverlayModal>
    </div>
  );
};

export default Item;
