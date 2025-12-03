import Addnewcustomer from "@/components/pages/customers/Addnewcustomer";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <MainLayout>
        <Addnewcustomer />
      </MainLayout>
    </div>
  );
};

export default page;
