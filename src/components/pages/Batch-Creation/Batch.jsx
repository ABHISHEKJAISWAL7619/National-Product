"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FilePlus2, Edit3, Trash2, Eye } from "lucide-react";
import { fetchbatchs, deletebatch } from "@/redux/slice/batch-slice";
import { successToast, errorToast } from "@/utils/toastMessage";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import Input from "@/components/common/Input";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import { Button } from "@/components/common/Button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FilePlus } from "lucide-react";
const Batch = ({ searchQuery, currPage, type }) => {
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

  useEffect(() => {
    dispatch(
      fetchbatchs({
        filters: { page: currPage, limit: 10, search: searchQuery, type },
      }),
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
const handleExport = async () => {
  try {
    const res = await dispatch(
      fetchbatchs({
        filters: {
          page: 1,
          limit: documentCount, // full data
          search: searchQuery,
          type,
        },
      })
    ).unwrap();

    const data = res?.data || [];

    if (!data.length) return;

    const excelData = data.map((batch, index) => {
      const firstComposition =
        batch?.outputItem?.compositions?.[0]?.item;

      const categoryName =
        firstComposition?.category?.category || "-";

      const subCategoryName =
        firstComposition?.subcategory?.name || "-";

      const composition =
        batch?.outputItem?.compositions
          ?.map((c) => `${c.item?.productName} (${c.percentage}%)`)
          .join(", ") || "-";

      return {
        Date: new Date(batch?.createdAt).toLocaleDateString("en-IN"),
        "Batch No": batch?.batchNo || "-",
        Category: categoryName,
        "Sub Category": subCategoryName,
        Type: batch?.type || "-",
        Product: batch?.outputItem?.productName || "-",
        "Composition (%)": composition,
        Quantity: batch?.quantity || 0,
        Pieces: batch?.pieces || 0,
        Price:
          batch?.outputItem?.price?.finalCost?.toFixed(2) || "0.00",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch List");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "Batch_List.xlsx");
  } catch (error) {
    console.error("Export failed", error);
  }
};
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
  <h1 className="font-archivo text-black font-bold text-2xl sm:text-3xl">
    Batches
  </h1>

  <button
    onClick={handleExport}
    className="flex items-center  cursor-pointer gap-2 cursor-pointer bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-700 transition"
  >
    <FilePlus size={18} />
    Export
  </button>
</div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <Input
          type="select"
          name="type"
          value={type}
          onChange={(e) => toggleQueryParam("type", e.target.value)}
          options={typeOptions}
          valueKey="value"
          labelKey="label"
          className="w-full sm:w-1/3"
        />

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full sm:w-2/3">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by batchNo..."
            className="w-full sm:flex-1" // full width on mobile, flex-grow on desktop
          />
          <Link
            href="/batch/create-batch"
            className="w-full sm:w-auto mt-2 sm:mt-0"
          >
            <Button className="cursor-pointer whitespace-nowrap px-4 py-2 w-full sm:w-auto">
              Create Batch
            </Button>
          </Link>
        </div>
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto rounded-md bg-white shadow">
        <table className="min-w-[700px] sm:min-w-full text-sm">
          <thead className="bg-gray-200  text-black">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Batch No</th>

              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Sub Category</th>

              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-right">Composition (%)</th>
              <th className="px-4 py-3 text-right">Quantity</th>
              <th className="px-4 py-3 text-right">Pieces</th>
              <th className="px-4 py-3 text-right">Price</th>

              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataLoading ? (
              <tr>
                <td colSpan={9} className="py-6 text-center text-gray-500">
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
                <td colSpan={9} className="py-6 text-center text-gray-500">
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

      {/* Delete Modal */}
      {deleteTarget && (
        <OverlayModal
          onClose={() => setDeleteTarget(null)}
          isOpen={!!deleteTarget}
          showCloseIcon={false}
        >
          <AlertModal
            icon={<i className="ri-error-warning-line"></i>}
            iconColor="text-red-600 bg-grey-600 text-4xl"
            title="Delete Confirmation"
            message={
              <span>
                Are you sure you want to delete batch{" "}
                <span className="font-semibold text-blue-600">
                  "{deleteTarget.batchNo}"
                </span>
                ?
              </span>
            }
            buttons={[
              {
                text: "Cancel",
                onClick: () => setDeleteTarget(null),
                colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
              },
              {
                text: "Delete",
                onClick: async () => {
                  await handleDelete(deleteTarget.id);
                },
                colorClass: "bg-red-600 text-white hover:bg-red-700",
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
  const { _id, batchNo, createdAt, outputItem, type, quantity, pieces, price } =
    data || {};
  const firstComposition = outputItem?.compositions?.[0]?.item;

  const categoryName = firstComposition?.category?.category || "-";

  const subCategoryName = firstComposition?.subcategory?.name || "-";
  const productName = outputItem?.productName || "-";
  const composition =
    outputItem?.compositions?.map((c) => `${c.percentage}%`).join(", ") || "-";

  let quantityDisplay = "-";
  if (quantity > 0 && pieces === 0) quantityDisplay = `${quantity} Kg`;
  else if (pieces > 0 && quantity === 0) quantityDisplay = `${pieces} pcs`;
  else if (quantity > 0 && pieces > 0)
    quantityDisplay = `${quantity} Kg / ${pieces} pcs`;

  return (
    <tr className="border-t border-gray-200 text-black hover:bg-gray-50 transition">
      <td className="px-4 py-3">
        {new Date(createdAt).toLocaleDateString("en-IN")}
      </td>
      <td className="px-4 py-3 font-medium text-blue-900">{batchNo || "-"}</td>
      <td className="px-4 py-3 font-medium text-blue-900">
        {categoryName || "-"}
      </td>
      <td className="px-4 py-3 font-medium text-blue-900">
        {subCategoryName || "-"}
      </td>

      <td className="px-4 py-3 capitalize">{type || "-"}</td>
      <td className="px-4 py-3">{productName}</td>
      <td className="px-4 py-3 text-right">{composition}</td>
      <td className="px-4 py-3 text-right">{quantity}</td>
      <td className="px-4 py-3 text-right">{pieces}</td>
<td className="px-4 py-3 text-right">
  {(outputItem?.price?.finalCost ?? 0).toFixed(2)}
</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <Link href={`/batch/${_id}`}>
            <button
              className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
              title="view"
            >
              <Eye size={18} />
            </button>
          </Link>
          <button
            className="text-red-500 hover:text-red-700 transition"
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
