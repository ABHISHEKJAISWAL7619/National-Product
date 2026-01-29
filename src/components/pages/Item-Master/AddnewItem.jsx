"use client";

import { Button } from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "@/utils/toastMessage";
import React, { useEffect, useState } from "react";
import { stockSchema } from "@/validations/stockSchema";
import {
  createItem,
  fetchItembyid,
  updateItem,
} from "@/redux/slice/Item-slice";
import Input from "@/components/common/Input";

const AddnewItem = ({ ItemId }) => {
  const dispatch = useDispatch();
  const { loading, singleItem } = useSelector((state) => state.item || {});
  const [enablePieces, setEnablePieces] = useState(false);

  const { formData, handleChange, setFormData, handleSubmit, errors, reset } =
    useForm({
      defaultValues: {
        productName: "",
        unitPrice: "",
        symbol: "",
        productCode: "",
      },
      schema: stockSchema,
    });

  const onSubmit = async (data) => {
    try {
      const payload = {
        productName: data.productName,
        unitPrice: data.unitPrice,
        symbol: data.symbol,
        productCode: data.productCode,
      };

      if (ItemId) {
        await dispatch(updateItem({ ItemId, ItemData: payload })).unwrap();
        successToast("Item updated successfully!");
      } else {
        await dispatch(createItem({ itemData: payload })).unwrap();
        successToast("Item created successfully!");
      }

      reset();
      setEnablePieces(false);
    } catch (error) {
      let message = "Failed to save item";

      const errText =
        error?.error || error?.message || error?.response?.data?.error;

      if (errText?.includes("E11000")) {
        if (errText.includes("productCode")) {
          message =
            "Product code already exists. Please use a unique product code.";
        } else {
          message = "Duplicate entry detected. Please use unique values.";
        }
      }

      errorToast(message);
    }
  };

  useEffect(() => {
    if (singleItem && ItemId) {
      setFormData({
        productName: singleItem.productName || "",
        unitPrice: singleItem.unitPrice || "",
        symbol: singleItem.symbol || "",
        productCode: singleItem.productCode || "",
      });

      if (singleItem.pieces > 0) setEnablePieces(true);
    }
  }, [singleItem, ItemId]);

  useEffect(() => {
    if (ItemId) dispatch(fetchItembyid({ ItemId })).unwrap();
  }, [ItemId, dispatch]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 max-w-3xl mx-auto mt-6">
      <h1 className="font-inter font-bold text-2xl md:text-3xl text-black mb-6">
        {ItemId ? "Update Item" : "Create New Item"}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-6"
      >
        {/* GRID INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Product Name"
            type="text"
            placeholder="Enter Product Name"
            value={formData.productName}
            onChange={(e) => handleChange("productName", e.target.value)}
            error={errors.productName}
          />

          <Input
            label="Symbol"
            type="text"
            placeholder="Enter Symbol"
            value={formData.symbol}
            onChange={(e) => handleChange("symbol", e.target.value)}
            error={errors.symbol}
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Price (Per Unit)"
            type="number"
            placeholder="Rs 0.00"
            value={formData.unitPrice}
            onChange={(e) => handleChange("unitPrice", e.target.value)}
            error={errors.unitPrice}
          />
          <Input
            label="ProductCode"
            type="text"
            placeholder="Enter ProductCode"
            value={formData.productCode}
            onChange={(e) => handleChange("productCode", e.target.value)}
            error={errors.productCode}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <Button
            onClick={() => reset()}
            type="button"
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            className="cursor-pointer"
          >
            {ItemId ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddnewItem;
