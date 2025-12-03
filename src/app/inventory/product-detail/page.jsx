import Financial from "@/components/pages/Inventory/Financial";
import General from "@/components/pages/Inventory/General";
import Lifecycle from "@/components/pages/Inventory/Lifecycle";
import Productdetail from "@/components/pages/Inventory/Productdetail";
import Stock from "@/components/pages/Inventory/Stock";
import TimeStamp from "@/components/pages/Inventory/TimeStamp";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <MainLayout>
        <Productdetail />
        <General/>
        <Stock/>
        <Lifecycle/>
        <TimeStamp/>
        <Financial/>
      </MainLayout>
    </div>
  );
};

export default page;
