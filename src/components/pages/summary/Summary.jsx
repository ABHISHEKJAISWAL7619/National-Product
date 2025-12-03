"use client";

import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";
import { fetchalldispatch } from "@/redux/slice/dispatch-slice";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Summary = ({ dateFrom, dateTo, currPage, searchQuery }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const toggleQueryParam = useToggleQueryParam();
  const { dispatchList, documentCount } = useSelector(
    (state) => state.dispatch
  );

  useEffect(() => {
    dispatch(
      fetchalldispatch({
        filters: {
          dateFrom,
          dateTo,
          search: searchQuery,
          page: currPage,
          limit: 10,
        },
      })
    );
  }, [dispatch, dateFrom, dateTo, searchQuery]);

  const round2 = (n) => Number(n || 0).toFixed(2);

  const totals = useMemo(() => {
    let totalQty = 0;
    let totalSub = 0;
    let totalAmount = 0;
    let totalCgst = 0;
    let totalSgst = 0;

    dispatchList?.forEach((row) => {
      const qty = row.items?.reduce(
        (sum, i) => sum + Number(i.quantity || 0),
        0
      );

      totalQty += qty;
      totalSub += Number(row.subTotal || 0);
      totalAmount += Number(row.total || 0);
      totalCgst += Number(row.cgst || 0);
      totalSgst += Number(row.sgst || 0);
    });

    return {
      totalQty: round2(totalQty),
      totalSub: round2(totalSub),
      totalAmount: round2(totalAmount),
      totalCgst: round2(totalCgst),
      totalSgst: round2(totalSgst),
    };
  }, [dispatchList]);

  return (
    <div className="">
      <h2 className="font-archivo font-bold text-[25px] leading-[28px]  text-black tracking-normal">
        Summary
      </h2>
      <div className="flex flex-wrap items-center p-5">
        <div className="flex-1 mt-6 ">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by Invoiceno....."
          />
        </div>
        <div className="flex flex-col mr-5">
          <Input
            label={"From"}
            type="date"
            value={dateFrom}
            onChange={(e) => toggleQueryParam("dateFrom", e.target.value)}
            className="min-w-[170px]"
          />
        </div>

        <div className="flex flex-col">
          <Input
            label={"To"}
            type="date"
            value={dateTo}
            onChange={(e) => toggleQueryParam("dateTo", e.target.value)}
            className="min-w-[170px]"
          />
        </div>
      </div>
      <div className=" rounded-xl shadow bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700 text-sm">
              <th className="p-3">Order No</th>
              <th className="p-3">Invoice No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Items</th>
              <th className="p-3">Quantity (Kg)</th>
              <th className="p-3">Customer</th>
              <th className="p-3">CGST</th>
              <th className="p-3">SGST</th>
              <th className="p-3">Sub Total</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {dispatchList?.map((row, index) => {
              const qtyKg = row.items?.reduce(
                (sum, i) => sum + Number(i.quantity || 0),
                0
              );

              return (
                <tr key={index} className="hover:bg-gray-50 text-gray-800">
                  <td className="p-3">#{row._id.slice(0, 5)}</td>

                  <td className="p-3">{row.invoiceNo}</td>

                  <td className="p-3">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {row.items
                      ?.map((i) => i.production2?.productName || "-")
                      .join(", ")}
                  </td>

                  <td
                    className="p-3 text-center
                  "
                  >
                    {qtyKg}
                  </td>

                  <td className="p-3">
                    {row.customer
                      ? row.customer.firstName +
                        " " +
                        (row.customer.lastName || "")
                      : "-"}
                  </td>

                  <td className="p-3">{round2(row.cgst)}</td>
                  <td className="p-3">{round2(row.sgst)}</td>
                  <td className="p-3">{round2(row.subTotal)}</td>
                  <td className="p-3">{round2(row.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-gray-50  rounded-md p-4">
        <div className="flex flex-wrap gap-4">
          {/* Total Qty */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-2 min-w-[200px]">
            <span className="text-gray-700 font-medium">Total Quantity</span>
            <span className="text-blue-900 font-semibold">
              {totals.totalQty}
            </span>
          </div>

          {/* CGST */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-2 min-w-[200px]">
            <span className="text-gray-700 font-medium">CGST</span>
            <span className="text-blue-900 font-semibold">
              {totals.totalCgst}
            </span>
          </div>

          {/* SGST */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-2 min-w-[200px]">
            <span className="text-gray-700 font-medium">SGST</span>
            <span className="text-blue-900 font-semibold">
              {totals.totalSgst}
            </span>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-2 min-w-[200px]">
            <span className="text-gray-700 font-medium">Sub Total</span>
            <span className="text-blue-900 font-semibold">
              {totals.totalSub}
            </span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-2 min-w-[200px]">
            <span className="text-gray-700 font-medium">Amount</span>
            <span className="text-blue-900 font-semibold">
              {totals.totalAmount}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Pagination total={documentCount} pageSize={10} />
      </div>{" "}
    </div>
  );
};

export default Summary;
