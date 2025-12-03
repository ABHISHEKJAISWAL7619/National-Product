import AddnewItem from "@/components/pages/Item-Master/AddnewItem";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { ItemId } = await params;
  return (
    <div>
      <MainLayout>
        <AddnewItem ItemId={ItemId} />
      </MainLayout>
    </div>
  );
};

export default page;
