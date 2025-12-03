import AddProduction from "@/components/pages/Production/AddProduction";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { productionId } = await params;
  return (
    <div>
      <MainLayout>
        <AddProduction productionId={productionId} />
      </MainLayout>
    </div>
  );
};

export default page;
