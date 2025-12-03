import CreateItem from "@/components/pages/Item-Master/CreateItem";
import General from "@/components/pages/Item-Master/General";
import ItemasterTable from "@/components/pages/Item-Master/ItemasterTable";
import ItemDetaiTable from "@/components/pages/Item-Master/ItemDetaiTable";
import ItemmasterFincial from "@/components/pages/Item-Master/ItemmasterFincial";
import Lifecycle from "@/components/pages/Item-Master/Lifecycle";
import Stock from "@/components/pages/Item-Master/Stock";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ searchParams }) => {
  const { page, q } = await searchParams;
  return (
    <div>
      <MainLayout>
        {/* <CreateItem /> */}
        {/* <General /> */}
        <ItemDetaiTable currPage={page} searchQuery={q} />
        {/* <Stock /> */}
        {/* <Lifecycle /> */}
        {/* <ItemasterTable /> */}
        {/* <ItemmasterFincial /> */}
      </MainLayout>
    </div>
  );
};

export default page;
