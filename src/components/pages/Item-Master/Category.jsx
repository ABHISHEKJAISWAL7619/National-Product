import React from "react";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";

const Category = ({ categoryId }) => {
  return (
    <div>
      <CreateCategory categoryId={categoryId} />
      <CategoryTable />
    </div>
  );
};

export default Category;
