import WasteManagement from "@/components/pages/waste-management";
import MainLayout from "@/components/templates/templates/MainLayout";
import React, { Suspense } from "react";

const page = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <WasteManagement />
      </Suspense>
    </MainLayout>
  );
};

export default page;