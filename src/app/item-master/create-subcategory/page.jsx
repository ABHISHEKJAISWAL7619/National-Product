import SubCategory from "@/components/pages/Item-Master/SubCategory";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { page, q } = await searchParams;
  return (
    <div>
      <MainLayout>
        <SubCategory currPage={page} searchQuery={q} />
      </MainLayout>
    </div>
  );
};

export default page;
