"use client";
import React, { useEffect, useState } from "react";
import { PenSquare, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchcompositions } from "@/redux/slice/composition-slice";
import SearchBox from "@/components/common/SearchBox";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/common/Button";

const ItemDetaiTable = ({ searchQuery, currPage }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { compositionList, documentCount } = useSelector(
    (state) => state.composition
  );

  useEffect(() => {
    dispatch(
      fetchcompositions({
        filters: { limit: 10, page: currPage, search: searchQuery },
      })
    );
  }, [dispatch, currPage, searchQuery]);

  return (
    <div className="w-full bg-white border-l border-r border-gray-100 font-inter">
      <h1 className="font-archivo font-bold text-[25px] leading-[28px] text-black">
        Composition
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mx-5 pt-10">
        <div className="flex-1">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by productname..."
          />
        </div>

        {/* <Link
          href={"/item-master/composition/add-new"}
          className="w-full sm:w-auto"
        >
          <Button>Create Composition</Button>
        </Link> */}
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
                "Waste",
                "Reusable",
                "Final",
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
                    ?.map((c) => ` ${c.percentage}%`)
                    .join(", ")}
                </td>

                {/* NEW COLUMNS */}
                <td className="px-6 py-4 text-blue-950">
                  {item.quantityUsed?.waste ?? 0}
                </td>

                <td className="px-6 py-4 text-blue-950">
                  {item.quantityUsed?.reuseable ?? 0}
                </td>

                <td className="px-6 py-4 text-blue-950">
                  {item.quantityUsed?.final ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Pagination pageSize={10} total={documentCount} />
      </div>
    </div>
  );
};

export default ItemDetaiTable;
