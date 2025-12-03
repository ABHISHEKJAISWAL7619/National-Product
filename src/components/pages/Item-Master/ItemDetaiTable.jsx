"use client";
import React, { useEffect, useState } from "react";
import { PenSquare, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchcompositions } from "@/redux/slice/composition-slice";
import SearchBox from "@/components/common/SearchBox";
import Pagination from "@/components/common/Pagination";

const ItemDetaiTable = ({ searchQuery, currPage }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { compositionList, documentCount } = useSelector(
    (state) => state.composition
  );
  console.log(compositionList);

  useEffect(() => {
    dispatch(
      fetchcompositions({
        filters: { limit: 10, page: currPage, search: searchQuery },
      })
    );
  }, [dispatch, currPage, searchQuery]);

  return (
    <div className="w-full bg-white border-l border-r border-gray-100 font-inter">
      <h1 className="font-archivo font-bold text-[25px] leading-[28px]  text-black">
        Composition
      </h1>
      <div className="flex mx-5 pt-10 justify-between">
        <SearchBox
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft="search-line"
          placeholder="Search here..."
        />

        <Link href={"/item-master/composition/add-new"}>
          <div className="bg-blue-950 px-3 py-2 flex gap-2 rounded-md text-white cursor-pointer">
            <Plus className="mt-1" />
            <button>Create Composition</button>
          </div>
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "SI No",
                "Product",
                "Category",
                "Sub Category",
                "Composed Of",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {compositionList?.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-blue-950">{index + 1}</td>

                <td className="px-6 py-4 text-blue-950">{item.productName}</td>

                <td className="px-6 py-4 text-blue-950">
                  {item.category?.category}
                </td>

                <td className="px-6 py-4 text-blue-950">
                  {item.subcategory?.name}
                </td>

                <td className="px-6 py-4 text-blue-950 whitespace-normal break-words">
                  {item.compositions
                    ?.map((c) => `${c.item?.productName} (${c.percentage}%)`)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end ">
        <Pagination pageSize={10} total={documentCount} />
      </div>
    </div>
  );
};

export default ItemDetaiTable;
