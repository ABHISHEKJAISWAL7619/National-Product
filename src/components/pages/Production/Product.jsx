"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Filter,
  FilePlus2,
  Edit3,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductions,
  deleteProduction,
} from "@/redux/slice/production-slice";
import { successToast, errorToast } from "@/utils/toastMessage";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import Input from "@/components/common/Input";

const Product = ({ searchQuery, currPage, dateTo, dateFrom, type, status }) => {
  const dispatch = useDispatch();
  const typeOptions = [
    { label: "Soldering Wire", value: "solderingWire" },
    { label: "Soldering Stick", value: "solderingStick" },
  ];

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];
  const [search, setSearch] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleQueryParam = useToggleQueryParam();

  const { productionList, documentCount } = useSelector(
    (state) => state.production
  );
  console.log(productionList);

  // Fetch All Productions
  const fetchAllProductions = () => {
    dispatch(
      fetchProductions({
        filters: {
          page: currPage,
          search: searchQuery,
          limit: 10,
          dateTo,
          dateFrom,
          status,
          type,
        },
      })
    );
  };

  useEffect(() => {
    fetchAllProductions();
  }, [dispatch, searchQuery, currPage, type, status, dateFrom, dateTo]);

  // Confirm Delete
  const confirmDelete = (prod) => {
    setDeleteData(prod);
    setShowDeleteModal(true);
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteData) return;
    try {
      await dispatch(deleteProduction({ id: deleteData._id })).unwrap();
      successToast(`Production deleted successfully`);
      fetchAllProductions();
    } catch (error) {
      console.error("Delete failed:", error);
      errorToast("Failed to delete production");
    } finally {
      setShowDeleteModal(false);
      setDeleteData(null);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-100 font-inter min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center gap-6 p-6 ">
        <h2 className="font-archivo text-black font-bold text-[25px] leading-[28px]">
          Production
        </h2>

        <Link href="/production/add-production">
          <button className="bg-blue-950 cursor-pointer text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-800 transition flex items-center gap-1 h-10">
            <FilePlus2 size={16} />
            <span>Add Production</span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5 my-5 mx-3 ">
        <Input
          label="From"
          type="date"
          value={dateFrom}
          onChange={(e) => toggleQueryParam("dateFrom", e.target.value)}
          className="min-w-[160px]"
        />

        <Input
          label="To"
          type="date"
          value={dateTo}
          onChange={(e) => toggleQueryParam("dateTo", e.target.value)}
          className="min-w-[160px]"
        />

        <Input
          type="select"
          name="type"
          value={type}
          onChange={(e) => toggleQueryParam("type", e.target.value)}
          options={typeOptions}
          valueKey="value"
          labelKey="label"
          label="Type"
          className="min-w-[150px]"
        />

        <Input
          type="select"
          name="status"
          value={status}
          onChange={(e) => toggleQueryParam("status", e.target.value)}
          options={statusOptions}
          valueKey="value"
          labelKey="label"
          label="Status"
          className="min-w-[150px]"
        />
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto mt-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "S.No",
                "Batch No",
                "Type",
                "Quantity (Kg)",
                "Pieces",
                "Semi Finished (Kg)",
                "Semi Finished (Pieces)",
                "Reusable Waste",
                "Waste",
                "Short Access",
                "Status",
                "Actions",
              ].map((header, i) => (
                <th
                  key={i}
                  className={`px-4 md:px-6 py-4 font-medium text-[13px] md:text-[14px] text-gray-700 bg-gray-100 ${
                    [
                      "Quantity (Kg)",
                      "Pieces",
                      "Semi Finished (Kg)",
                      "Semi Finished (Pieces)",
                      "Reusable Waste",
                      "Waste",
                      "Short Access",
                    ].includes(header)
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {Array.isArray(productionList) && productionList.length > 0 ? (
              productionList.map((p, i) => {
                const batch = p?.batch;
                const compositions =
                  batch?.outputItem?.[0]?.compositions?.map(
                    (c) => c.percentage
                  ) || [];

                return (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {i + 1}
                    </td>

                    <td className="px-4 py-3 text-sm text-center font-medium text-blue-950">
                      {batch?.batchNo || "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center font-medium text-blue-950">
                      {batch?.type || "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {batch?.quantity ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {batch?.pieces ?? "—"}
                    </td>

                    {/* <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {compositions.length > 0 ? compositions.join("/") : "—"}
                    </td> */}

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {p?.semiFinishedKg ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {p?.semiPieces ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {p?.reusableWaste ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {p?.waste ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {p?.shortAccess ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center text-blue-950">
                      {p?.status || "—"}
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-right">
                      <div className="flex items-center space-x-2 justify-center">
                        <Link href={`/production/${p._id}`}>
                          <button className="text-blue-600 p-1 cursor-pointer rounded-full hover:bg-blue-50 transition">
                            <Edit3 size={18} />
                          </button>
                        </Link>
                        <button
                          className="text-red-600 p-1 cursor-pointer rounded-full hover:bg-red-50 transition"
                          onClick={() => confirmDelete(p)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="text-center py-10 text-gray-500 text-base md:text-lg"
                >
                  No production records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end">
          <Pagination pageSize={10} total={documentCount} />
        </div>
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
            deleteData ? (
              <span className="text-sm text-gray-600">
                Are you sure you want to delete production from{" "}
                <span className="font-semibold text-blue-500 text-base">
                  {deleteData?.batch?.batchNo || "Unknown Batch"}
                </span>
                ? This action cannot be undone.
              </span>
            ) : (
              "Are you sure you want to delete this production?"
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

export default Product;
