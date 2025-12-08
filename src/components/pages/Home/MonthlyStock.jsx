"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { monthlystockmovement } from "@/redux/slice/dashboard-slice";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// ⭐ Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div className="bg-white border border-gray-200 p-3 shadow-md rounded-lg text-sm">
        <p className="font-bold text-black ">{label}</p>
        <p className="text-navy text-black">Inbound: {item.inboundQuantity}</p>
        <p className="text-yellow text-black">
          Outbound: {item.outboundQuantity}
        </p>
      </div>
    );
  }
  return null;
};

const MonthlyStock = () => {
  const dispatch = useDispatch();
  const { monthlystockList } = useSelector((s) => s.dashboard);

  useEffect(() => {
    dispatch(monthlystockmovement());
  }, [dispatch]);

  // ⭐ Ensure chart data is formatted
  const chartData = useMemo(() => {
    return (
      monthlystockList?.map((x) => ({
        month: x?.month?.substring(0, 3) || "",
        inboundQuantity: Number(x?.inboundQuantity) || 0,
        outboundQuantity: Number(x?.outboundQuantity) || 0,
      })) ?? []
    );
  }, [monthlystockList]);

  const quickAccessItems = [
    { label: "Inventory Management", route: "/inventory" },
    { label: "Stock In Management", route: "/incoming/stock-in" },
    { label: "Production Management", route: "/production" },
    { label: "Dispatch Summary", route: "/dispatch" },
  ];

  return (
    <div className="flex justify-center py-10 bg-gray-50 font-inter px-4 sm:px-6 lg:px-1">
      <div className="flex flex-col lg:flex-row justify-between gap-8 w-full max-w-[1230px]">
        {/* 📊 Monthly Stock Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-sm w-full lg:w-1/2">
          <h2 className=" sm:text-xl md:text-[25px] font-archivo font-bold text-[25px] leading-[28px] mb-5 text-gray-800 text-center sm:text-left">
            Monthly Stock Movement
          </h2>

          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Inbound */}
                <Bar
                  dataKey="inboundQuantity"
                  fill="#1f3f6e"
                  name="Inbound"
                  radius={[6, 6, 0, 0]}
                />

                {/* Outbound */}
                <Bar
                  dataKey="outboundQuantity"
                  fill="#ffc107"
                  name="Outbound"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ⚡ Quick Access */}
        <div className="bg-white p-5 rounded-2xl shadow-sm w-full lg:w-1/2">
          <h2 className="text-lg sm:text-xl md:text-[25px] font-archivo font-bold text-[25px] leading-[28px] mb-4 text-gray-700 text-center sm:text-left">
            Quick Access
          </h2>

          <div className="space-y-3">
            {quickAccessItems.map((item) => (
              <Link href={item.route}>
                <div
                  key={item.label}
                  className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-all"
                >
                  <Image
                    src="/img/AceesArrow.png"
                    height={20}
                    width={20}
                    alt="Access"
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-900 font-medium">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStock;
