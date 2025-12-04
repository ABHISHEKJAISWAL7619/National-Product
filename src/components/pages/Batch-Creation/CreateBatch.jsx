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

const CreateBatch = ({ batchId }) => {
  const dispatch = useDispatch();
  const { compositionList } = useSelector((state) => state.composition);
  const { loading, singlebatch } = useSelector((state) => state.batch);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        date: "",
        batchNo: "",
        quantity: "",
        pieces: "",
        outputItem: "",
        type: "",
      },
      schema: batchSchema,
    });

  const onSubmit = async (data) => {
    try {
      const batchData = {
        date: data.date,
        batchNo: data.batchNo,
        quantity: data?.quantity,
        pieces: data.pieces,
        outputItem: [data.outputItem],
        type: data.type,
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
              type: batch.type || "",
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
    dispatch(fetchcompositions({ filters: {} }));
  }, [dispatch]);

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

        {/* BUTTON AREA */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={loading}
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
