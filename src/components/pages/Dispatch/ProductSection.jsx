"use client";

import { useEffect, useState } from "react";
import Additem from "./Additem";
import { useDispatch, useSelector } from "react-redux";
import { fetchdispatchitems } from "@/redux/slice/dispatch-slice";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SearchBox from "@/components/common/SearchBox";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";

export default function ProductSection({
  setBillingItems,
  searchQuery,
  type,
  currPage,
}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { dispatchList = [], documentCount } = useSelector(
    (state) => state.dispatch
  );
  const toggleQueryParam = useToggleQueryParam();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const typeOptions = [
    { label: "Production (Level 1)", value: "production" },
    { label: "Production2 (Level 2)", value: "production2" },
  ];
  useEffect(() => {
    dispatch(
      fetchdispatchitems({
        filters: {
          search: searchQuery,
          type,
          page: currPage,
          limit: 10,
        },
      })
    );
  }, [dispatch, searchQuery, type]);

  const handleAddClick = (product) => {
    setSelectedProduct(product);
    setPopupOpen(true);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <Additem
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        product={selectedProduct}
        onAdd={(item) => setBillingItems((prev) => [...prev, item])}
      />

      <div className="p-5 border-b border-gray-200 bg-gray-50/60">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Section
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search here..."
          />

          <Input
            type="select"
            name="type"
            value={type}
            onChange={(e) => toggleQueryParam("type", e.target.value)}
            options={typeOptions}
            valueKey="value"
            labelKey="label"
            className="min-w-[180px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-7 text-[13px] font-semibold text-gray-600 uppercase tracking-wide bg-gray-100 p-3 border-b border-gray-200">
        <div>S.No</div>
        <div className="col-span-3">Product Name</div>
        <div className="text-center">Type</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Action</div>
      </div>

      <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
        {dispatchList.length > 0 ? (
          dispatchList.map((p, index) => (
            <ProductRow
              key={index}
              sno={index + 1}
              type={p.type}
              name={p.productName}
              quantity={p.quantity}
              onAddClick={() => handleAddClick(p)}
            />
          ))
        ) : (
          <div className="py-10 text-center text-gray-500 text-sm">
            No products found for dispatch.
          </div>
        )}
        <div className="flex justify-end">
          <Pagination total={documentCount} pageSize={10} />
        </div>{" "}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 7px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}

const ProductRow = ({ sno, type, name, quantity, onAddClick }) => {
  const badgeClasses =
    type === "item"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
      : "bg-indigo-100 text-indigo-700 border border-indigo-300";

  return (
    <div className="grid grid-cols-7 items-center py-4 px-4 text-sm border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
      <div className="text-gray-600 font-medium">{sno}</div>
      <div className="col-span-3 font-semibold text-gray-800 truncate pr-3">
        {name}
      </div>
      <div className="flex justify-center">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${badgeClasses}`}
        >
          {type}
        </span>
      </div>
      <div className="text-gray-900 font-bold text-center">{quantity}</div>
      <div className="flex justify-center">
        <button
          onClick={onAddClick}
          className="p-2 rounded-full cursor-pointer hover:bg-red-100 text-red-500 transition"
          title="Add to billing"
        >
          <MdOutlinePlaylistAdd className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
