import Dispatch from "@/components/pages/Dispatch/Dispatch";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { q, type, page } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Dispatch type={type} searchQuery={q} currPage={page} />
      </MainLayout>
    </div>
  );
};

export default page;
