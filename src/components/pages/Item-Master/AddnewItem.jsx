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
        // quantity: "",
        pieces: "",
        unitPrice: "",
        symbol: "",
      },
      schema: stockSchema,
    });

  const onSubmit = async (data) => {
    try {
      const payload = {
        productName: data.productName || "",
        // quantity: data.quantity || "",
        pieces: enablePieces ? data.pieces : 0, // <-- Important
        unitPrice: data.unitPrice || "",
        symbol: data.symbol,
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
      errorToast(error?.message || "Failed to save item");
    }
  };

  useEffect(() => {
    if (singleItem && ItemId) {
      setFormData({
        productName: singleItem.productName || "",
        // quantity: singleItem.quantity || "",
        pieces: singleItem.pieces || "",
        unitPrice: singleItem.unitPrice || "",
        symbol: singleItem.symbol || "",
      });

      // auto enable if existing data has pieces
      if (singleItem.pieces > 0) setEnablePieces(true);
    }
  }, [singleItem, ItemId]);

  useEffect(() => {
    if (ItemId) dispatch(fetchItembyid({ ItemId })).unwrap();
  }, [ItemId, dispatch]);

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h1 className="font-inter font-bold text-[32px] leading-[40px] mt-5 mb-5">
        {ItemId ? "Update Item" : "Create New Item"}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className="flex flex-wrap gap-5">
          <Input
            label="Product Name"
            type="text"
            placeholder="Enter Product Name"
            value={formData.productName}
            onChange={(e) => handleChange("productName", e.target.value)}
            error={errors.productName}
          />

          {/* <Input
            label="KG (Qty)"
            type="number"
            placeholder="Enter Quantity"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            error={errors.quantity}
          /> */}

          <Input
            label="Symbol"
            type="text"
            placeholder="Enter Symbol"
            value={formData.symbol}
            onChange={(e) => handleChange("symbol", e.target.value)}
            error={errors.symbol}
          />
        </div>

        {/* Checkbox Toggle */}
        <div className="flex items-center mt-3 gap-2">
          <input
            type="checkbox"
            checked={enablePieces}
            onChange={() => setEnablePieces(!enablePieces)}
          />
          <label className="text-sm font-semibold">Need Pieces Quantity?</label>
        </div>

        {/* Conditional Input */}
        {enablePieces && (
          <Input
            label="Pieces (Qty)"
            type="number"
            placeholder="Enter Quantity"
            value={formData.pieces}
            onChange={(e) => handleChange("pieces", e.target.value)}
            error={errors.pieces}
          />
        )}

        <div className="flex flex-wrap gap-5">
          <Input
            label="Price (per Unit)"
            type="number"
            placeholder="Rs 0.00"
            value={formData.unitPrice}
            onChange={(e) => handleChange("unitPrice", e.target.value)}
            error={errors.unitPrice}
          />
        </div>

        <div className="flex justify-end gap-4 sm:gap-5 mt-6">
          <Button
            onClick={() => reset()}
            className="cursor-pointer"
            type="cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={loading}
            loading={loading}
          >
            {ItemId ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddnewItem;
