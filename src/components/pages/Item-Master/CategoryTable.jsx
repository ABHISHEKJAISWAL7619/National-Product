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

const CategoryTable = () => {
  const dispatch = useDispatch();

  const { categoryList, loading, dataLoading } = useSelector(
    (state) => state.category || {}
  );

  const safeCategoryList = Array.isArray(categoryList)
    ? categoryList
    : categoryList?.data?.categories || categoryList?.categories || [];

  const [isDelete, setIsDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchMainCategories({ filters: {} }));
  }, [dispatch]);

  const handleDeleteConfirm = async () => {
    if (!selectedCategory?._id) return;
    try {
      await dispatch(
        deleteMainCategory({ categoryId: selectedCategory._id })
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
    <div className="w-full bg-white border border-gray-200 rounded-lg font-inter shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : safeCategoryList.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              safeCategoryList.map((cat, index) => (
                <tr key={cat._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-blue-950">
                    {cat.category || "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/item-master/create-catgory/${cat._id}`}
                      className="mr-4 text-blue-500"
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
      </div>

      {/* ✅ Delete Confirmation Modal */}
      <OverlayModal
        onClose={() => setIsDelete(false)}
        isOpen={isDelete}
        showCloseIcon={false}
      >
        <AlertModal
          icon={<i className="ri-error-warning-line"></i>}
          iconColor="text-red-600 bg-grey-600 text-4xl"
          title="Delete Confirmation"
          message={
            <span>
              Are you sure you want to delete the category{" "}
              <span className="font-semibold text-blue-600">
                "{selectedCategory?.category}"
              </span>
              ?
            </span>
          }
          buttons={[
            {
              text: "Cancel",
              onClick: () => setIsDelete(false),
              colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
            },
            {
              text: "Delete",
              onClick: handleDeleteConfirm,
              colorClass: "bg-red-600 text-white hover:bg-red-700",
            },
          ]}
        />
      </OverlayModal>
    </div>
  );
};

export default CategoryTable;
