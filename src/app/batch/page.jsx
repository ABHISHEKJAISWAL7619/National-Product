import Batch from "@/components/pages/Batch-Creation/Batch";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  let { q, page, type } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Batch searchQuery={q} currPage={page} type={type} />
      </MainLayout>
    </div>
  );
};

export default page;
