import Item from "@/components/pages/Item-Master/Item";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  let { q, page } = await searchParams;
  return (
    <div>
      <MainLayout>
        <Item searchQuery={q} currPage={page} />
      </MainLayout>
    </div>
  );
};

export default page;
