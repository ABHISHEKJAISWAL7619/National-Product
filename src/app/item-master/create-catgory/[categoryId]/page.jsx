import CreateCategory from "@/components/pages/Item-Master/CreateCategory";
import CreateTable from "@/components/pages/Item-Master/CategoryTable";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";
import Category from "@/components/pages/Item-Master/Category";

const page = async ({ params }) => {
  let { categoryId } = await params;
  return (
    <div>
      <MainLayout>
        <Category categoryId={categoryId} />
      </MainLayout>
    </div>
  );
};

export default page;
