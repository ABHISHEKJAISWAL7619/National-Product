import Productdetail from "@/components/pages/Inventory/Productdetail";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { itemId } = await params;
  return (
    <div>
      <MainLayout>
        <Productdetail itemId={itemId} />
      </MainLayout>
    </div>
  );
};

export default page;
