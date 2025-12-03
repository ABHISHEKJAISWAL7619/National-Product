import Inventory from "@/components/pages/Inventory/Inventory";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { page, q } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Inventory page={page} searchQuery={q} />
      </MainLayout>
    </div>
  );
};

export default page;
