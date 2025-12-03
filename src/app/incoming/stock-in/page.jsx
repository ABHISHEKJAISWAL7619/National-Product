import Stockin from "@/components/pages/StockIn/Stockin";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { page, q } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Stockin currPage={page} searchQuery={q} />
      </MainLayout>
    </div>
  );
};

export default page;
