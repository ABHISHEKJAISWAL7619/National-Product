import CreateCategory from "@/components/pages/Item-Master/CreateCategory";
import CreateTable from "@/components/pages/Item-Master/CategoryTable";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";
import Category from "@/components/pages/Item-Master/Category";

const page = () => {
  return (
    <div>
      <MainLayout>
        <Category />
      </MainLayout>
    </div>
  );
};

export default page;
