"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMainCategories,
  deleteMainCategory,
} from "@/redux/slice/main-category";
import { errorToast, successToast } from "@/utils/toastMessage";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import "remixicon/fonts/remixicon.css";
import {
  deleteSubCategory,
  fetchSubCategories,
} from "@/redux/slice/SubCategory";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/common/SearchBox";

const SubCategoryTable = ({ searchQuery, currPage }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { SubcategoryList, loading, dataLoading, documentCount } = useSelector(
    (state) => state.subcategory || {}
  );

  const safeSubcategoryList = Array.isArray(SubcategoryList)
    ? SubcategoryList
    : SubcategoryList?.data?.categories || SubcategoryList?.categories || [];

  const [isDelete, setIsDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(
      fetchSubCategories({
        filters: { page: currPage, limit: 10, search: searchQuery },
      })
    );
  }, [dispatch, currPage, searchQuery]);

  const handleDeleteConfirm = async () => {
    if (!selectedCategory?._id) return;
    try {
      await dispatch(
        deleteSubCategory({ subcategoryId: selectedCategory._id })
      ).unwrap();
      successToast("Category deleted successfully");
      setIsDelete(false);
      setSelectedCategory(null);
    } catch (err) {
      errorToast(err.message || "Failed to delete category");
    }
  };

  const isLoading = loading || dataLoading;

  return (
    <>
      <div className="flex flex-col gap-4 mx-2 my-5">
        {/* Search box */}
        <div className="w-full">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search here..."
          />
        </div>

        {/* Table container with responsive scroll */}
        <div className="w-full overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-[600px] md:min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  S.No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : safeSubcategoryList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                safeSubcategoryList.map((cat, index) => (
                  <tr key={cat._id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-950">
                      {cat?.name || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-950">
                      {cat?.category?.category || "-"}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-2">
                      <Link
                        href={`/item-master/create-subcategory/${cat._id}`}
                        className="text-blue-500"
                      >
                        <i className="ri-edit-box-line cursor-pointer text-lg font-light"></i>
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDelete(true);
                        }}
                      >
                        <i className="ri-delete-bin-6-line cursor-pointer text-lg font-light"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <Pagination total={documentCount} pageSize={10} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryTable;
