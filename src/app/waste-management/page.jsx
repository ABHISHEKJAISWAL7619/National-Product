import WasteManagement from "@/components/pages/waste-management";
import MainLayout from "@/components/templates/templates/MainLayout";
import React, { Suspense } from "react";

const page =async ({searchParams}) => {
    let { page,include,exclude } = await searchParams;

  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <WasteManagement currPage={page} include={include} exclude={exclude} />
      </Suspense>
    </MainLayout>
  );
};

export default page;

