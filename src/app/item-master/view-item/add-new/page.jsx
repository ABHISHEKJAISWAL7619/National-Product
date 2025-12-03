import AddnewItem from "@/components/pages/Item-Master/AddnewItem";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <MainLayout>
        <AddnewItem />
      </MainLayout>
    </div>
  );
};

export default page;
