import CreateBatch from "@/components/pages/Batch-Creation/CreateBatch";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { batchId } = await params;
  return (
    <div>
      <MainLayout>
        <CreateBatch batchId={batchId} />
      </MainLayout>
    </div>
  );
};

export default page;
