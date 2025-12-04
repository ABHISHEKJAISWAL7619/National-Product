"use client";

import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useForm } from "@/hooks/useForm";
import { fetchProductions } from "@/redux/slice/production-slice";
import {
  fetchproduction2,
  saveproduction2,
} from "@/redux/slice/production2-slice";
import { errorToast, successToast } from "@/utils/toastMessage";
import {
  createProduction2Schema,
  updateProduction2Schema,
} from "@/validations/production2Schema";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddProduction1 = ({ production2Id }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const isUpdate = Boolean(production2Id);

  const { productionList } = useSelector((state) => state.production);
  const { singleproduction2, loading } = useSelector(
    (state) => state.production2
  );

  const { formData, handleChange, handleSubmit, setFormData, errors } = useForm(
    {
      defaultValues: {
        productionId: "",
        quantity: "",
        productName: "",
        gauge: "",
        flux: "",
        fluxQty: "",
        semiFinishedKg: "",
        semiPieces: "",
        reusableWaste: "",
        waste: "",
        shortAndAccess: "",
        gula: "",
        available: "",
        status: "pending",
      },
      schema: isUpdate ? updateProduction2Schema : createProduction2Schema,
    }
  );

  const quantity = Number(formData.quantity) || 0;
  const flux = Number(formData.flux) || 0;

  const gulla = quantity > 0 ? ((quantity * 100) / (100 + flux)).toFixed(3) : 0;
  const FLUX_QUANTITY = quantity > 0 ? (quantity - gulla).toFixed(3) : 0;
  console.log(formData);
  const onSubmit = async () => {
    const payload = {
      ...formData,
      gula: Number(gulla),
      fluxQty: Number(FLUX_QUANTITY),
    };

    setData(payload);
    try {
      await dispatch(
        saveproduction2({
          id: production2Id,
          formData: payload,
        })
      ).unwrap();
      successToast(isUpdate ? "Updated Successfully" : "Created Successfully");
    } catch (error) {
      errorToast(error.error || "Something went wrong");
    }
  };

  useEffect(() => {
    dispatch(fetchProductions({ filters: { type: "solderingWire" } }));
  }, [dispatch]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(fetchproduction2({ id: production2Id }));
    }
  }, [isUpdate, production2Id, dispatch]);

  useEffect(() => {
    if (singleproduction2 && isUpdate) {
      setFormData({
        productionId: singleproduction2?.productionId?._id || "",
        quantity: singleproduction2?.quantity || "",
        productName: singleproduction2?.productName,
        gauge: singleproduction2?.gauge || "",
        fluxQty: singleproduction2?.fluxQty ?? null,
        gula: singleproduction2?.gula ?? null,
        semiFinishedKg: singleproduction2?.semiFinishedKg || "",
        semiPieces: singleproduction2?.semiPieces || "",
        reusableWaste: singleproduction2?.reusableWaste || "",
        waste: singleproduction2?.waste || "",
        shortAndAccess: singleproduction2?.shortAndAccess || "",
        gula: singleproduction2?.gula || "",
        available: singleproduction2?.available || "",
        status: singleproduction2?.status || "pending",
      });
    }
  }, [singleproduction2, isUpdate, setFormData]);

  return (
    <div className="p-6 bg-white border border-gray-200">
      <h1 className="font-archivo font-bold  text-black text-[25px] leading-[28px]  mb-5">
        {isUpdate ? "Update Production" : "Add Production"}
      </h1>
      {/* {JSON.stringify(formData)} */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-30 gap-4"
      >
        {/* {!isUpdate && ( */}
        <>
          <div className="flex justify-between gap-5">
            <Input
              label="Select Batch"
              type="select"
              value={formData.productionId}
              onChange={(e) => handleChange("productionId", e.target.value)}
              options={productionList}
              valueKey="_id"
              labelRender={(item) => item?.batch?.batchNo}
              placeholderOption="Select Batch"
              disabled={isUpdate}
              error={errors.productionId}
            />

            <Input
              label="Enter Quantity"
              type="number"
              value={formData.quantity}
              disabled={isUpdate}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              placeholder="Enter Quantity"
              error={errors.quantity}
            />
            <Input
              label="Enter productName"
              type="text"
              value={formData.productName}
              disabled={isUpdate}
              onChange={(e) => handleChange("productName", e.target.value)}
              placeholder="Enter productName"
              error={errors.productName}
            />
          </div>
        </>
        {/* )} */}

        {isUpdate && (
          <>
            <div className="flex justify-between gap-5">
              <Input
                label="Flux %"
                type="number"
                value={formData.flux}
                onChange={(e) => handleChange("flux", Number(e.target.value))}
                placeholder="0.00%"
              />
              {/* {JSON.stringify(gulla)} */}
              <Input
                label="Gula"
                type="number"
                value={gulla}
                disabled
                onChange={(e) => handleChange("gula", e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="flex justify-between gap-5">
              {/* {JSON.stringify(FLUX_QUANTITY)} */}
              <Input
                label="Flux Quantity"
                type="number"
                disabled
                value={FLUX_QUANTITY}
                onChange={(e) => handleChange("fluxQty", e.target.value)}
                placeholder="0.00"
              />

              <Input
                label="Semi Finished (KG)"
                type="number"
                value={formData.semiFinishedKg}
                onChange={(e) =>
                  handleChange("semiFinishedKg", Number(e.target.value))
                }
                placeholder="0.00"
              />
            </div>

            <div className="flex justify-between gap-5">
              <Input
                label="Semi Finished (Pieces)"
                type="number"
                value={formData.semiPieces}
                onChange={(e) =>
                  handleChange("semiPieces", Number(e.target.value))
                }
                placeholder="0.00"
              />

              <Input
                label="Reusable Waste"
                type="number"
                value={formData.reusableWaste}
                onChange={(e) =>
                  handleChange("reusableWaste", Number(e.target.value))
                }
                placeholder="0.00"
              />
            </div>

            <div className="flex justify-between gap-5">
              <Input
                label="Waste"
                type="number"
                value={formData.waste}
                onChange={(e) => handleChange("waste", Number(e.target.value))}
                placeholder="0.00"
              />

              <Input
                label="Short And Excess"
                type="number"
                value={formData.shortAndAccess}
                onChange={(e) =>
                  handleChange("shortAndAccess", Number(e.target.value))
                }
                placeholder="0.00"
              />
            </div>

            <div className="flex justify-between gap-5">
              <Input
                label="Gauge"
                type="number"
                value={formData.gauge}
                onChange={(e) => handleChange("gauge", Number(e.target.value))}
                placeholder="0.00"
              />

              <Input
                label="Available"
                type="number"
                value={formData.available}
                onChange={(e) =>
                  handleChange("available", Number(e.target.value))
                }
                placeholder="0.00"
              />
            </div>
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
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="px-4 py-2  cursor-pointer rounded text-white bg-blue-900 hover:bg-blue-800"
          >
            {isUpdate ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduction1;
