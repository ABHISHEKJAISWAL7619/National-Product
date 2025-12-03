"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchpendingproductions } from "@/redux/slice/production-slice";
import { FormatDatetime } from "@/utils/formatDatetime";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import Input from "@/components/common/Input";

const Workprogress = ({ page, searchQuery, type }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const toggleQueryParam = useToggleQueryParam();

  const typeOptions = [
    { label: "Production (Level 1)", value: "Production" },
    { label: "Production2 (Level 2)", value: "Production2" },
  ];
  const { pendingproductList, documentCount } = useSelector(
    (state) => state.production
  );

  useEffect(() => {
    dispatch(
      fetchpendingproductions({
        filters: { limit: 10, page, search: searchQuery, type },
      })
    );
  }, [dispatch, page, searchQuery, type]);

  const tableHeaders = [
    "S.No",
    "Batch No",
    "Quantity",
    "Date",
    "Production Level",
    "Composition",
  ];

  return (
    <div className="w-full font-inter">
      <div className="w-full bg-white shadow-xl rounded-xl">
        <div className="p-6 border border-gray-100 flex flex-col space-y-4">
          <div className="flex flex-col space-y-4">
            <p className="font-archivo font-bold text-[25px] text-gray-900">
              Work In Progress
            </p>

            {/* Search Box (optional) */}
            {/* <SearchBox
      name="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      iconLeft="search-line"
      placeholder="Search here..."
    /> */}
          </div>

          {/* Type Filter */}
          <div className="w-full max-w-xs">
            <Input
              type="select"
              name="type"
              value={type}
              onChange={(e) => toggleQueryParam("type", e.target.value)}
              options={typeOptions}
              valueKey="value"
              labelKey="label"
              placeholderOption="Select Type"
              className="w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-5 text-left text-sm font-semibold text-gray-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {pendingproductList?.length > 0 ? (
                pendingproductList.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    {/* ---------------- S.NO ---------------- */}
                    <td className="px-6 py-4 text-[#003566] font-medium">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-[#003566]">
                      {item?.batch?.batchNo || item?.production?.batch?.batchNo}
                    </td>

                    <td className="px-6 py-4 text-[#003566]">
                      {item?.quantity || item?.semiFinishedKg}
                    </td>

                    <td className="px-6 py-4 text-[#003566]">
                      {FormatDatetime(item?.createdAt, "date")}
                    </td>

                    <td className="px-6 py-4 text-[#003566]">
                      {item.type === "Production" ? "Level 1" : "Level 2"}
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/work-in-progress/composition/${
                          item?.batch?._id || item?.production?.batch?._id
                        }`}
                      >
                        <i className="ri-file-list-3-line text-2xl text-blue-600 hover:text-blue-800 cursor-pointer"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="px-6 py-8 text-center text-gray-500 text-base"
                  >
                    No work in progress items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-end">
            <Pagination pageSize={10} total={documentCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workprogress;
