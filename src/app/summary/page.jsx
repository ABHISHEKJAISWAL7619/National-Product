import Summary from "@/components/pages/summary/Summary";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { dateFrom, dateTo, q, page } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Summary
          dateFrom={dateFrom}
          dateTo={dateTo}
          searchQuery={q}
          currPage={page}
        />
      </MainLayout>
    </div>
  );
};

export default page;
