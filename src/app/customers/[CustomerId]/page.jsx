import Addnewcustomer from "@/components/pages/customers/Addnewcustomer";
import MainLayout from "@/components/templates/templates/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { CustomerId } = await params;
  return (
    <div>
      <MainLayout>
        <Addnewcustomer CustomerId={CustomerId} />
      </MainLayout>
    </div>
  );
};

export default page;
