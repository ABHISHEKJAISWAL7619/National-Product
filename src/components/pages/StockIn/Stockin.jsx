"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FilePlus2, Edit3, Trash2, Eye, Edit } from "lucide-react";
import { fetchincomings, deleteincoming } from "@/redux/slice/incoming-slice";
import { successToast, errorToast } from "@/utils/toastMessage";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import Cookies from "js-cookie";

const StockIn = ({ searchQuery, currPage }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const {
    incomingList = [],
    documentCount,
    loading,
    dataLoading,
  } = useSelector((state) => state.incoming);

  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(
      fetchincomings({
        filters: { page: currPage, limit: 10, search: searchQuery },
      }),
    );
  }, [dispatch, currPage, searchQuery]);

  const handleDelete = async (incomingId,productId) => {
    try {
      await dispatch(deleteincoming({ token, incomingId ,productId})).unwrap();
      successToast("Stock entry deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      errorToast(err.message || "Failed to delete stock entry");
    }
  };

  return (
    <div className="space-y-5 text-black">
      <h1 className="font-archivo font-bold text-[25px] leading-[28px] text-black">
        Stock In
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex-1">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by InvoiceNo..."
            className="w-full text-black placeholder-black"
          />
        </div>

        <div className="flex mt-2 sm:mt-0 sm:ml-4">
          <Link href="/incoming/create-stock" className="w-full sm:w-auto">
            <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
              <FilePlus2 size={16} /> Add Incoming
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md bg-white shadow text-black">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-4 py-3 text-left text-black">Date</th>
              <th className="px-4 py-3 text-left text-black">Invoice No</th>
              <th className="px-4 py-3 text-left text-black">Name</th>

              <th className="px-4 py-3 text-left text-black">Symbol</th>
              <th className="px-4 py-3 text-center text-black"> Unit Price</th>

              <th className="px-4 py-3 text-left text-black">
                Available Quantity
              </th>
              <th className="px-4 py-3 text-left text-black">
                Incoming Quantity
              </th>
              <th className="px-4 py-3 text-left text-black">Total Quantity</th>

              <th className="px-4 py-3 text-left text-black">
                Available Pieces
              </th>

              <th className="px-4 py-3 text-left text-black">
                Incoming Pieces
              </th>
              <th className="px-4 py-3 text-left text-black">Total Pieces</th>
                            <th className="px-4 py-3 text-left text-black">Invoice Price</th>

              <th className="px-4 py-3 text-center text-black">Action</th>
            </tr>
          </thead>

          <tbody>
            {dataLoading ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : incomingList.length > 0 ? (
              incomingList.map((incoming) => (
                <Row
                  key={incoming._id}
                  data={incoming}
                  onDeleteClick={(info) => setDeleteTarget(info)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-6 text-center text-gray-500">
                  No stock entries found.
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
            iconColor="text-red-600 bg-grey-600 text-4xl"
            title="Delete Confirmation"
            message={
              <span className="text-black">
                Are you sure you want to delete stock entry{" "}
                <span className="font-semibold text-blue-600">
                  "{deleteTarget.invoiceNo}"
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
                  await handleDelete(deleteTarget.id, deleteTarget.productId);
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

export default StockIn;

const Row = ({ data, onDeleteClick }) => {
  const {
    _id,
    invoiceNo,
    quantity,
    pieces,
    availableQty,
    availablePieces,
    date,
    price,
    symbol,
    productName,
    invoicePrice
  } = data || {};

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition text-black">
      <td className="px-4 py-3 text-black">
        {new Date(date).toLocaleDateString("en-IN")}
      </td>

      <td className="px-4 py-3 font-medium text-blue-900">
        {invoiceNo || "-"}
      </td>
      <td className="px-4 py-3 text-center text-black">{productName}</td>
      <td className="px-4 py-3 text-center text-black">{symbol}</td>

      <td className="px-4 py-3 text-center text-black">
        ₹{price?.toFixed(2) || "0.00"}
      </td>

      <td className="px-4 py-3 text-center text-black">{availableQty}</td>
      <td className="px-4 py-3 text-center text-black">{quantity}</td>
      <td className="px-4 py-3 text-center text-black">
        {availableQty + quantity || "-"}
      </td>
      <td className="px-4 py-3 text-center text-black">{availablePieces}</td>
      <td className="px-4 py-3 text-center text-black">{pieces}</td>

      <td className="px-4 py-3 text-center text-black">
        {availablePieces + pieces || "-"}
      </td>
        <td className="px-4 py-3 text-center text-black">
        {invoicePrice || "-"}
      </td>

      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <Link href={`/incoming/${_id}`}>
            <button className="text-blue-600 cursor-pointer hover:text-blue-800 transition">
              <Edit size={18} />
            </button>
          </Link>

          <button
            className="text-red-500 hover:text-red-700 transition"
            onClick={() => onDeleteClick({ id: _id, invoiceNo,    productId: data.productId,
 })}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};
