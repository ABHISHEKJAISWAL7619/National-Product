import Composition from "@/components/pages/Batch-Creation/Composition";
import CreateBatch from "@/components/pages/Batch-Creation/CreateBatch";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <MainLayout>
        <CreateBatch />
        {/* <Composition/> */}
      </MainLayout>
    </div>
  );
};

export default page;
