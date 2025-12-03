import Allcustomers from "@/components/pages/customers/Allcustomers";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { q, page } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Allcustomers searchQuery={q} currPage={page} />
      </MainLayout>
    </div>
  );
};

export default page;
