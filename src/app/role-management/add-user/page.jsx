"use client";

import { Suspense } from "react";
import AddUser from "@/components/molecules/settings/AddUser";
import MainLayout from "@/components/templates/templates/MainLayout";

const Page = () => {
  return (
    <MainLayout>
      <Suspense fallback={<>Loading...</>}>
        <AddUser />
      </Suspense>
    </MainLayout>
  );
};

export default Page;
