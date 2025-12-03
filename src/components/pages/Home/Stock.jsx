"use client";
import Card from "@/components/molecules/Card";
import { fetchstatcard } from "@/redux/slice/dashboard-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { Package, Factory, Truck } from "lucide-react";

const Stock = () => {
  const { statcardList } = useSelector((s) => s.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchstatcard());
  }, [dispatch]);

  // Dynamic card data from API
  const formattedCards = [
    {
      title: "Today's Stock In",
      icon: <Package className="w-6 h-6 text-blue-900" />,
      value: statcardList?.totalStockInQty ?? 0,
      max: 5000,
    },
    {
      title: "Today's Production Output",
      icon: <Factory className="w-6 h-6 text-blue-900" />,
      value: statcardList?.totalProductionKg ?? 0,
      max: 8000,
    },
    {
      title: "Today's Dispatch Summary",
      icon: <Truck className="w-6 h-6 text-blue-900" />,
      value: statcardList?.totalSoldQty ?? 0,
      max: 4000,
    },
  ];

  return (
    <div className="w-full mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {formattedCards.map((item, idx) => {
          const progress = Math.min((item.value / item.max) * 100, 100);

          return (
            <Card
              key={idx}
              title={
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              }
              value={item.value}
              progressColor="bg-yellow-400"
              customProgressWidth={`${progress}%`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stock;
