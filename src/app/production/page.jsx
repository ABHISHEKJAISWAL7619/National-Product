import Product from "@/components/pages/Production/Product";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { q, page, dateTo, dateFrom, status, type } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Product
          searchQuery={q}
          currPage={page}
          dateTo={dateTo}
          dateFrom={dateFrom}
          type={type}
          status={status}
        />
      </MainLayout>
    </div>
  );
};

export default page;
