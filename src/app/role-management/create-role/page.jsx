import { Suspense } from "react";
import MainLayout from "@/components/templates/templates/MainLayout";
import CreateRole from "@/components/molecules/settings/CreateRole";

const page = () => {
  return (
    <MainLayout>
      <Suspense fallback={<>Loading...</>}>
        <CreateRole />
      </Suspense>
    </MainLayout>
  );
};

export default page;
