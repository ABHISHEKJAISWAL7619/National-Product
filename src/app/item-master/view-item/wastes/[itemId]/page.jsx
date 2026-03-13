import Wastedetail from "@/components/pages/Item-Master/Wastedetail";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { itemId } = await params;
  return (
    <div>
      <MainLayout>
        <Wastedetail itemId={itemId} />
      </MainLayout>
    </div>
  );
};

export default page;
