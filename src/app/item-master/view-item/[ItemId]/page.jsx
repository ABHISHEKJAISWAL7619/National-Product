import AddnewItem from "@/components/pages/Item-Master/AddnewItem";
import Singleitemdetail from "@/components/pages/Item-Master/Singleitemdetail";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { ItemId } = await params;
  return (
    <div>
      <MainLayout>
        <Singleitemdetail ItemId={ItemId} />
      </MainLayout>
    </div>
  );
};

export default page;
