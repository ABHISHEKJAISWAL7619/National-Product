"use client";

import Updateinput from "@/components/atoms/Updateinput";
import { Button } from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "@/utils/toastMessage";
import React, { useEffect, useState } from "react";
import {
  fetchMainCategories, // ✅ use main categories
} from "@/redux/slice/main-category";
import {
  createSubCategory,
  fetchSubCategories,
  fetchSubCategorybyid,
  updateSubCategory,
} from "@/redux/slice/SubCategory";
import { useRouter } from "next/navigation";
import Select from "@/components/atoms/Select";
import { subCategorySchema } from "@/validations/subCategorySchema";
import Input from "@/components/common/Input";

const CreateSubCategory = ({ subcategoryId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.subcategory);
  const router = useRouter();

  const [allCategories, setAllCategories] = useState([]);

  const { formData, handleChange, setFormData, handleSubmit, errors, reset } =
    useForm({
      defaultValues: {
        name: "",
        category: "",
      },
      schema: subCategorySchema,
    });

  // ✅ Fetch single subcategory for edit
  const fetchSingleSubCategory = async () => {
    try {
      const res = await dispatch(
        fetchSubCategorybyid({ subcategoryId })
      ).unwrap();
      if (res?.data) {
        setFormData({
          name: res.data.name || "",
          category: res.data.category?._id || res.data.category || "",
        });
      }
    } catch (err) {
      errorToast("Failed to fetch subcategory");
    }
  };

  useEffect(() => {
    if (subcategoryId) fetchSingleSubCategory();
  }, [subcategoryId]);

  // ✅ Fetch all main categories for dropdown
  const fetchCategories = async () => {
    try {
      const res = await dispatch(fetchMainCategories({ filters: {} })).unwrap();
      if (res?.data) setAllCategories(res.data);
    } catch (err) {
      errorToast("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Handle create/update
  const onSubmit = async (data) => {
    try {
      if (subcategoryId) {
        await dispatch(
          updateSubCategory({ subcategoryId, subcategoryData: data })
        ).unwrap();
        successToast("Subcategory updated successfully!");
        router.replace("/Item-master/Create-SubCategory");
        dispatch(fetchSubCategories());
      } else {
        await dispatch(createSubCategory(data)).unwrap();
        dispatch(fetchSubCategories());
        successToast("Subcategory created successfully!");
        reset();
      }
    } catch (error) {
      errorToast(error?.message || "Failed to save subcategory");
    }
  };

  return (
    <div className="bg-white border-l border-r border-t border-gray-100 p-6">
      <h1 className="font-archivo font-bold text-[25px] leading-[28px]  text-black mt-5 mb-5">
        {subcategoryId ? "Update Subcategory" : "Create Subcategory"}
      </h1>

      <div className="max-w-[940px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input
              label="Subcategory Name"
              type="text"
              placeholder="Enter Subcategory Name"
              value={formData.name}
              className="max-w-[360px]"
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />

            <Select
              label="Select Category"
              placeholder="Select Category"
              options={allCategories}
              optionValue="_id"
              text="category"
              value={formData.category}
              onChange={(val) => handleChange("category", val)}
              error={errors.category}
              className="max-w-[360px] my-3"
            />
          </div>

          <div className="flex gap-5 mt-2 w-full lg:w-[448px]">
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="text-white max-w-[360px] cursor-pointer bg-blue-950 font-inter font-bold text-[14px] leading-[21px] px-4 py-2 rounded-md"
            >
              {subcategoryId ? "Update Subcategory" : "Save Subcategory"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubCategory;
