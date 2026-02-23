"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Select from "@/components/atoms/Select";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";

import { useForm } from "@/hooks/useForm";
import { stockSchema } from "@/validations/stockSchema";
import { compositionSchema } from "@/validations/compositionSchema";

import { fetchMainCategories } from "@/redux/slice/main-category";
import { fetchSubCategories } from "@/redux/slice/SubCategory";
import { fetchitems, createItem, getallitems } from "@/redux/slice/Item-slice";

import { successToast, errorToast } from "@/utils/toastMessage";

const UnifiedItemCompositionForm = () => {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);
  const { SubcategoryList } = useSelector((state) => state.subcategory);
  const { itemList, loading } = useSelector((state) => state.item);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        // common
        productName: "",
        category: "",
        subcategory: "",
        symbol: "",
        productCode: "",

        // item form
        unitPrice: "",

        // composition form
        compositions: [{ itemId: "", percentage: "" }],
        factoryOverhead:0,
      },
      schema: Yup.lazy((values) => {
        const categoryName = getCategoryName(values.category);
        if (["rm", "raw material"].includes(categoryName)) {
          return stockSchema;
        }
        return compositionSchema;
      }),
    });

  /* ---------------- helpers ---------------- */

  const getCategoryName = (catId) => {
    const cat = categoryList?.find((c) => c._id === catId);
    return cat?.category?.toLowerCase() || "";
  };

  const selectedCategoryName = useMemo(
    () => getCategoryName(formData.category),
    [formData.category, categoryList],
  );

  const isRMCategory = ["rm", "raw material"].includes(selectedCategoryName);

  /* ---------------- effects ---------------- */

  useEffect(() => {
    dispatch(fetchMainCategories({ filters: { limit: 200 } }));
  }, [dispatch]);

  useEffect(() => {
    if (!formData.category) return;

    dispatch(
      fetchSubCategories({
        filters: { category: formData.category, limit: 200 },
      }),
    );

    // reset subcategory + composition when category changes
    setFormData((prev) => ({
      ...prev,
      subcategory: "",
      compositions: [{ itemId: "", percentage: "" }],
    }));
  }, [formData.category, dispatch, setFormData]);

  useEffect(() => {
    if (!isRMCategory) {
      let filters = { limit: 200 };

      if (formData.subcategory) {
        // subcategory priority
        filters.subcategory = formData.subcategory;
      } else if (formData.category) {
        // only category if no subcategory
        filters.category = formData.category;
      }

      dispatch(getallitems({ filters }));
    }
  }, [formData.category, formData.subcategory, dispatch, isRMCategory]);

  const totalPercentage = formData.compositions.reduce(
    (sum, c) => sum + Number(c.percentage || 0),
    0,
  );

  const addComposition = () =>
    setFormData((prev) => ({
      ...prev,
      compositions: [...prev.compositions, { itemId: "", percentage: "" }],
    }));

  const removeComposition = (index) =>
    setFormData((prev) => ({
      ...prev,
      compositions: prev.compositions.filter((_, i) => i !== index),
    }));

  /* ---------------- submit ---------------- */

  const onSubmit = async (data) => {
    try {
      // RM / RAW MATERIAL → ITEM FORM
      if (isRMCategory) {
        const payload = {
          productName: data.productName,
          category: data.category,
          subcategory: data.subcategory,
          unitPrice: data.unitPrice,
          symbol: data.symbol,
          productCode: data.productCode,
        };

        await dispatch(createItem({ itemData: payload })).unwrap();
        successToast("Item created successfully!");
      }

      // OTHER CATEGORY → COMPOSITION FORM
      else {
        if (totalPercentage !== 100) {
          return errorToast("Total percentage must equal 100%");
        }

        const payload = {
          category: data.category,
          subcategory: data.subcategory,
          productName: data.productName,
          symbol: data.symbol,
          productCode: data.productCode,
          compositions: data.compositions.map((c) => ({
            item: c.itemId,
            percentage: Number(c.percentage),
          })),
          factoryOverhead:data.factoryOverhead ||0,
        };

        await dispatch(createItem({ itemData: payload })).unwrap();
        successToast("Composition created successfully!");
      }

      reset();
    } catch (err) {
      errorToast(err?.message || "Failed to save!");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">
        Create Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Common Fields */}
        <Input
          label="Product / Composition Name"
          placeholder="Enter name"
          value={formData.productName}
          onChange={(e) => handleChange("productName", e.target.value)}
          error={errors.productName}
        />

        <Select
          label="Select Category"
          value={formData.category}
          options={
            categoryList?.map((c) => ({
              label: c.category,
              value: c._id,
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
              value: s._id,
            })) || []
          }
          onChange={(v) => handleChange("subcategory", v)}
          error={errors.subcategory}
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

        {/* ================= RM / RAW MATERIAL FORM ================= */}
        {isRMCategory && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Price (Per Unit)"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
                error={errors.unitPrice}
              />
            </div>
          </>
        )}

        {/* ================= COMPOSITION FORM ================= */}
        {!isRMCategory && (
          <>
            {formData.compositions.map((row, idx) => (
              <div
                key={idx}
                className="flex gap-3 bg-gray-50 p-3 rounded relative"
              >
                <Select
                  label="Item"
                  value={row.itemId}
                  options={
                    itemList?.map((item) => ({
                      label: item.productName,
                      value: item._id,
                    })) || []
                  }
                  onChange={(v) =>
                    handleChange(`compositions.${idx}.itemId`, v)
                  }
                  error={errors.compositions?.[idx]?.itemId}
                />

                <Input
                  type="number"
                  label="%"
                  value={row.percentage}
                  onChange={(e) =>
                    handleChange(
                      `compositions.${idx}.percentage`,
                      e.target.value,
                    )
                  }
                  error={errors.compositions?.[idx]?.percentage}
                />

                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => removeComposition(idx)}
                    className="absolute right-2 top-2 text-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

             <Input
                label="Factory OverHead (%)"
                type="number"
                value={formData.factoryOverhead}
                onChange={(e) => handleChange("factoryOverhead", e.target.value)}
              />

            {totalPercentage < 100 && (
              <Button
                type="button"
                onClick={addComposition}
                className="bg-gray-700 text-white"
              >
                + Add Item
              </Button>
            )}

            <p
              className={`font-semibold ${
                totalPercentage === 100
                  ? "text-green-600"
                  : totalPercentage > 100
                    ? "text-red-600"
                    : "text-blue-600"
              }`}
            >
              Total: {totalPercentage}%
            </p>
          </>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={!isRMCategory && totalPercentage !== 100}
          loading={loading}
          className="cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UnifiedItemCompositionForm;
