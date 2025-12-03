import Workprogress from "@/components/pages/WIP/Workprogress";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { page, q, type } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Workprogress page={page} searchQuery={q} type={type} />
      </MainLayout>
    </div>
  );
};

export default page;
