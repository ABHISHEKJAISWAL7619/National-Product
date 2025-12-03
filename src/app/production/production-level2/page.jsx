import ProductionLvl2 from "@/components/pages/Production/ProductionLvl2";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { page, dateTo, dateFrom } = await searchParams;
  return (
    <div>
      <MainLayout>
        <ProductionLvl2 currPage={page} dateTo={dateTo} dateFrom={dateFrom} />
      </MainLayout>
    </div>
  );
};

export default page;
