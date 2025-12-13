"use client";

import Updateinput from "@/components/atoms/Updateinput";
import { Button } from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { categorySchema } from "@/validations/categorySchema";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "@/utils/toastMessage";
import React, { useEffect } from "react";
import {
  createMainCategory,
  updateMainCategory,
  fetchMainCategorybyid,
  fetchMainCategories,
} from "@/redux/slice/main-category";
import { useRouter } from "next/navigation";

const CreateCategory = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);
  let router = useRouter();

  const { formData, handleChange, setFormData, handleSubmit, errors, reset } =
    useForm({
      defaultValues: {
        category: "",
      },
      schema: categorySchema,
    });

  const fetchSingleCategory = async () => {
    try {
      const res = await dispatch(
        fetchMainCategorybyid({ categoryId })
      ).unwrap();
      if (res?.data) {
        setFormData({
          category: res.data.category || "",
        });
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to fetch category");
    }
  };

  useEffect(() => {
    if (categoryId) fetchSingleCategory();
  }, [dispatch, categoryId]);

  const onSubmit = async (data) => {
    try {
      if (categoryId) {
        await dispatch(
          updateMainCategory({ categoryId, categoryData: data })
        ).unwrap();
        router.replace("/Item-master/create-catgory");
        dispatch(fetchMainCategories());
        successToast("Category updated successfully!");
      } else {
        await dispatch(createMainCategory(data)).unwrap();
        dispatch(fetchMainCategories());
        successToast("Category created successfully!");
        reset();
      }
    } catch (error) {
      errorToast(error?.message || "Failed to save category");
    }
  };

  return (
    <div className="bg-white border-l border-r border-t border-gray-100 p-6">
      <h1 className="font-archivo font-bold text-[25px] leading-[28px]  text-black mt-5 mb-5">
        {categoryId ? "Update Category" : "Create Category"}
      </h1>

      <div className="max-w-[940px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-5">
            <Updateinput
              label="Name"
              type="text"
              placeholder="Enter Category Name"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              error={errors.category}
            />
          </div>

          <div className="flex gap-5 mt-2 w-full lg:w-[448px]">
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="text-white cursor-pointer bg-blue-950 font-inter font-bold text-[14px] leading-[21px] px-4 py-2 rounded-md"
            >
              {categoryId ? "Update Category" : "Save Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
