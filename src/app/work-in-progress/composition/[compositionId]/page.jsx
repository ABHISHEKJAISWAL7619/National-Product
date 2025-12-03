import Composition1 from "@/components/pages/WIP/Composition1";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { compositionId } = await params;
  return (
    <div>
      <MainLayout>
        <Composition1 compositionId={compositionId} />
      </MainLayout>
    </div>
  );
};

export default page;
