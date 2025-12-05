"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "@/components/atoms/Select";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";

import { useForm } from "@/hooks/useForm";
import { compositionSchema } from "@/validations/compositionSchema";

import { fetchMainCategories } from "@/redux/slice/main-category";
import { fetchSubCategories } from "@/redux/slice/SubCategory";
import { fetchitems, createItem, getallitems } from "@/redux/slice/Item-slice";

import { successToast, errorToast } from "@/utils/toastMessage";

const AddComposition = () => {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);
  const { SubcategoryList } = useSelector((state) => state.subcategory);
  const { itemList, loading } = useSelector((state) => state.item);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        category: "",
        subcategory: "",
        productName: "",
        compositions: [{ itemId: "", percentage: "" }],
      },
      schema: compositionSchema,
    });

  useEffect(() => {
    dispatch(fetchMainCategories({ filters: {} }));
  }, [dispatch]);

  useEffect(() => {
    if (!formData.category) return;

    dispatch(
      fetchSubCategories({
        filters: { category: formData.category },
      })
    );

    setFormData((prev) => ({
      ...prev,
      subcategory: "",
      compositions: [{ itemId: "", percentage: "" }],
    }));
  }, [formData.category, dispatch, setFormData]);

  useEffect(() => {
    dispatch(
      getallitems({
        filters: {},
      })
    );

    setFormData((prev) => ({
      ...prev,
      compositions: prev.compositions.map(() => ({
        itemId: "",
        percentage: "",
      })),
    }));
  }, [formData.subcategory, dispatch, setFormData]);

  const totalPercentage = formData.compositions.reduce(
    (sum, c) => sum + Number(c.percentage || 0),
    0
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

  const onSubmit = async (data) => {
    if (totalPercentage !== 100) {
      return errorToast("Total percentage must equal 100%");
    }

    const payload = {
      category: data.category,
      subcategory: data.subcategory,
      productName: data.productName,
      compositions: data.compositions.map((c) => ({
        item: c.itemId,
        percentage: Number(c.percentage),
      })),
    };

    try {
      await dispatch(createItem({ itemData: payload })).unwrap();
      successToast("Composition created successfully!");

      reset();
    } catch (err) {
      errorToast(err?.message || "Failed to save!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-4">
      <h2 className="text-xl font-bold mb-4 text-black text-center">
        Create Composition
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Composition Name"
          placeholder="Enter product name"
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
          label="Select Subcategory"
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

        {formData.compositions.map((row, idx) => (
          <div
            key={idx}
            className="flex gap-3 bg-gray-50  p-3 rounded relative"
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
              onChange={(v) => handleChange(`compositions.${idx}.itemId`, v)}
              error={errors.compositions?.[idx]?.itemId}
            />

            <Input
              type="number"
              label="%"
              value={row.percentage}
              onChange={(e) =>
                handleChange(`compositions.${idx}.percentage`, e.target.value)
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

        {/* Submit */}
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={totalPercentage !== 100}
          loading={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddComposition;
