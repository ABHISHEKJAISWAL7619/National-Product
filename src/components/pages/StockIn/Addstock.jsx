"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { successToast, errorToast } from "@/utils/toastMessage";
import { fetchitems } from "@/redux/slice/Item-slice";
import {
  createincoming,
  updateincoming,
  fetchincomingbyid,
} from "@/redux/slice/incoming-slice";
import { incomingSchema } from "@/validations/incomingSchema";
import Select from "@/components/atoms/Select";

const CreateStock = ({ incomingId }) => {
  const dispatch = useDispatch();
  const { itemList } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.incoming);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        date: "",
        invoiceNo: "",
        price: "",
        products: [{ itemId: "", quantity: "", isPieces: false, pieces: "" }],
      },
      schema: incomingSchema,
    });

  useEffect(() => {
    dispatch(fetchitems({ filters: {} }));
  }, [dispatch]);

  useEffect(() => {
    if (!incomingId) return;

    const load = async () => {
      try {
        const res = await dispatch(fetchincomingbyid({ incomingId })).unwrap();

        if (res?.data) {
          const incoming = res.data;

          setFormData({
            date: incoming.date?.split("T")[0] || "",
            invoiceNo: incoming.invoiceNo,
            price: incoming.price,
            products: incoming.products.map((p) => ({
              itemId: p.item || "",
              quantity: p.quantity || "",
              isPieces: !!p.pieces,
              pieces: p.pieces || "",
            })),
          });
        }
      } catch {
        errorToast("Failed to load stock data");
      }
    };

    load();
  }, [incomingId, dispatch, setFormData]);

  const addProduct = () =>
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { itemId: "", quantity: "", isPieces: false, pieces: "" },
      ],
    }));

  const removeProduct = (index) =>
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));

  const onSubmit = async (data) => {
    const formatted = {
      date: data.date,
      invoiceNo: data.invoiceNo,
      price: data.price,
      products: data.products.map((p) => ({
        item: p.itemId,
        quantity: Number(p.quantity),
        pieces: p.isPieces ? Number(p.pieces) : null,
      })),
    };

    try {
      if (incomingId) {
        await dispatch(
          updateincoming({ incomingId, incomingData: formatted })
        ).unwrap();
        successToast("Stock Updated!");
      } else {
        await dispatch(createincoming(formatted)).unwrap();
        successToast("Incoming Stock Added!");
      }
      reset();
    } catch (err) {
      errorToast(err?.message || "Failed to save");
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-700 p-6 rounded-lg shadow">
      <h1 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
        {incomingId ? "Update Incoming Stock" : "Add Incoming Stock"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-[940px] text-gray-900 dark:text-gray-100"
      >
        <div className="flex gap-6 flex-wrap">
          <Input
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={errors.date}
          />

          <Input
            type="text"
            label="Invoice Number"
            value={formData.invoiceNo}
            onChange={(e) => handleChange("invoiceNo", e.target.value)}
            placeholder="Enter invoice number"
            error={errors.invoiceNo}
          />
        </div>

        {formData.products.map((product, i) => (
          <div
            key={i}
            className="rounded flex flex-col gap-4 text-gray-900 dark:text-gray-100"
          >
            <Select
              label="Select Product"
              value={product.itemId}
              options={
                itemList?.map((item) => ({
                  label: item.productName,
                  value: item._id,
                })) || []
              }
              onChange={(value) => handleChange(`products.${i}.itemId`, value)}
              error={errors.products?.[i]?.itemId}
            />

            <Input
              type="number"
              label="KG Quantity"
              value={product.quantity}
              onChange={(e) =>
                handleChange(`products.${i}.quantity`, Number(e.target.value))
              }
              error={errors.products?.[i]?.quantity}
            />

            <label className="flex gap-2 text-gray-900 dark:text-gray-200">
              <input
                type="checkbox"
                checked={product.isPieces}
                onChange={(e) =>
                  handleChange(`products.${i}.isPieces`, e.target.checked)
                }
              />
              Add Pieces?
            </label>

            {product.isPieces && (
              <Input
                type="number"
                label="Pieces"
                value={product.pieces}
                onChange={(e) =>
                  handleChange(`products.${i}.pieces`, Number(e.target.value))
                }
                error={errors.products?.[i]?.pieces}
              />
            )}

            {formData.products.length > 1 && (
              <Button
                type="button"
                className="bg-red-600 text-white"
                onClick={() => removeProduct(i)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={addProduct}
          className="bg-gray-700 text-white"
        >
          + Add Product
        </Button>

        <Input
          type="number"
          label="Total Price"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
          placeholder="Enter price"
          error={errors.price}
        />

        <Button
          onClick={() => reset()}
          className="cursor-pointer bg-red-500 text-white"
          type="cancel"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-blue-700 cursor-pointer text-white w-full"
          loading={loading}
        >
          {incomingId ? "Update" : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default CreateStock;
