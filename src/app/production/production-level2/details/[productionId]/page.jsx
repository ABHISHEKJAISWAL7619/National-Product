import AddProduction1 from "@/components/pages/Production/AddProduction1";
import Detail from "@/components/pages/Production/Detail";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { productionId } = await params;
  return (
    <div>
      <MainLayout>
        <Detail productionId={productionId} />
      </MainLayout>
    </div>
  );
};

export default page;
