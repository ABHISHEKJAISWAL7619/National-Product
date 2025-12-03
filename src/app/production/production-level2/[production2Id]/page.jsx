import AddProduction1 from "@/components/pages/Production/AddProduction1";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { production2Id } = await params;
  return (
    <div>
      <MainLayout>
        <AddProduction1 production2Id={production2Id} />
      </MainLayout>
    </div>
  );
};

export default page;
