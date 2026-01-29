"use client";

import React, { useEffect } from "react";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/hooks/useForm";
import { successToast, errorToast } from "@/utils/toastMessage";
import {
  createbatch,
  fetchbatchbyid,
  updatebatch,
} from "@/redux/slice/batch-slice";
import { batchSchema } from "@/validations/batchSchema";
import { fetchcompositions } from "@/redux/slice/composition-slice";
import { fetchitems, getallitems } from "@/redux/slice/Item-slice";

const CreateBatch = ({ batchId }) => {
  const dispatch = useDispatch();
  const { compositionList } = useSelector((state) => state.composition);
  console.log(compositionList);
  const { loading, singlebatch } = useSelector((state) => state.batch);
  const { itemList} = useSelector((state) => state.item);
  console.log(itemList);
  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        date: "",
        batchNo: "",
        quantity: "",
        pieces: "",
        outputItem: "",
        // reuseable: "",
        type: "",
        inputItem: [
          {
            itemId: "",
            quantity: "",
            reuseableQty: "",
          },
        ],
      },
      schema: batchSchema,
    });
  const totalInputQty = formData.inputItem.reduce(
    (sum, i) => sum + Number(i.quantity || 0),
    0,
  );
  const addInputItem = () => {
    setFormData((prev) => ({
      ...prev,
      inputItem: [
        ...prev.inputItem,
        { itemId: "", quantity: "", reuseableQty: "" },
      ],
    }));
  };

  const removeInputItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      inputItem: prev.inputItem.filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async (data) => {
    try {
      const batchData = {
        date: data.date,
        batchNo: data.batchNo,
        quantity: data?.quantity,
        pieces: data.pieces,
        outputItem: [data.outputItem],
        // reuseable: data?.reuseable,
        type: data.type,

        inputItem: data.inputItem.map((i) => ({
          itemId: i.itemId,
          quantity: Number(i.quantity),
          reuseableQty: Number(i.reuseableQty || 0),
        })),
      };

      if (batchId) {
        await dispatch(updatebatch({ batchId, batchData })).unwrap();
        successToast("Batch updated successfully!");
      } else {
        await dispatch(createbatch(batchData)).unwrap();
        successToast("Batch created successfully!");
      }

      reset();
    } catch (error) {
      console.log(error);
      errorToast(error || "Failed to save batch");
    }
  };

  useEffect(() => {
    if (batchId) {
      const fetchBatch = async () => {
        try {
          const res = await dispatch(fetchbatchbyid({ batchId })).unwrap();
          if (res?.data) {
            const batch = res.data;
            setFormData({
              date: batch.date?.split("T")[0] || "",
              batchNo: batch.batchNo || "",
              quantity: batch?.quantity || "",
              pieces: batch.pieces || "",
              outputItem: batch.outputItem?._id || "",
              // reuseable: batch.reuseable || "",
              type: batch.type || "",
              inputItem: data.inputItem.map((i) => ({
                itemId: i.itemId,
                quantity: Number(i.quantity),
                reuseableQty: Number(i.reuseableQty || 0),
              })),
            });
          }
        } catch (err) {
          console.error(err);
          errorToast("Failed to fetch batch details");
        }
      };
      fetchBatch();
    }
  }, [dispatch, batchId, setFormData]);
  useEffect(() => {
     dispatch(
         getallitems({
           filters: {limit:200},
         })
       );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchcompositions({ filters: {} }));
  }, [dispatch]);

  // useEffect(() => {
  //   const selected = compositionList.find((c) => c._id === formData.outputItem);

  //   if (selected) {
  //     const reuseValue = Number(selected.quantityUsed?.reuseable) || 0;

  //     setFormData((prev) => ({
  //       ...prev,
  //       availablereuseable: reuseValue,
  //       reuseable: reuseValue === 0 ? 0 : prev.reuseable || "", // agar 0 nahi, toh user ka value rahe ya blank
  //     }));
  //   }
  // }, [formData.outputItem, compositionList]);

  return (
    <div className="p-6 md:p-8 bg-white border border-gray-200 rounded-xl shadow-sm max-w-4xl mx-auto mt-5">
      <h1 className="font-archivo text-black font-bold text-2xl md:text-3xl mb-6 text-center">
        {batchId ? "Update Batch" : "Create Batch"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* GRID FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={errors.date}
          />
          <Input
            label="Batch No."
            type="text"
            placeholder="Enter Batch No"
            value={formData.batchNo}
            onChange={(e) => handleChange("batchNo", e.target.value)}
            error={errors.batchNo}
          />
          <Input
            label="Quantity (KG)"
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            error={errors.quantity}
          />
          <Input
            label="Pieces"
            type="number"
            placeholder="Enter pieces"
            value={formData.pieces}
            onChange={(e) => handleChange("pieces", e.target.value)}
            error={errors.pieces}
          />
          <Input
            label="Type"
            type="select"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            options={[
              { label: "Soldering Wire", value: "solderingWire" },
              { label: "Soldering Stick", value: "solderingStick" },
            ]}
            error={errors.type}
          />
          <Input
            label="Output Item"
            type="select"
            value={formData.outputItem}
            onChange={(e) => handleChange("outputItem", e.target.value)}
            options={[
              ...(compositionList || []).map((item) => ({
                label: item.productName,
                value: item._id,
              })),
            ]}
            error={errors.outputItem}
          />
        </div>
        {/* <div className="w-full">
          <Input
            label="reuseable"
            type="number"
            value={formData.reuseable}
            onChange={(e) => {
              const val = Number(e.target.value);

              // validate input
              if (val > formData.availablereuseable) {
                setFormData((prev) => ({
                  ...prev,
                  reuseable: val,
                  reuseableError: "Value exceeds available reuseable!",
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  reuseable: val,
                  reuseableError: "",
                }));
              }
            }}
            error={formData.reuseableError}
          />

          {formData.availablereuseable > 0 && (
            <p className="text-sm text-blue-600 mt-1">
              Available reuseable: {formData.availablereuseable}
            </p>
          )}

          {formData.reuseableError && (
            <p className="text-sm text-red-600 mt-1 font-semibold">
              {formData.reuseableError}
            </p>
          )}
        </div> */}
        <div className=" rounded-lg p-4 bg-gray-50 space-y-4">
          <h3 className="font-semibold text-lg">Input Items</h3>

          {formData.inputItem.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 relative"
            >
              <Input
                label="Item"
                type="select"
                value={row.itemId}
                onChange={(e) =>
                  handleChange(`inputItem.${idx}.itemId`, e.target.value)
                }
                options={(itemList || []).map((i) => ({
                  label: i.productName,
                  value: i._id,
                }))}
                error={errors.inputItem?.[idx]?.itemId}
              />

              <Input
                label="Quantity"
                type="number"
                value={row.quantity}
                onChange={(e) =>
                  handleChange(`inputItem.${idx}.quantity`, e.target.value)
                }
                error={errors.inputItem?.[idx]?.quantity}
              />

              <Input
                label="Reuseable Qty"
                type="number"
                value={row.reuseableQty}
                onChange={(e) =>
                  handleChange(`inputItem.${idx}.reuseableQty`, e.target.value)
                }
              />

              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => removeInputItem(idx)}
                  className="absolute -top-2 -right-2 text-red-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {totalInputQty < Number(formData.quantity || 0) && (
            <Button type="button" onClick={addInputItem}>
              + Add Item
            </Button>
          )}

          <p
            className={`font-semibold ${
              totalInputQty === Number(formData.quantity)
                ? "text-green-600"
                : totalInputQty > Number(formData.quantity)
                  ? "text-red-600"
                  : "text-blue-600"
            }`}
          >
            Total Input Quantity: {totalInputQty}
          </p>

          {totalInputQty !== Number(formData.quantity) && (
            <p className="text-sm text-red-600 font-semibold">
              Total input quantity must equal required quantity
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={
              loading ||
              // !!formData.reuseableError ||
              totalInputQty !== Number(formData.quantity)
            }
            loading={loading}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            {batchId ? "Update Batch" : "Save Batch"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBatch;
