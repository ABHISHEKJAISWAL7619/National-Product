"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/common/Input";
import Select from "@/components/atoms/Select";
import { Button } from "@/components/common/Button";

import { useForm } from "@/hooks/useForm";
import { stockSchema } from "@/validations/stockSchema";

import {
  fetchItembyid,
  updateItem,
} from "@/redux/slice/Item-slice";

import { fetchMainCategories } from "@/redux/slice/main-category";
import { fetchSubCategories } from "@/redux/slice/SubCategory";

import { successToast, errorToast } from "@/utils/toastMessage";
import { useRouter } from "next/navigation";

const UpdateItem = ({ ItemId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { categoryList } = useSelector((state) => state.category);
  const { SubcategoryList } = useSelector((state) => state.subcategory);
  const { singleItem, loading } = useSelector((state) => state.item);

  const { formData, handleChange, setFormData, handleSubmit, errors } =
    useForm({
      defaultValues: {
        productName: "",
        category: "",
        subcategory: "",
        unitPrice: "",
        symbol: "",
        productCode: "",
      },
      schema: stockSchema,
    });

  /* ---------------- Fetch Categories ---------------- */

  useEffect(() => {
    dispatch(fetchMainCategories({ filters: { limit: 200 } }));
  }, [dispatch]);

  /* ---------------- Fetch Item ---------------- */

  useEffect(() => {
    if (ItemId) {
      dispatch(fetchItembyid({ ItemId }));
    }
  }, [ItemId, dispatch]);

  /* ---------------- Prefill Form ---------------- */

  useEffect(() => {
    if (singleItem) {
      // Prefill only IDs
      setFormData({
        productName: singleItem.productName || "",
        category: singleItem.category?._id || "",
        subcategory: singleItem.subcategory?._id || "",
        unitPrice: singleItem.unitPrice || "",
        symbol: singleItem.symbol || "",
        productCode: singleItem.productCode || "",
      });

      // Fetch subcategories based on category ID
      if (singleItem.category?._id) {
        dispatch(
          fetchSubCategories({
            filters: {
              category: singleItem.category._id,
              limit: 200,
            },
          })
        );
      }
    }
  }, [singleItem, setFormData, dispatch]);

  /* ---------------- Submit ---------------- */

  const onSubmit = async (data) => {
    try {
      const payload = {
        productName: data.productName,
        category: data.category,       // sending ID
        subcategory: data.subcategory, // sending ID
        unitPrice: data.unitPrice,
        symbol: data.symbol,
        productCode: data.productCode,
      };

      await dispatch(
        updateItem({
          ItemId,
          ItemData: payload,
        })
      ).unwrap();
      router.push("/item-master/view-item")

      successToast("Item updated successfully!");
    } catch (err) {
      errorToast(err?.message || "Update failed!");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Update Item
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Product Name"
          value={formData.productName}
          onChange={(e) => handleChange("productName", e.target.value)}
          error={errors.productName}
        />

        <Select
          label="Category"
          value={formData.category}
          options={
            categoryList?.map((c) => ({
              label: c.category,
              value: c._id, // ✅ correct
            })) || []
          }
          onChange={(v) => handleChange("category", v)}
          error={errors.category}
        />

        <Select
          label="Subcategory"
          value={formData.subcategory}
          options={
            SubcategoryList?.map((s) => ({
              label: s.name,
              value: s._id, // ✅ correct
            })) || []
          }
          onChange={(v) => handleChange("subcategory", v)}
          error={errors.subcategory}
        />

        <Input
          label="Unit Price"
          type="number"
          value={formData.unitPrice}
          onChange={(e) => handleChange("unitPrice", e.target.value)}
          error={errors.unitPrice}
        />

        <Input
          label="Symbol"
          value={formData.symbol}
          onChange={(e) => handleChange("symbol", e.target.value)}
          error={errors.symbol}
        />

        <Input
          label="Product Code"
          value={formData.productCode}
          onChange={(e) => handleChange("productCode", e.target.value)}
          error={errors.productCode}
        />

        <Button type="submit" loading={loading}>
          Update Item
        </Button>
      </form>
    </div>
  );
};

export default UpdateItem;