"use client";
import React, { useEffect } from "react";
import { FilePlus2, Edit3, Eye } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductions } from "@/redux/slice/production-slice";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import { FormatDatetime } from "@/utils/formatDatetime";
import { Button } from "@/components/common/Button";

const ProductionLvl2 = ({ currPage, dateTo, dateFrom }) => {
  const dispatch = useDispatch();
  const toggleQueryParam = useToggleQueryParam();
  const { productionList, loading, documentCount } = useSelector(
    (state) => state.production
  );
  // console.log(productionList);

  useEffect(() => {
    dispatch(
      fetchProductions({
        filters: {
          type: "solderingWire",
          dateTo,
          dateFrom,
          page: currPage,
          limit: 10,
        },
      })
    );
  }, [dispatch, currPage, dateTo, dateFrom]);
  return (
    <div className="w-full  font-inter min-h-screen">
      <div
        className="p-4 md:p-6 rounded-md 
  flex flex-wrap items-center justify-between gap-4"
      >
        <h2 className="font-archivo font-bold text-[25px] leading-[28px]  text-black whitespace-nowrap">
          Production Level - 02
        </h2>

        {/* BUTTON */}
        <Link
          href="/production/production-level2/add-production"
          className="w-full sm:w-auto"
        >
          <Button className="cursor-pointer">
            <FilePlus2 size={16} />
            <span>Add Production</span>
          </Button>
        </Link>
      </div>
      <div className="flex items-center m-4 gap-4 max-w-[50%]">
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
      </div>

      <div className="overflow-x-auto mt-4 rounded-xl  shadow-sm">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                S.NO
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                DATE
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                BATCH NO.
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                PRODUCTION
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {productionList?.length > 0 ? (
              productionList.map((item, i) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{i + 1}</td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    {FormatDatetime(item.createdAt, "date")}
                  </td>

                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">
                    <Link
                      href={`/production/production-level2/details/${item._id}`}
                      className="hover:underline"
                    >
                      {item.batch?.batchNo || "-"}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-sm text-right text-gray-800">
                    {item.batch?.quantity || "-"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/production/production-level2/details/${item._id}`}
                    >
                      <button className="text-blue-600 cursor-pointer p-2 rounded-full hover:bg-blue-50">
                        <Eye size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No production records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end p-4  bg-white">
          <Pagination total={documentCount} pageSize={10} />
        </div>
      </div>
    </div>
  );
};

export default ProductionLvl2;
