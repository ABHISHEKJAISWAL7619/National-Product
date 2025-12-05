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
  const { loading, singleProduction } = useSelector(
    (state) => state.production
  );

  const isUpdate = Boolean(productionId);

  const { formData, handleChange, handleSubmit, reset, errors, setFormData } =
    useForm({
      defaultValues: {
        batch: "",
        quantity: "",
        semiFinishedKg: "",
        semiPieces: "",
        reusableWaste: "",
        waste: "",
        shortAccess: "",
        quantity: "",
        status: "pending",
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
        quantity: singleProduction.quantity ?? "",
        semiFinishedKg: singleProduction.semiFinishedKg ?? "",
        semiPieces: singleProduction.semiPieces ?? "",
        reusableWaste: singleProduction.reusableWaste ?? "",
        waste: singleProduction.waste ?? "",
        shortAccess: singleProduction.shortAccess ?? "",
        status: singleProduction.status ?? "",
      });
    }
  }, [isUpdate, singleProduction, setFormData]);

  const onSubmit = async () => {
    try {
      const payload = isUpdate ? { id: productionId, formData } : { formData };

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
    Number(formData.reusableWaste || 0) +
    Number(formData.waste || 0) +
    Number(formData.shortAccess || 0);

  const batchQuantity = Number(singleProduction?.quantity || 0);
  const remaining = batchQuantity - totalEntered;

  return (
    <div className="bg-white mx-auto rounded-lg shadow-md p-6 md:p-10 w-full max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between mb-6 -b pb-4">
        <h1 className="font-bold text-2xl md:text-3xl text-black">
          {isUpdate ? "Update Production" : "Add Production"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1  md:grid-cols-2  gap-6"
      >
        {/* Batch Select */}
        <div className="col-span-1 md:col-span-2">
          <Input
            label="Batch No."
            type="select"
            value={formData.batch}
            onChange={(e) => {
              const batchId = e.target.value;
              handleChange("batch", batchId);

              // const selectedBatch = batchList.find(
              //   (item) => item._id === batchId
              // );

              // if (selectedBatch) {
              //   setFormData((prev) => ({
              //     ...prev,
              //     quantity: selectedBatch.quantity,
              //   }));
              // }
            }}
            options={batchList || []}
            valueKey="_id"
            labelKey="batchNo"
            placeholderOption="Select Batch"
            error={errors.batch}
          />

          <Input
            label="quantity (KG)"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            placeholder="Enter KG"
            error={errors.quantity}
          />
        </div>

        {/* Show fields only in update mode */}
        {isUpdate && (
          <>
            <Input
              label="Semi Finished (KG)"
              type="number"
              value={formData.semiFinishedKg}
              onChange={(e) => handleChange("semiFinishedKg", e.target.value)}
              placeholder="Enter KG"
              error={errors.semiFinishedKg}
            />

            <Input
              label="Semi Finished (Pieces)"
              type="number"
              value={formData.semiPieces}
              onChange={(e) => handleChange("semiPieces", e.target.value)}
              placeholder="Enter Pieces"
              error={errors.semiPieces}
            />

            <Input
              label="Reusable Waste"
              type="number"
              value={formData.reusableWaste}
              onChange={(e) => handleChange("reusableWaste", e.target.value)}
              placeholder="Enter Waste"
              error={errors.reusableWaste}
            />

            <Input
              label="Waste"
              type="number"
              value={formData.waste}
              onChange={(e) => handleChange("waste", e.target.value)}
              placeholder="Enter Waste"
              error={errors.waste}
            />

            <Input
              label="Short And Access"
              type="number"
              value={formData.shortAccess}
              onChange={(e) => handleChange("shortAccess", e.target.value)}
              placeholder="Enter Short/Access"
              error={errors.shortAccess}
            />

            <Input
              label="Status"
              type="select"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Completed", value: "completed" },
              ]}
              error={errors.status}
            />

            {/* Total Status Indicator */}
            <div className="col-span-1 md:col-span-2 mt-2">
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
                  ? `⚠ Exceeds batch by ${Math.abs(remaining)}`
                  : `Remaining to match batch: ${remaining}`}
              </p>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
          <Button
            type="button"
            onClick={reset}
            className=" !bg-[#00AEEF] px-6 py-2 rounded-md hover:bg-gray-400 font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={loading}
            disabled={loading || totalEntered !== batchQuantity}
            className={`px-6 py-2 rounded-md font-semibold ${
              totalEntered === batchQuantity
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {isUpdate ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduction;
