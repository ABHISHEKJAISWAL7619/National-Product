import Addstock from "@/components/pages/StockIn/Addstock";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <MainLayout>
        <Addstock />
      </MainLayout>
    </div>
  );
};

export default page;
