import SubCategory from "@/components/pages/Item-Master/SubCategory";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { subcategoryId } = await params;
  return (
    <div>
      <MainLayout>
        <SubCategory subcategoryId={subcategoryId} />
      </MainLayout>
    </div>
  );
};

export default page;
