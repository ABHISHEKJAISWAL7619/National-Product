import Addstock from "@/components/pages/StockIn/Addstock";
import Itemdetail from "@/components/pages/StockIn/Itemdetail";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  let { incomingId } = await params;
  return (
    <div>
      <MainLayout>
        <Addstock incomingId={incomingId} />
      </MainLayout>
    </div>
  );
};

export default page;
