"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FilePlus2, Edit3, Trash2 } from "lucide-react";
import { fetchbatchs, deletebatch } from "@/redux/slice/batch-slice";
import { successToast, errorToast } from "@/utils/toastMessage";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import Input from "@/components/common/Input";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";

const Batch = ({ searchQuery, currPage, batchId, type }) => {
  const dispatch = useDispatch();
  const toggleQueryParam = useToggleQueryParam();
  const {
    batchList = [],
    documentCount,
    dataLoading,
  } = useSelector((state) => state.batch);

  const typeOptions = [
    { label: "Soldering Wire", value: "solderingWire" },
    { label: "Soldering Stick", value: "solderingStick" },
  ];

  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ===== Fetch Batches =====
  useEffect(() => {
    dispatch(
      fetchbatchs({
        filters: { page: currPage, limit: 10, search: searchQuery, type },
      })
    );
  }, [dispatch, currPage, searchQuery, type]);

  const handleDelete = async (batchId) => {
    try {
      await dispatch(deletebatch({ batchId })).unwrap();
      successToast("Batch deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      errorToast(err.message || "Failed to delete batch");
    }
  };

  return (
    <div className="space-y-5 text-gray-900">
      <h1 className="font-archivo font-bold text-[25px] leading-[28px]">
        Batchs
      </h1>

      <Input
        type="select"
        name="type"
        value={type}
        onChange={(e) => toggleQueryParam("type", e.target.value)}
        options={typeOptions}
        valueKey="value"
        labelKey="label"
        className="max-w-[320px]"
      />

      <div className="flex items-center justify-between">
        <SearchBox
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft="search-line"
          placeholder="Search here..."
        />
        <Link href="/batch/create-batch">
          <button className="flex cursor-pointer items-center gap-2 dark:text-black px-4 py-2 rounded-md text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition">
            <FilePlus2 size={16} /> Create Batch
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md bg-white dark:bg-gray-900 shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Batch No</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-right">Composition (%)</th>
              <th className="px-4 py-3 text-right">Quantity (Kg/Pcs)</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {dataLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : batchList.length > 0 ? (
              batchList.map((batch) => (
                <Row
                  key={batch._id}
                  data={batch}
                  onDeleteClick={(info) => setDeleteTarget(info)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No batches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end py-3">
          <Pagination pageSize={10} total={documentCount} />
        </div>
      </div>

      {deleteTarget && (
        <OverlayModal
          onClose={() => setDeleteTarget(null)}
          isOpen={!!deleteTarget}
          showCloseIcon={false}
        >
          <AlertModal
            icon={<i className="ri-error-warning-line"></i>}
            iconColor="text-red-600 text-4xl"
            title="Delete Confirmation"
            message={
              <span>
                Are you sure you want to delete batch{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  "{deleteTarget.batchNo}"
                </span>
                ?
              </span>
            }
            buttons={[
              {
                text: "Cancel",
                onClick: () => setDeleteTarget(null),
                colorClass:
                  "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
              },
              {
                text: "Delete",
                onClick: async () => {
                  await handleDelete(deleteTarget.id);
                },
                colorClass:
                  "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
              },
            ]}
          />
        </OverlayModal>
      )}
    </div>
  );
};

export default Batch;

const Row = ({ data, onDeleteClick }) => {
  const { _id, batchNo, createdAt, outputItem, type } = data || {};

  const product = outputItem || {};
  const productName = product?.productName || "-";

  const compositions =
    product?.compositions?.map((c) => ` ${c.percentage}%`).join(", ") || "-";

  let quantityDisplay = "-";
  if (data.quantity > 0 && data.pieces === 0)
    quantityDisplay = `${data.quantity} Kg`;
  else if (data.pieces > 0 && data.quantity === 0)
    quantityDisplay = `${data.pieces} pcs`;
  else if (data.quantity > 0 && data.pieces > 0)
    quantityDisplay = `${data.quantity} Kg / ${data.pieces} pcs`;

  return (
    <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      <td className="px-4 py-3">
        {new Date(createdAt).toLocaleDateString("en-IN")}
      </td>

      <td className="px-4 py-3 font-medium text-blue-900 dark:text-blue-400">
        {batchNo || "-"}
      </td>

      <td className="px-4 py-3 capitalize">{type || "-"}</td>

      <td className="px-4 py-3">{productName}</td>

      <td className="px-4 py-3 text-right whitespace-pre-line">
        {compositions}
      </td>

      <td className="px-4 py-3 text-right">{quantityDisplay}</td>

      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <Link href={`/batch/${_id}`}>
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
              title="Edit"
            >
              <Edit3 size={18} />
            </button>
          </Link>

          <button
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
            title="Delete"
            onClick={() => onDeleteClick({ id: _id, batchNo })}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};
