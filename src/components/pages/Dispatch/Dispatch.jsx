"use client";

import { useState } from "react";
import ProductSection from "./ProductSection";
import BillingSection from "./BillingSection";

export default function Dispatch({ searchQuery, type, currPage }) {
  const [billingItems, setBillingItems] = useState([]);

  return (
    <div className="max-h-content ">
      <div className="flex bg-gray-50 flex-col lg:flex-row gap-6 max-w-screen-xl mx-auto items-start">
        <ProductSection
          searchQuery={searchQuery}
          type={type}
          setBillingItems={setBillingItems}
          currPage={currPage}
        />
        <BillingSection
          billingItems={billingItems}
          setBillingItems={setBillingItems}
        />
      </div>
    </div>
  );
}
