import UpdateItem from "@/components/pages/Item-Master/UpdateItem";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { iitemId } = await params;
  return (
    <div>
      <MainLayout>
        <UpdateItem ItemId={iitemId} />
      </MainLayout>
    </div>
  );
};

export default page;
