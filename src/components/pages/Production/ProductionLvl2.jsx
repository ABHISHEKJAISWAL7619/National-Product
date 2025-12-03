"use client";
import React, { useEffect } from "react";
import { FilePlus2, Edit3 } from "lucide-react";
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
  console.log(productionList);

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

      <div className="overflow-x-auto mt-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border border-gray-200">
            <tr>
              {[
                "Date",
                "Batch No.",
                "Production",
                "Gauge",
                "Flux %",
                "Flux (Qty)",
                "Gula Used (Kg)",
                "Semi Finished (Kg)",
                "Total  Used",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className={`px-4 md:px-6 py-5 font-inter font-medium text-[13px] md:text-[14px] leading-[21px] text-gray-700 bg-gray-100 ${
                    [
                      "Production",
                      "Gauge",
                      "Flux %",
                      "Flux (Qty)",
                      "Gulfa Used (Kg)",
                      "Semi Finished (Kg)",
                      "Total  Used",
                    ].includes(header)
                      ? "text-right whitespace-nowrap"
                      : "text-left whitespace-nowrap"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y border  border-gray-200 divide-gray-100">
            {productionList?.length > 0 ? (
              productionList.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Date */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-blue-950 whitespace-nowrap">
                    {FormatDatetime(item.createdAt, "date")}
                  </td>

                  {/* Batch No */}
                  <td className="px-4 md:px-6 py-4 text-[14px] font-medium text-blue-950 whitespace-nowrap cursor-pointer">
                    <Link
                      href={`/production/production-level2/details/${item._id}`}
                      className="hover:underline text-blue-600"
                    >
                      {item.batch?.batchNo || "-"}
                    </Link>
                  </td>

                  {/* Production (quantity/kgs) */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    {item.batch?.quantity || "-"}
                  </td>

                  {/* Gauge */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    -
                  </td>

                  {/* Flux % */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    -
                  </td>

                  {/* Flux Qty */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    -
                  </td>

                  {/* Gulfa Used Kg */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    {item.semiFinishedKg ?? "-"}
                  </td>

                  {/* Semi Finished Kg */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    {item.semiPieces ?? "-"}
                  </td>

                  {/* Total Consumed Used */}
                  <td className="px-4 md:px-6 py-4 text-[14px] text-right text-blue-950 whitespace-nowrap">
                    -
                  </td>

                  {/* Action */}
                  <td className="px-4 sm:px-6 py-4 text-center">
                    <Link href={`/production/production-level2/${item._id}`}>
                      <button className="text-blue-600 p-1 cursor-pointer rounded-full hover:bg-blue-50 transition">
                        <Edit3 size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-10 text-gray-500 text-base md:text-lg"
                >
                  No production records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end">
          <Pagination total={documentCount} pageSize={10} />
        </div>
      </div>
    </div>
  );
};

export default ProductionLvl2;
