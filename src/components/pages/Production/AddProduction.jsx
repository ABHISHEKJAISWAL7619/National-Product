"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useDispatch, useSelector } from "react-redux";
import { fetchbatchs } from "@/redux/slice/batch-slice";
import { useForm } from "@/hooks/useForm";
import { successToast, errorToast } from "@/utils/toastMessage";
import {
  fetchProductions,
  saveProduction,
} from "@/redux/slice/production-slice";
import {
  createProductionSchema,
  updateProductionSchema,
} from "@/validations/productionSchema";

const AddProduction = ({ productionId }) => {
  const dispatch = useDispatch();
  const { batchList } = useSelector((state) => state.batch);
  console.log(batchList);
  const { loading, singleProduction } = useSelector(
    (state) => state.production
  );
  console.log(singleProduction);
  console.log(singleProduction?.batch.type);
  const batchType = singleProduction?.batch.type;

  const isUpdate = Boolean(productionId);

  const { formData, handleChange, handleSubmit, reset, errors, setFormData } =
    useForm({
      defaultValues: {
        batch: "",
        semiFinishedKg: "",
        semiPieces: "",
        reusableWaste: "",
        waste: "",
        shortAccess: "",
        quantity: "",
        status: batchType == "solderingWire" ? "pending" : "completed",
      },
      schema: isUpdate ? updateProductionSchema : createProductionSchema,
    });

  useEffect(() => {
    dispatch(fetchbatchs({ filters: {} }));
  }, [dispatch]);

  useEffect(() => {
    if (isUpdate && productionId) {
      dispatch(fetchProductions({ id: productionId }));
    }
  }, [dispatch, isUpdate, productionId]);

  useEffect(() => {
    if (isUpdate && singleProduction?._id) {
      setFormData({
        batch: singleProduction.batch?._id || "",
        semiFinishedKg: singleProduction.semiFinishedKg ?? "",
        semiPieces: singleProduction.semiPieces ?? "",
        reusableWaste: singleProduction.reusableWaste ?? "",
        waste: singleProduction.waste ?? "",
        shortAccess: singleProduction.shortAccess ?? "",
        status: "completed",
      });
    }
  }, [isUpdate, singleProduction, setFormData]);

  const onSubmit = async () => {
    try {
      const payload = isUpdate ? { id: productionId, formData } : { formData };
      console.log(payload);
      await dispatch(saveProduction(payload)).unwrap();

      successToast(
        isUpdate
          ? "Production updated successfully!"
          : "Production created successfully!"
      );
      reset();
    } catch (err) {
      errorToast(err || "Failed to save production");
    }
  };

  const totalEntered =
    Number(formData.semiFinishedKg || 0) +
    Number(formData.semiPieces || 0) +
    Number(formData.reusableWaste || 0) +
    Number(formData.waste || 0) +
    Number(formData.shortAccess || 0);

  const batchQuantity = Number(singleProduction?.batch?.quantity || 0);

  const remaining = batchQuantity - totalEntered;

  return (
    <div className="border border-gray-200 p-6">
      <div className="flex justify-between">
        <h1 className="font-archivo text-black font-bold text-[25px] leading-[28px]  mt-5 mb-5">
          {isUpdate ? "Update Production" : "Add Production"}
        </h1>
        {/* {totalEntered !== singleProduction?.batch?.quantity && (
          <p className="text-red-500 text-sm">
            Total entered quantity must equal{" "}
            {singleProduction?.batch?.quantity}
          </p>
        )} */}
      </div>
      <div className="overflow-hidden"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* Always show Batch field */}
        <Input
          label="Batch No."
          type="select"
          value={formData.batch}
          onChange={(e) => {
            const batchId = e.target.value;
            handleChange("batch", batchId);

            // Find selected batch from redux list
            const selectedBatch = batchList.find(
              (item) => item._id === batchId
            );

            if (selectedBatch) {
              setFormData((prev) => ({
                ...prev,
                quantity: selectedBatch.quantity, // <-- Auto set quantity here
              }));
            }
          }}
          options={batchList || []}
          valueKey="_id"
          labelKey="batchNo"
          placeholderOption="Select Batch"
          error={errors.batch}
        />

        {/* Show all other fields only in update mode */}
        {isUpdate && (
          <>
            <Input
              label="Semi Finished (KG)"
              type="number"
              value={formData.semiFinishedKg}
              onChange={(e) => handleChange("semiFinishedKg", e.target.value)}
              placeholder="Enter Quantity"
              error={errors.semiFinishedKg}
            />

            <Input
              label="Semi Finished (Pieces)"
              type="number"
              value={formData.semiPieces}
              onChange={(e) => handleChange("semiPieces", e.target.value)}
              placeholder="Enter Quantity"
              error={errors.semiPieces}
            />

            <Input
              label="Reusable Waste"
              type="number"
              value={formData.reusableWaste}
              onChange={(e) => handleChange("reusableWaste", e.target.value)}
              placeholder="Enter Quantity"
              error={errors.reusableWaste}
            />

            <Input
              label="Waste"
              type="number"
              value={formData.waste}
              onChange={(e) => handleChange("waste", e.target.value)}
              placeholder="Enter Quantity"
              error={errors.waste}
            />

            <Input
              label="Short And Access"
              type="number"
              value={formData.shortAccess}
              onChange={(e) => handleChange("shortAccess", e.target.value)}
              placeholder="Enter Quantity"
              error={errors.shortAccess}
            />

            {/* <Input
              label="Status"
              type="select"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Completed", value: "completed" },
              ]}
              error={errors.status}
            /> */}
          </>
        )}
        {isUpdate && (
          <p
            className={`font-semibold text-lg ${
              totalEntered === batchQuantity
                ? "text-green-600"
                : totalEntered > batchQuantity
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {totalEntered === batchQuantity
              ? "✔ Total quantity matched!"
              : totalEntered > batchQuantity
              ? `⚠ Entered quantity exceeds batch by ${Math.abs(remaining)}`
              : `Remaining to match batch: ${remaining}`}
          </p>
        )}

        <div className="flex justify-end gap-5 mt-2 w-full lg:w-[448px] ml-auto">
          <Button
            type="button"
            onClick={reset}
            className="bg-gray-300 text-black cursor-pointer font-inter font-bold text-[14px] px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading || totalEntered !== batchQuantity}
            className={`cursor-pointer font-inter font-bold text-[14px] px-4 py-2 rounded-md ${
              totalEntered === batchQuantity
                ? "bg-blue-950 text-white hover:bg-blue-900"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {isUpdate ? "Update" : "Save"}
          </Button>
        </div>
      </form>
      <div />
    </div>
  );
};

export default AddProduction;
