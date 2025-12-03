import React from "react";
import CreateSubCategory from "./CreateSubCategory";
import SubCategoryTable from "./SubCategoryTable";

const SubCategory = ({ subcategoryId, currPage, searchQuery }) => {
  return (
    <div>
      <CreateSubCategory subcategoryId={subcategoryId} />
      <SubCategoryTable searchQuery={searchQuery} currPage={currPage} />
    </div>
  );
};

export default SubCategory;
