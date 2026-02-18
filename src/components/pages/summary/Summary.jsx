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
  console.log(dispatchList);
  console.log("count", documentCount);

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
  }, [dispatch, dateFrom, dateTo, searchQuery, currPage]);

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
    <div className="px-2 md:px-6 py-4">
      <h2 className="font-archivo font-bold text-[25px] leading-[28px] text-black tracking-normal mb-4">
        Summary
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-2 md:p-5">
        {/* Search Box */}
        <div className="flex-1 min-w-[200px]">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by Invoice No..."
          />
        </div>

        {/* From Date */}
        <div className="w-36 md:w-48">
          <Input
            label="From"
            type="date"
            value={dateFrom}
            onChange={(e) => toggleQueryParam("dateFrom", e.target.value)}
            className="w-full"
          />
        </div>

        {/* To Date */}
        <div className="w-36 md:w-48">
          <Input
            label="To"
            type="date"
            value={dateTo}
            onChange={(e) => toggleQueryParam("dateTo", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-300 shadow bg-white mt-4">
        <table className="min-w-full md:min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700 text-sm">
              <th className="p-3">Order No</th>
              <th className="p-3">Invoice No</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-left">Items</th>
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
                    <div className="flex flex-col gap-1">
                      {row.items?.map((i) => (
                        <span key={i._id}>{i.production1?.productName}</span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 text-center">{qtyKg}</td>
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

      {/* Totals */}
      <div className="mt-6 bg-white border border-gray-300 rounded-md p-4 overflow-x-auto">
        <div className="flex flex-wrap gap-4 min-w-[600px] md:min-w-full">
          {[
            { label: "Total Quantity", value: totals.totalQty },
            { label: "CGST", value: totals.totalCgst },
            { label: "SGST", value: totals.totalSgst },
            { label: "Sub Total", value: totals.totalSub },
            { label: "Amount", value: totals.totalAmount },
          ].map((total, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[180px] flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-2"
            >
              <span className="text-gray-700 font-medium">{total.label}</span>
              <span className="text-blue-900 font-semibold">{total.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Pagination total={documentCount} pageSize={10} />
      </div>
    </div>
  );
};

export default Summary;
