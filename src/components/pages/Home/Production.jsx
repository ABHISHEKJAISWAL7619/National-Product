"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchlowstock,
  weeklyproductiontrend,
} from "@/redux/slice/dashboard-slice";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

const Production = () => {
  const dispatch = useDispatch();
  const { trendList } = useSelector((s) => s.dashboard);
 const router = useRouter();
  useEffect(() => {
    dispatch(weeklyproductiontrend());
  }, [dispatch]);

  const formattedData =
    trendList?.map((item) => ({
      name: item.day.slice(0, 3), // Mon, Tue, Wed...
      units: item.totalKg ?? 0, // plotting totalKg
    })) || [];
  const [low, setLow] = useState("");
  console.log(low);
  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(
          fetchlowstock({ filters: { limit: 5 } }),
        ).unwrap();
        setLow(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-full flex flex-col lg:flex-row gap-5">
        {/* Left Card → Chart */}
        <div className="w-full lg:w-[820px] bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <h3 className="font-archivo text-black font-bold text-[25px] leading-[28px]  mb-3">
            Weekly Production Trend
          </h3>

          <div className="w-full h-[220px] sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#4B5563" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#4B5563" }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="units"
                  stroke="#FACC15"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-gray-600 text-center mt-2">
            🔹 Units Produced (Kg)
          </p>
        </div>

       <div className="w-full lg:w-[390px] bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col gap-4">
  <h3 className="font-bold text-black text-[25px] tracking-normal">
    Low Stock Alerts
  </h3>

  {/* content ko grow karne do */}
  <div className="space-y-3 text-[14px] sm:text-[15px] flex-1">
    {low?.length > 0 ? (
      low.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-gray-100 pb-1"
        >
          <span className="font-medium text-black text-[16px] capitalize">
            {item.productName}
          </span>

          <div className="flex items-center gap-1">
            <span className="text-red-600 font-semibold">
              {item.quantity}
            </span>
            <Image
              src="/img/Icon.png"
              height={15}
              width={15}
              alt="alert"
            />
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No low stock items</p>
    )}
  </div>

  {/* 👇 Button bilkul bottom */}
  {low?.length > 0 && (
    <Button
     onClick={() => router.push("/low-stocks")}
      className="mt-auto w-full rounded-lg bg-black text-white py-2 text-sm font-semibold hover:bg-gray-800 transition"
    >
      View All Low Stocks
    </Button>
  )}
</div>

      </div>
    </div>
  );
};

export default Production;
