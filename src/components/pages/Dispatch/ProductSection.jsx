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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FilePlus } from "lucide-react";

export default function ProductSection({
  setBillingItems,
  searchQuery,
  type,
  currPage,
}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { dispatchList = [], documentCount } = useSelector(
    (state) => state.dispatch,
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
      }),
    );
  }, [dispatch, searchQuery, type, currPage]);

  const handleAddClick = (product) => {
    setSelectedProduct(product);
    setPopupOpen(true);
  };
  const handleExport = async () => {
    try {
      const res = await dispatch(
        fetchdispatchitems({
          filters: {
            search: searchQuery,
            type,
            page: 1,
            limit: documentCount, 
          },
        }),
      ).unwrap();

      const data = res?.data || res?.dispatchList || [];

      if (!data.length) return;

      const page = Number(currPage) || 1;
      const pageSize = 10;

      const excelData = data.map((item, index) => ({
        "S.No": index + 1,
        "Product Name": item.productName,
        Type: item.type,
        Quantity: item.quantity,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Dispatch Products");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(blob, "Dispatch_Product_List.xlsx");
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-sm p-5">
      <Additem
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        product={selectedProduct}
        onAdd={(item) => setBillingItems((prev) => [...prev, item])}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Item Section
        </h2>

        <button
          onClick={handleExport}
          className="flex items-center cursor-pointer gap-2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          <FilePlus size={18} />
          Export
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-5 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by itemCode and itemname"
          />

          <Input
            type="select"
            name="type"
            value={type}
            onChange={(e) => toggleQueryParam("type", e.target.value)}
            options={typeOptions}
            valueKey="value"
            labelKey="label"
            className="min-w-[160px]"
          />
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="w-full max-w-[600px] text-sm">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left w-[35%]">Item Name</th>
                            <th className="px-4 py-3 text-center">Item Code</th>

              <th className="px-4 py-3 text-center">Type</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {dispatchList.length > 0 ? (
              dispatchList.map((p, index) => (
                <Row
                  key={index}
                  sno={((Number(currPage) || 1) - 1) * 10 + index + 1}
                  type={p?.type ||"-"}
                  product={p}
                  quantity={p?.quantity }
                  name={p?.productName || "-"}
                  productCode={p?.productCode}
                  onAdd={() => handleAddClick(p)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500 text-sm"
                >
                  No products found for dispatch.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end py-4">
        <Pagination total={documentCount} pageSize={10} />
      </div>
    </div>
  );
}

const Row = ({ sno, type, name, quantity,productCode, onAdd }) => {
  const badge =
    type === "item"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
      : "bg-indigo-100 text-indigo-700 border border-indigo-300";

  return (
    <tr className="hover:bg-gray-50 text-black transition border-b border-gray-200 ">
      <td className="px-4 py-3">{sno}</td>

      <td className="px-4 py-3 font-medium text-gray-800 truncate">{name}</td>
            <td className="px-4 py-3 font-medium text-gray-800 truncate">{productCode}</td>


      <td className="px-4 py-3 text-center">
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${badge}`}
        >
          {type}
        </span>
      </td>

      <td className="px-4 py-3 text-center font-semibold text-gray-900">
        {quantity}
      </td>

      <td className="px-4 py-3 text-center">
        <button
          onClick={onAdd}
          className="p-2 rounded-full cursor-pointer hover:bg-red-100 text-red-500"
        >
          <MdOutlinePlaylistAdd className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
